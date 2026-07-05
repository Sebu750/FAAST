import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const DesignerSetup = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [designerId, setDesignerId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    location: '',
    nationality: '',
    gender: '',
    category: '',
    specialization: '',
    bio: '',
    short_bio: '',
    philosophy: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    linkedin: '',
    website: '',
    email: '',
    portfolio: '',
  })

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [profilePreview, setProfilePreview] = useState<string>('')
  const [coverPreview, setCoverPreview] = useState<string>('')

  // Check auth and fetch existing data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/designer/auth')
        return
      }

      setUserId(session.user.id)

      // Fetch existing designer data
      const { data } = await supabase
        .from('designers')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .single()

      if (data) {
        setDesignerId(data.id)
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          brand: data.brand || '',
          location: data.location || '',
          nationality: data.nationality || '',
          gender: data.gender || '',
          category: data.category || '',
          specialization: data.specialization || '',
          bio: data.bio || '',
          short_bio: data.short_bio || '',
          philosophy: data.philosophy || '',
        }))

        // Fetch social links
        const { data: socialData } = await supabase
          .from('designer_social_links')
          .select('*')
          .eq('designer_id', data.id)
          .single()

        if (socialData) {
          setFormData(prev => ({
            ...prev,
            instagram: socialData.instagram || '',
            facebook: socialData.facebook || '',
            tiktok: socialData.tiktok || '',
            linkedin: socialData.linkedin || '',
            website: socialData.website || '',
            email: socialData.email || '',
            portfolio: socialData.portfolio || '',
          }))
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [navigate])

  const handleImageChange = (file: File, type: 'profile' | 'cover') => {
    if (type === 'profile') {
      setProfileImage(file)
      setProfilePreview(URL.createObjectURL(file))
    } else {
      setCoverImage(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from('designers')
      .upload(path, file, { upsert: true })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data: urlData } = supabase.storage
      .from('designers')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  }

  const handleSubmit = async () => {
    setSaving(true)
    setError('')

    try {
      let currentDesignerId = designerId

      // If no designer row exists yet, create one
      if (!currentDesignerId && userId) {
        const slug = formData.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `designer-${Date.now()}`
        const { data: newDesigner, error: insertError } = await supabase
          .from('designers')
          .insert({
            auth_user_id: userId,
            name: formData.name || 'New Designer',
            brand: formData.brand || 'My Brand',
            slug: slug,
            status: 'pending',
            is_active: false,
          })
          .select()
          .single()

        if (insertError) throw insertError
        if (!newDesigner) throw new Error('Failed to create profile')
        currentDesignerId = newDesigner.id
        setDesignerId(currentDesignerId)
      }

      if (!currentDesignerId) throw new Error('No designer profile found')

      let imageUrl = null
      let coverImageUrl = null

      // Upload images if provided
      if (profileImage) {
        imageUrl = await uploadImage(profileImage, `${currentDesignerId}/profile-${Date.now()}.${profileImage.name.split('.').pop()}`)
      }
      if (coverImage) {
        coverImageUrl = await uploadImage(coverImage, `${currentDesignerId}/cover-${Date.now()}.${coverImage.name.split('.').pop()}`)
      }

      // Update designer profile
      const updateData: any = {
        name: formData.name,
        brand: formData.brand,
        location: formData.location || null,
        nationality: formData.nationality || null,
        gender: formData.gender || null,
        category: formData.category || null,
        specialization: formData.specialization || null,
        bio: formData.bio || null,
        short_bio: formData.short_bio || null,
        philosophy: formData.philosophy || null,
      }

      if (imageUrl) updateData.image_url = imageUrl
      if (coverImageUrl) updateData.cover_image_url = coverImageUrl

      const { error: updateError } = await supabase
        .from('designers')
        .update(updateData)
        .eq('id', currentDesignerId)

      if (updateError) throw updateError

      // Upsert social links
      const socialData = {
        designer_id: currentDesignerId,
        instagram: formData.instagram || null,
        facebook: formData.facebook || null,
        tiktok: formData.tiktok || null,
        linkedin: formData.linkedin || null,
        website: formData.website || null,
        email: formData.email || null,
        portfolio: formData.portfolio || null,
      }

      const { error: socialError } = await supabase
        .from('designer_social_links')
        .upsert(socialData, { onConflict: 'designer_id' })

      if (socialError) throw socialError

      navigate('/designer/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const steps = ['Basic Info', 'About You', 'Images', 'Social Links', 'Review']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="inline-block w-8 h-8 border-2 border-neutral-800 border-t-[#bb9457] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">
            Set Up Your <span className="text-[#bb9457] italic">Profile</span>
          </h1>
          <p className="text-neutral-500 text-sm">Complete your designer profile to get started</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((_s, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors ${
                step > i + 1 ? 'bg-[#bb9457] text-black' :
                step === i + 1 ? 'bg-[#bb9457] text-black' :
                'bg-neutral-800 text-neutral-500'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 mx-1 ${step > i + 1 ? 'bg-[#bb9457]' : 'bg-neutral-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-sm p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Brand Name *</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => updateField('brand', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="Brand / label"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => updateField('nationality', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="Pakistani"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="">Select category</option>
                    <option value="Womenswear">Womenswear</option>
                    <option value="Menswear">Menswear</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Pret">Pret</option>
                    <option value="Luxury Prêt">Luxury Prêt</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => updateField('specialization', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="e.g. Embroidery, Prints"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: About */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white mb-6">About You</h2>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Short Bio</label>
                <p className="text-neutral-600 text-xs mb-3">One-liner shown on directory cards</p>
                <input
                  type="text"
                  value={formData.short_bio}
                  onChange={(e) => updateField('short_bio', e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                  placeholder="A brief tagline..."
                  maxLength={150}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Full Bio</label>
                <p className="text-neutral-600 text-xs mb-3">Your story, practice, and vision</p>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors resize-none"
                  placeholder="Tell your story..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Design Philosophy</label>
                <p className="text-neutral-600 text-xs mb-3">Your "Why I Design" statement</p>
                <textarea
                  value={formData.philosophy}
                  onChange={(e) => updateField('philosophy', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors resize-none"
                  placeholder="I design because..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-xl font-serif text-white mb-6">Profile Images</h2>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">Profile Photo</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                    {profilePreview ? (
                      <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer px-4 py-2.5 bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-colors">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0], 'profile')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">Cover Image</label>
                <div className="relative w-full h-40 overflow-hidden bg-neutral-800 border border-neutral-700 rounded-sm">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-600">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="inline-block mt-3 cursor-pointer px-4 py-2.5 bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-colors">
                  Choose Cover Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0], 'cover')}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Social Links */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white mb-6">Social Links</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Instagram</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => updateField('instagram', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Facebook</label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => updateField('facebook', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="Page URL"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">TikTok</label>
                  <input
                    type="text"
                    value={formData.tiktok}
                    onChange={(e) => updateField('tiktok', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">LinkedIn</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="Profile URL"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Portfolio</label>
                  <input
                    type="text"
                    value={formData.portfolio}
                    onChange={(e) => updateField('portfolio', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="Portfolio URL"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors"
                    placeholder="contact@yourbrand.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white mb-6">Review Your Profile</h2>

              <div className="space-y-4">
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Name & Brand</p>
                  <p className="text-white">{formData.name || '—'}</p>
                  <p className="text-neutral-400 text-sm">{formData.brand || '—'}</p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Location</p>
                  <p className="text-white">{formData.location || '—'}</p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Bio</p>
                  <p className="text-neutral-300 text-sm line-clamp-3">{formData.bio || '—'}</p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Images</p>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-800">
                      {profilePreview && <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />}
                    </div>
                    <div className="w-24 h-16 overflow-hidden bg-neutral-800 rounded-sm">
                      {coverPreview && <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-950/30 border border-red-800/50 rounded-sm p-4">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 text-neutral-400 text-sm hover:text-white transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 bg-[#bb9457] text-black text-sm font-semibold uppercase tracking-wider hover:bg-[#c9a468] transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-3 bg-[#bb9457] text-black text-sm font-semibold uppercase tracking-wider hover:bg-[#c9a468] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignerSetup
