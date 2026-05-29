const express = require('express')
const { Resend } = require('resend')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

console.log('Resend API Key loaded:', process.env.RESEND_API_KEY ? 'Yes' : 'No')
console.log('API Key starts with:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'N/A')

app.post('/api/send-notification', async (req, res) => {
  try {
    const { type, data } = req.body
    
    console.log('📧 Received email request:', { type, email: data?.email })

    const emailTemplates = {
      spotlight: {
        subject: `New Spotlight Application: ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px;">
              <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #bb9457; font-size: 32px; font-family: Georgia, serif;">ADORZIA</h1>
                <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">New Spotlight Application Received</p>
              </div>
              <div style="padding: 40px 30px;">
                <h2 style="margin: 0 0 25px 0; color: #1a1a1a; font-size: 22px;">Application Details</h2>
                <table style="width: 100%; margin-bottom: 30px;">
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #666;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${data.name}</td></tr>
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #666;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #bb9457;">${data.email}</a></td></tr>
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #666;"><strong>Phone</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${data.phone}</td></tr>
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #666;"><strong>Location</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${data.location}</td></tr>
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #666;"><strong>Discipline</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${data.discipline}</td></tr>
                </table>
                <h3 style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 18px;">Vision Description</h3>
                <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #bb9457;">
                  <p style="margin: 0; line-height: 1.8; color: #333; white-space: pre-wrap;">${data.vision_description}</p>
                </div>
                <p style="margin: 30px 0 0 0; color: #999; font-size: 12px;">Submitted: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        `,
      },
      marketplace: {
        subject: `New Marketplace Application: ${data.designer_name || data.name}`,
        html: `<div style="font-family: Arial, sans-serif; padding: 40px;"><div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px;"><div style="background: linear-gradient(135deg, #000, #1a1a1a); padding: 40px 30px; text-align: center;"><h1 style="margin: 0; color: #bb9457; font-size: 32px;">ADORZIA</h1><p style="margin: 10px 0 0; color: #fff; font-size: 14px;">New Marketplace Application</p></div><div style="padding: 40px 30px;"><table style="width: 100%;"><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.designer_name || data.name}</td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #bb9457;">${data.email}</a></td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Brand</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.brand_name}</td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Category</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.category}</td></tr></table></div></div></div>`,
      },
      'studio-waitlist': {
        subject: `New Studio Waitlist Signup: ${data.name}`,
        html: `<div style="font-family: Arial, sans-serif; padding: 40px;"><div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px;"><div style="background: linear-gradient(135deg, #000, #1a1a1a); padding: 40px 30px; text-align: center;"><h1 style="margin: 0; color: #bb9457; font-size: 32px;">ADORZIA</h1><p style="margin: 10px 0 0; color: #fff; font-size: 14px;">New Studio Waitlist Signup</p></div><div style="padding: 40px 30px;"><table style="width: 100%;"><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.name}</td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #bb9457;">${data.email}</a></td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Phone</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.phone}</td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Discipline</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.discipline}</td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Preferred City</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.preferred_city}</td></tr></table></div></div></div>`,
      },
      partnership: {
        subject: `New Partnership Inquiry: ${data.company || data.name}`,
        html: `<div style="font-family: Arial, sans-serif; padding: 40px;"><div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px;"><div style="background: linear-gradient(135deg, #000, #1a1a1a); padding: 40px 30px; text-align: center;"><h1 style="margin: 0; color: #bb9457; font-size: 32px;">ADORZIA</h1><p style="margin: 10px 0 0; color: #fff; font-size: 14px;">New Partnership Inquiry</p></div><div style="padding: 40px 30px;"><table style="width: 100%;"><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.name}</td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #bb9457;">${data.email}</a></td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Company</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.company}</td></tr></table>${data.message ? `<h3 style="margin: 20px 0 15px;">Message</h3><div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #bb9457;"><p style="margin: 0; line-height: 1.8;">${data.message}</p></div>` : ''}</div></div></div>`,
      },
      contact: {
        subject: `New Contact Inquiry: ${data.name}`,
        html: `<div style="font-family: Arial, sans-serif; padding: 40px;"><div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px;"><div style="background: linear-gradient(135deg, #000, #1a1a1a); padding: 40px 30px; text-align: center;"><h1 style="margin: 0; color: #bb9457; font-size: 32px;">ADORZIA</h1><p style="margin: 10px 0 0; color: #fff; font-size: 14px;">New Contact Inquiry</p></div><div style="padding: 40px 30px;"><table style="width: 100%;"><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.name}</td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #bb9457;">${data.email}</a></td></tr><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Subject</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${data.subject}</td></tr></table>${data.message ? `<h3 style="margin: 20px 0 15px;">Message</h3><div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #bb9457;"><p style="margin: 0; line-height: 1.8;">${data.message}</p></div>` : ''}</div></div></div>`,
      },
      newsletter: {
        subject: `New Newsletter Subscription: ${data.email}`,
        html: `<div style="font-family: Arial, sans-serif; padding: 40px;"><div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px;"><div style="background: linear-gradient(135deg, #000, #1a1a1a); padding: 40px 30px; text-align: center;"><h1 style="margin: 0; color: #bb9457; font-size: 32px;">ADORZIA</h1><p style="margin: 10px 0 0; color: #fff; font-size: 14px;">New Newsletter Subscription</p></div><div style="padding: 40px 30px;"><table style="width: 100%;"><tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #bb9457;">${data.email}</a></td></tr></table><p style="margin: 30px 0 0; color: #999; font-size: 12px;">Subscribed: ${new Date().toLocaleString()}</p></div></div></div>`,
      },
    }

    const template = emailTemplates[type]
    if (!template) {
      console.error('❌ Invalid notification type:', type)
      return res.status(400).json({ error: 'Invalid notification type' })
    }

    console.log('📤 Sending email to haseeb.49251@gmail.com...')

    const { data: result, error } = await resend.emails.send({
      from: 'Adorzia Admin <onboarding@resend.dev>',
      to: ['haseeb.49251@gmail.com'],
      subject: template.subject,
      html: template.html,
    })

    if (error) {
      console.error('❌ Resend error:', error)
      return res.status(500).json({ error: error.message })
    }

    console.log('✅ Email sent successfully!')
    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Email notification error:', error)
    res.status(500).json({ error: 'Failed to send email notification' })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Email API server running on http://localhost:${PORT}`)
})
