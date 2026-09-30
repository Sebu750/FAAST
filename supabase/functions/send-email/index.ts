import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || ""
const ADMIN_EMAIL = "haseeb.49251@gmail.com"

// ── HTML escape ────────────────────────────────────────────────────
function esc(text: string): string {
  if (!text) return ""
  const map: Record<string, string> = {
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
    "'": "&#039;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;",
  }
  return String(text).replace(/[&<>"'`=/]/g, (s) => map[s])
}

// ── Email template wrapper ─────────────────────────────────────────
function wrapEmail(title: string, subtitle: string, bodyHtml: string, timestamp: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;"><table role="presentation" style="width:100%;border-collapse:collapse;background:#0a0a0a;"><tr><td align="center" style="padding:40px 20px;"><table role="presentation" style="max-width:600px;width:100%;border-collapse:collapse;background:#141414;border:1px solid #2a2a2a;"><tr><td style="background:linear-gradient(135deg,#000 0%,#1a1a1a 100%);padding:50px 40px;text-align:center;border-bottom:2px solid #bb9457;"><h1 style="margin:0;color:#bb9457;font-size:36px;font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:6px;text-transform:uppercase;">ADORZIA</h1><p style="margin:15px 0 0;color:#fff;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:300;opacity:.8;">${subtitle}</p></td></tr><tr><td style="padding:50px 40px;">${bodyHtml}<div style="border-top:1px solid #2a2a2a;padding-top:25px;margin-top:30px;"><p style="margin:0;color:#666;font-size:11px;letter-spacing:1px;">Received: ${timestamp}</p></div></td></tr><tr><td style="background:#0a0a0a;padding:30px 40px;text-align:center;border-top:1px solid #2a2a2a;"><p style="margin:0;color:#555;font-size:11px;letter-spacing:1px;">Adorzia Admin Console - Automated Notification</p></td></tr></table></td></tr></table></body></html>`
}

function fieldRow(label: string, value: string): string {
  return `<tr><td style="padding:15px 0;border-bottom:1px solid #2a2a2a;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;width:35%;">${label}</td><td style="padding:15px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;">${value}</td></tr>`
}

// ── Build email body per type ──────────────────────────────────────
function buildEmail(type: string, data: any): { subject: string; html: string } {
  const ts = new Date().toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })

  switch (type) {
    case "contact": {
      const body = `<h2 style="margin:0 0 30px;color:#fff;font-size:20px;font-weight:400;letter-spacing:2px;text-transform:uppercase;font-family:Georgia,serif;">Contact Inquiry</h2>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:35px;">
          ${fieldRow("Name", esc(data.name))}
          ${fieldRow("Email", `<a href="mailto:${esc(data.email)}" style="color:#bb9457;text-decoration:none;">${esc(data.email)}</a>`)}
          ${fieldRow("Subject", esc(data.subject || "N/A"))}
        </table>
        ${data.message ? `<h3 style="margin:0 0 20px;color:#fff;font-size:14px;font-weight:400;letter-spacing:2px;text-transform:uppercase;">Message</h3><div style="background:#1a1a1a;padding:25px;border-left:3px solid #bb9457;margin-bottom:30px;"><p style="margin:0;line-height:1.8;color:#ccc;font-size:14px;white-space:pre-wrap;">${esc(data.message)}</p></div>` : ""}`
      return { subject: `New Contact Inquiry: ${esc(data.name)}`, html: wrapEmail("ADORZIA", "Contact Inquiry Received", body, ts) }
    }
    case "studio-waitlist": {
      const body = `<h2 style="margin:0 0 30px;color:#fff;font-size:20px;font-weight:400;letter-spacing:2px;text-transform:uppercase;font-family:Georgia,serif;">Studio Waitlist Signup</h2>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:35px;">
          ${fieldRow("Name", esc(data.name))}
          ${fieldRow("Email", `<a href="mailto:${esc(data.email)}" style="color:#bb9457;text-decoration:none;">${esc(data.email)}</a>`)}
          ${fieldRow("Phone", esc(data.phone || "N/A"))}
          ${fieldRow("Discipline", esc(data.discipline || "N/A"))}
          ${fieldRow("Preferred City", esc(data.preferred_city || "N/A"))}
        </table>`
      return { subject: `New Studio Waitlist Signup: ${esc(data.name)}`, html: wrapEmail("ADORZIA", "Studio Waitlist Signup", body, ts) }
    }
    case "partnership": {
      const body = `<h2 style="margin:0 0 30px;color:#fff;font-size:20px;font-weight:400;letter-spacing:2px;text-transform:uppercase;font-family:Georgia,serif;">Partnership Inquiry</h2>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:35px;">
          ${fieldRow("Contact Name", esc(data.name))}
          ${fieldRow("Email", `<a href="mailto:${esc(data.email)}" style="color:#bb9457;text-decoration:none;">${esc(data.email)}</a>`)}
          ${fieldRow("Company", esc(data.company || "N/A"))}
        </table>
        ${data.message ? `<h3 style="margin:0 0 20px;color:#fff;font-size:14px;font-weight:400;letter-spacing:2px;text-transform:uppercase;">Message</h3><div style="background:#1a1a1a;padding:25px;border-left:3px solid #bb9457;margin-bottom:30px;"><p style="margin:0;line-height:1.8;color:#ccc;font-size:14px;white-space:pre-wrap;">${esc(data.message)}</p></div>` : ""}`
      return { subject: `New Partnership Inquiry: ${esc(data.company || data.name)}`, html: wrapEmail("ADORZIA", "Partnership Inquiry Received", body, ts) }
    }
    case "marketplace": {
      const body = `<h2 style="margin:0 0 30px;color:#fff;font-size:20px;font-weight:400;letter-spacing:2px;text-transform:uppercase;font-family:Georgia,serif;">Marketplace Application</h2>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:35px;">
          ${fieldRow("Name", esc(data.designer_name || data.name))}
          ${fieldRow("Email", `<a href="mailto:${esc(data.email)}" style="color:#bb9457;text-decoration:none;">${esc(data.email)}</a>`)}
          ${fieldRow("Brand", esc(data.brand_name || "N/A"))}
          ${fieldRow("Category", esc(data.category || "N/A"))}
        </table>`
      return { subject: `New Marketplace Application: ${esc(data.designer_name || data.name)}`, html: wrapEmail("ADORZIA", "Marketplace Application Received", body, ts) }
    }
    case "spotlight": {
      const body = `<h2 style="margin:0 0 30px;color:#fff;font-size:20px;font-weight:400;letter-spacing:2px;text-transform:uppercase;font-family:Georgia,serif;">Spotlight Application</h2>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:35px;">
          ${fieldRow("Name", esc(data.name))}
          ${fieldRow("Email", `<a href="mailto:${esc(data.email)}" style="color:#bb9457;text-decoration:none;">${esc(data.email)}</a>`)}
          ${fieldRow("Phone", esc(data.phone || "N/A"))}
          ${fieldRow("Location", esc(data.location))}
          ${fieldRow("Discipline", esc(data.discipline))}
        </table>
        ${data.vision_description ? `<h3 style="margin:0 0 20px;color:#fff;font-size:14px;font-weight:400;letter-spacing:2px;text-transform:uppercase;">Vision Statement</h3><div style="background:#1a1a1a;padding:25px;border-left:3px solid #bb9457;margin-bottom:30px;"><p style="margin:0;line-height:1.8;color:#ccc;font-size:14px;white-space:pre-wrap;">${esc(data.vision_description)}</p></div>` : ""}`
      return { subject: `New Spotlight Application: ${esc(data.name)}`, html: wrapEmail("ADORZIA", "Spotlight Application Received", body, ts) }
    }
    case "newsletter": {
      const body = `<h2 style="margin:0 0 30px;color:#fff;font-size:20px;font-weight:400;letter-spacing:2px;text-transform:uppercase;font-family:Georgia,serif;">Newsletter Subscription</h2>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:35px;">
          ${fieldRow("Email", `<a href="mailto:${esc(data.email)}" style="color:#bb9457;text-decoration:none;">${esc(data.email)}</a>`)}
        </table>`
      return { subject: `New Newsletter Subscription: ${esc(data.email)}`, html: wrapEmail("ADORZIA", "New Newsletter Subscription", body, ts) }
    }
    default:
      return { subject: "New Notification", html: wrapEmail("ADORZIA", "Notification", `<p style="color:#ccc;">Unknown notification type: ${esc(type)}</p>`, ts) }
  }
}

// ── Handler ────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const { type, data } = await req.json()
    const { subject, html } = buildEmail(type, data)

    // Send via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Adorzia <hello@mail.adorzia.com>",
        to: [ADMIN_EMAIL],
        subject,
        html,
      }),
    })

    const result = await resendRes.json()

    if (!resendRes.ok) {
      console.error("Resend API error:", result)
      return new Response(JSON.stringify({ error: result.message || "Email send failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Edge function error:", error)
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
