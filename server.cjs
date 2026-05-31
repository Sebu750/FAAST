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

// HTML escape function to prevent XSS attacks
const escapeHtml = (text) => {
  if (!text) return ''
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }
  return String(text).replace(/[&<>"'`=\/]/g, (s) => map[s])
}

app.post('/api/send-notification', async (req, res) => {
  try {
    const { type, data } = req.body
    
    console.log('📧 Received email request:', { type, email: data?.email })

    const emailTemplates = {
      spotlight: {
        subject: `New Spotlight Application: ${escapeHtml(data.name)}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #141414; border: 1px solid #2a2a2a;">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 40px; text-align: center; border-bottom: 2px solid #bb9457;">
                        <h1 style="margin: 0; color: #bb9457; font-size: 36px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: 6px; text-transform: uppercase;">ADORZIA</h1>
                        <p style="margin: 15px 0 0 0; color: #ffffff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300; opacity: 0.8;">Spotlight Application Received</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 50px 40px;">
                        <h2 style="margin: 0 0 30px 0; color: #ffffff; font-size: 20px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; font-family: Georgia, serif;">Application Details</h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 35px;">
                          <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 35%;">Name</td>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.name)}</td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Email</td>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #bb9457; text-decoration: none;">${escapeHtml(data.email)}</a></td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Phone</td>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.phone) || 'N/A'}</td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Location</td>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.location)}</td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Discipline</td>
                            <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.discipline)}</td>
                          </tr>
                        </table>
                        
                        ${data.vision_description ? `
                        <h3 style="margin: 0 0 20px 0; color: #ffffff; font-size: 14px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;">Vision Statement</h3>
                        <div style="background-color: #1a1a1a; padding: 25px; border-left: 3px solid #bb9457; margin-bottom: 30px;">
                          <p style="margin: 0; line-height: 1.8; color: #cccccc; font-size: 14px; white-space: pre-wrap;">${escapeHtml(data.vision_description)}</p>
                        </div>
                        ` : ''}
                        
                        <div style="border-top: 1px solid #2a2a2a; padding-top: 25px; margin-top: 30px;">
                          <p style="margin: 0; color: #666666; font-size: 11px; letter-spacing: 1px;">Submitted: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #0a0a0a; padding: 30px 40px; text-align: center; border-top: 1px solid #2a2a2a;">
                        <p style="margin: 0; color: #555555; font-size: 11px; letter-spacing: 1px;">Adorzia Admin Console • Automated Notification</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      },
      marketplace: {
        subject: `New Marketplace Application: ${escapeHtml(data.designer_name || data.name)}`,
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"><table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;"><tr><td align="center" style="padding: 40px 20px;"><table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #141414; border: 1px solid #2a2a2a;"><tr><td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 40px; text-align: center; border-bottom: 2px solid #bb9457;"><h1 style="margin: 0; color: #bb9457; font-size: 36px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: 6px; text-transform: uppercase;">ADORZIA</h1><p style="margin: 15px 0 0 0; color: #ffffff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300; opacity: 0.8;">Marketplace Application Received</p></td></tr><tr><td style="padding: 50px 40px;"><h2 style="margin: 0 0 30px 0; color: #ffffff; font-size: 20px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; font-family: Georgia, serif;">Application Details</h2><table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 35px;"><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 35%;">Name</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.designer_name || data.name)}</td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Email</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #bb9457; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Brand</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.brand_name) || 'N/A'}</td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Category</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.category) || 'N/A'}</td></tr></table><div style="border-top: 1px solid #2a2a2a; padding-top: 25px; margin-top: 30px;"><p style="margin: 0; color: #666666; font-size: 11px; letter-spacing: 1px;">Submitted: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p></div></td></tr><tr><td style="background-color: #0a0a0a; padding: 30px 40px; text-align: center; border-top: 1px solid #2a2a2a;"><p style="margin: 0; color: #555555; font-size: 11px; letter-spacing: 1px;">Adorzia Admin Console • Automated Notification</p></td></tr></table></td></tr></table></body></html>`,
      },
      'studio-waitlist': {
        subject: `New Studio Waitlist Signup: ${escapeHtml(data.name)}`,
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"><table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;"><tr><td align="center" style="padding: 40px 20px;"><table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #141414; border: 1px solid #2a2a2a;"><tr><td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 40px; text-align: center; border-bottom: 2px solid #bb9457;"><h1 style="margin: 0; color: #bb9457; font-size: 36px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: 6px; text-transform: uppercase;">ADORZIA</h1><p style="margin: 15px 0 0 0; color: #ffffff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300; opacity: 0.8;">Studio Waitlist Signup</p></td></tr><tr><td style="padding: 50px 40px;"><h2 style="margin: 0 0 30px 0; color: #ffffff; font-size: 20px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; font-family: Georgia, serif;">Applicant Details</h2><table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 35px;"><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 35%;">Name</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.name)}</td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Email</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #bb9457; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Phone</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.phone) || 'N/A'}</td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Discipline</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.discipline) || 'N/A'}</td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Preferred City</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.preferred_city) || 'N/A'}</td></tr></table><div style="border-top: 1px solid #2a2a2a; padding-top: 25px; margin-top: 30px;"><p style="margin: 0; color: #666666; font-size: 11px; letter-spacing: 1px;">Joined: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p></div></td></tr><tr><td style="background-color: #0a0a0a; padding: 30px 40px; text-align: center; border-top: 1px solid #2a2a2a;"><p style="margin: 0; color: #555555; font-size: 11px; letter-spacing: 1px;">Adorzia Admin Console • Automated Notification</p></td></tr></table></td></tr></table></body></html>`,
      },
      partnership: {
        subject: `New Partnership Inquiry: ${escapeHtml(data.company || data.name)}`,
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"><table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;"><tr><td align="center" style="padding: 40px 20px;"><table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #141414; border: 1px solid #2a2a2a;"><tr><td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 40px; text-align: center; border-bottom: 2px solid #bb9457;"><h1 style="margin: 0; color: #bb9457; font-size: 36px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: 6px; text-transform: uppercase;">ADORZIA</h1><p style="margin: 15px 0 0 0; color: #ffffff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300; opacity: 0.8;">Partnership Inquiry Received</p></td></tr><tr><td style="padding: 50px 40px;"><h2 style="margin: 0 0 30px 0; color: #ffffff; font-size: 20px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; font-family: Georgia, serif;">Inquiry Details</h2><table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 35px;"><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 35%;">Contact Name</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.name)}</td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Email</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #bb9457; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Company</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.company) || 'N/A'}</td></tr></table>${data.message ? `<h3 style="margin: 0 0 20px 0; color: #ffffff; font-size: 14px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;">Message</h3><div style="background-color: #1a1a1a; padding: 25px; border-left: 3px solid #bb9457; margin-bottom: 30px;"><p style="margin: 0; line-height: 1.8; color: #cccccc; font-size: 14px; white-space: pre-wrap;">${escapeHtml(data.message)}</p></div>` : ''}<div style="border-top: 1px solid #2a2a2a; padding-top: 25px; margin-top: 30px;"><p style="margin: 0; color: #666666; font-size: 11px; letter-spacing: 1px;">Received: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p></div></td></tr><tr><td style="background-color: #0a0a0a; padding: 30px 40px; text-align: center; border-top: 1px solid #2a2a2a;"><p style="margin: 0; color: #555555; font-size: 11px; letter-spacing: 1px;">Adorzia Admin Console • Automated Notification</p></td></tr></table></td></tr></table></body></html>`,
      },
      contact: {
        subject: `New Contact Inquiry: ${escapeHtml(data.name)}`,
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"><table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;"><tr><td align="center" style="padding: 40px 20px;"><table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #141414; border: 1px solid #2a2a2a;"><tr><td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 40px; text-align: center; border-bottom: 2px solid #bb9457;"><h1 style="margin: 0; color: #bb9457; font-size: 36px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: 6px; text-transform: uppercase;">ADORZIA</h1><p style="margin: 15px 0 0 0; color: #ffffff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300; opacity: 0.8;">Contact Inquiry Received</p></td></tr><tr><td style="padding: 50px 40px;"><h2 style="margin: 0 0 30px 0; color: #ffffff; font-size: 20px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; font-family: Georgia, serif;">Inquiry Details</h2><table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 35px;"><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 35%;">Name</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.name)}</td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Email</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #bb9457; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Subject</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; font-size: 14px;">${escapeHtml(data.subject) || 'N/A'}</td></tr></table>${data.message ? `<h3 style="margin: 0 0 20px 0; color: #ffffff; font-size: 14px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;">Message</h3><div style="background-color: #1a1a1a; padding: 25px; border-left: 3px solid #bb9457; margin-bottom: 30px;"><p style="margin: 0; line-height: 1.8; color: #cccccc; font-size: 14px; white-space: pre-wrap;">${escapeHtml(data.message)}</p></div>` : ''}<div style="border-top: 1px solid #2a2a2a; padding-top: 25px; margin-top: 30px;"><p style="margin: 0; color: #666666; font-size: 11px; letter-spacing: 1px;">Received: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p></div></td></tr><tr><td style="background-color: #0a0a0a; padding: 30px 40px; text-align: center; border-top: 1px solid #2a2a2a;"><p style="margin: 0; color: #555555; font-size: 11px; letter-spacing: 1px;">Adorzia Admin Console • Automated Notification</p></td></tr></table></td></tr></table></body></html>`,
      },
      newsletter: {
        subject: `New Newsletter Subscription: ${escapeHtml(data.email)}`,
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"><table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;"><tr><td align="center" style="padding: 40px 20px;"><table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #141414; border: 1px solid #2a2a2a;"><tr><td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 40px; text-align: center; border-bottom: 2px solid #bb9457;"><h1 style="margin: 0; color: #bb9457; font-size: 36px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: 6px; text-transform: uppercase;">ADORZIA</h1><p style="margin: 15px 0 0 0; color: #ffffff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300; opacity: 0.8;">New Newsletter Subscription</p></td></tr><tr><td style="padding: 50px 40px;"><h2 style="margin: 0 0 30px 0; color: #ffffff; font-size: 20px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; font-family: Georgia, serif;">Subscriber Details</h2><table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 35px;"><tr><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 35%;">Email</td><td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #bb9457; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr></table><div style="border-top: 1px solid #2a2a2a; padding-top: 25px; margin-top: 30px;"><p style="margin: 0; color: #666666; font-size: 11px; letter-spacing: 1px;">Subscribed: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p></div></td></tr><tr><td style="background-color: #0a0a0a; padding: 30px 40px; text-align: center; border-top: 1px solid #2a2a2a;"><p style="margin: 0; color: #555555; font-size: 11px; letter-spacing: 1px;">Adorzia Admin Console • Automated Notification</p></td></tr></table></td></tr></table></body></html>`,
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
