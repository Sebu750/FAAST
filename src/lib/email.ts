export const sendSpotlightApplicationNotification = async (
  application: {
    name: string
    email: string
    brand_name: string
    portfolio_url?: string
    description: string
  }
) => {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Email API Error:', data)
      throw new Error(data.error || 'Failed to send email')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send email notification:', error)
    return { success: false, error }
  }
}
