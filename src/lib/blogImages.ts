import { supabase } from './supabase'

export const BLOG_IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif'
const extensions: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
}

export async function uploadBlogImage(file: File, kind: 'featured' | 'banner' | 'content') {
  const extension = extensions[file.type]
  if (!extension) throw new Error('Choose a JPEG, PNG, WebP, or GIF image.')
  if (file.size > 5 * 1024 * 1024) throw new Error('Images must be 5 MB or smaller.')
  if (!file.size) throw new Error('This image file is empty. Choose another file.')

  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session) throw new Error('Your session has expired. Sign in again to upload images.')

  const path = `${kind}/${crypto.randomUUID()}.${extension}`
  const bucket = supabase.storage.from('blog-images')
  const { data, error } = await bucket.upload(path, file, {
    cacheControl: '31536000', contentType: file.type, upsert: false,
  })
  if (error) {
    if (/bucket.*not found/i.test(error.message)) {
      throw new Error('Blog image storage is not configured. Apply the blog image storage migration in Supabase.')
    }
    if (/row.level security|unauthorized|permission/i.test(error.message)) {
      throw new Error('Your account does not have permission to upload blog images. Check your admin access and storage policies.')
    }
    throw new Error(`Image upload failed: ${error.message}`)
  }
  return bucket.getPublicUrl(data.path).data.publicUrl
}
