import { supabase } from './supabase'

export const sendEmailNotification = async (
  type: 'spotlight' | 'marketplace' | 'studio-waitlist' | 'partnership' | 'contact' | 'newsletter',
  data: any
) => {
  try {
    const { data: result, error } = await supabase.functions.invoke('send-email', {
      body: { type, data },
    })

    if (error) {
      console.error('Email Edge Function error:', error)
      throw new Error(error.message || 'Failed to send email')
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to send email notification:', error)
    return { success: false, error }
  }
}

// Backward compatibility wrapper
export const sendSpotlightApplicationNotification = async (
  application: {
    name: string
    email: string
    brand_name: string
    portfolio_url?: string
    description: string
  }
) => {
  return sendEmailNotification('spotlight', application)
}
