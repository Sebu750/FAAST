export const sendEmailNotification = async (
  type: 'spotlight' | 'marketplace' | 'studio-waitlist' | 'partnership' | 'contact' | 'newsletter',
  data: any
) => {
  try {
    const response = await fetch('http://localhost:3001/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Email API Error:', result)
      throw new Error(result.error || 'Failed to send email')
    }

    return { success: true, data: result.data }
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
