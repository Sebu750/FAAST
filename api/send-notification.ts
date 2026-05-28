import { Resend } from 'resend'

export default async function handler(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY!)

  try {
    const body = await request.json()
    const { name, email, brand_name, portfolio_url, description } = body

    const { data, error } = await resend.emails.send({
      from: 'FAAST Applications <onboarding@resend.dev>',
      to: ['haseeb.49251@gmail.com'],
      subject: `New Spotlight Application: ${brand_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Spotlight Application</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px;">
                  <tr>
                    <td style="background-color: #6f1d1b; padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #bb9457; font-size: 28px;">FAAST</h1>
                      <p style="margin: 10px 0 0 0; color: #ffe6a7; font-size: 14px;">New Spotlight Application Received</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 20px 0; color: #432818;">Application Details</h2>
                      <table style="width: 100%; margin-bottom: 30px;">
                        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${name}</td></tr>
                        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}" style="color: #bb9457;">${email}</a></td></tr>
                        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Brand</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${brand_name}</td></tr>
                        ${portfolio_url ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Portfolio</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="${portfolio_url}" style="color: #bb9457;">${portfolio_url}</a></td></tr>` : ''}
                      </table>
                      <h3 style="margin: 0 0 15px 0; color: #432818;">Concept Statement</h3>
                      <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #bb9457;">
                        <p style="margin: 0; line-height: 1.8; white-space: pre-wrap;">${description}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f5f5f5; padding: 30px; text-align: center;">
                      <p style="margin: 0; color: #999; font-size: 12px;">Automated notification from FAAST</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 })
  }
}
