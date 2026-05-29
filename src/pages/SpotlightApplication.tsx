import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import heroRunway from '../assets/hero-runway.jpg'

const SpotlightApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    hear_about: '',
    discipline: '',
    years_experience: '',
    formal_education: '',
    institution_name: '',
    creative_practice: '',
    portfolio_url: '',
    vision_description: '',
    biggest_obstacle: '',
    why_now: '',
    heritage_craft: '',
    heritage_description: '',
    additional_info: '',
    declaration_original_work: false,
    declaration_pakistan_age: false,
    declaration_presentations: false,
    declaration_terms: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('spotlight_applications')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          age: parseInt(formData.age),
          hear_about: formData.hear_about,
          discipline: formData.discipline,
          years_experience: formData.years_experience,
          formal_education: formData.formal_education,
          institution_name: formData.institution_name || null,
          creative_practice: formData.creative_practice,
          portfolio_url: formData.portfolio_url || null,
          vision_description: formData.vision_description,
          biggest_obstacle: formData.biggest_obstacle,
          why_now: formData.why_now,
          heritage_craft: formData.heritage_craft || null,
          heritage_description: formData.heritage_description || null,
          additional_info: formData.additional_info || null,
          declaration_original_work: formData.declaration_original_work,
          declaration_pakistan_age: formData.declaration_pakistan_age,
          declaration_presentations: formData.declaration_presentations,
          declaration_terms: formData.declaration_terms
        }])

      if (supabaseError) throw supabaseError

      // Send email notification
      await sendEmailNotification('spotlight', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        age: formData.age,
        discipline: formData.discipline,
        years_experience: formData.years_experience,
        portfolio_url: formData.portfolio_url || undefined,
        vision_description: formData.vision_description,
        biggest_obstacle: formData.biggest_obstacle
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        age: '',
        hear_about: '',
        discipline: '',
        years_experience: '',
        formal_education: '',
        institution_name: '',
        creative_practice: '',
        portfolio_url: '',
        vision_description: '',
        biggest_obstacle: '',
        why_now: '',
        heritage_craft: '',
        heritage_description: '',
        additional_info: '',
        declaration_original_work: false,
        declaration_pakistan_age: false,
        declaration_presentations: false,
        declaration_terms: false
      })
      setSubmitted(true)
      window.scrollTo(0, 0)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-neutral-950">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#bb9457]/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-4 tracking-tight">Application Received</h1>
          <p className="text-neutral-400 text-lg mb-8 font-light">Your portfolio has been entered into the archive. Expect evaluation updates via secure mail.</p>
          <button onClick={() => setSubmitted(false)} className="bg-[#bb9457] text-black px-8 py-3 font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-all duration-300">
            Submit Another Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SEO
        title="Apply for Adorzia Spotlight Fall 2026 - Pakistan's Fashion Talent Event"
        description="Submit your application for Adorzia Spotlight Fall 2026. Applications open June 1, 2026. We are looking for Pakistan's next fashion visionaries."
        canonicalURL="https://adorzia.com/spotlight/apply"
        ogTitle="Apply for Adorzia Spotlight Fall 2026"
        ogDescription="Pakistan's first national fashion talent investment event. Submit your application now."
        ogImageAlt="Adorzia Spotlight Application"
        keywords="Adorzia Spotlight application, fashion competition Pakistan, apply fashion event, Pakistani designer application"
      />

      {/* Hero Background */}
      <section className="relative py-40 border-t border-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroRunway}
            alt="" 
            className="w-full h-full object-cover scale-110 opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.12),transparent_70%)]" />
        </div>
        
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-[#bb9457]/30 bg-black/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Spotlight Fall 2026 — Application</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight">
              This is your application. <span className="text-[#bb9457] italic font-light">Take your time with it.</span>
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              We read every submission carefully. Be honest, be specific, and show us what makes your creative vision worth investing in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-10 md:p-12 border border-neutral-800 rounded-sm bg-neutral-900/30 backdrop-blur-sm">
            {/* Name & Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Full name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="Your full name" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">City and province *</label>
                <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="Lahore, Punjab" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Email address *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Phone number *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="+92 xxx xxxxxxx" />
              </div>
            </div>

            {/* Age & Hear About */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Age — must be eighteen or older *</label>
                <input type="number" required min="18" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="25" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">How did you hear about Spotlight? *</label>
                <select required value={formData.hear_about} onChange={(e) => setFormData({ ...formData, hear_about: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                  <option value="" className="bg-neutral-950">Select an option</option>
                  <option value="instagram" className="bg-neutral-950">Instagram</option>
                  <option value="word-of-mouth" className="bg-neutral-950">Word of mouth</option>
                  <option value="website" className="bg-neutral-950">Adorzia website</option>
                  <option value="press" className="bg-neutral-950">Press coverage</option>
                  <option value="friend" className="bg-neutral-950">A friend or mentor</option>
                  <option value="other" className="bg-neutral-950">Other</option>
                </select>
              </div>
            </div>

            {/* Discipline & Experience */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Discipline *</label>
                <select required value={formData.discipline} onChange={(e) => setFormData({ ...formData, discipline: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                  <option value="" className="bg-neutral-950">Select your discipline</option>
                  <option value="fashion-design" className="bg-neutral-950">Fashion design</option>
                  <option value="textile-craft" className="bg-neutral-950">Textile and heritage craft</option>
                  <option value="entrepreneurship" className="bg-neutral-950">Fashion entrepreneurship</option>
                  <option value="accessories" className="bg-neutral-950">Accessories design</option>
                  <option value="mixed" className="bg-neutral-950">Mixed or interdisciplinary</option>
                  <option value="other" className="bg-neutral-950">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Years working in your discipline *</label>
                <select required value={formData.years_experience} onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                  <option value="" className="bg-neutral-950">Select duration</option>
                  <option value="<1" className="bg-neutral-950">Less than 1 year</option>
                  <option value="1-3" className="bg-neutral-950">1 to 3 years</option>
                  <option value="3-5" className="bg-neutral-950">3 to 5 years</option>
                  <option value="5+" className="bg-neutral-950">5 or more years</option>
                </select>
              </div>
            </div>

            {/* Education */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Formal education in fashion or design? *</label>
                <select required value={formData.formal_education} onChange={(e) => setFormData({ ...formData, formal_education: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                  <option value="" className="bg-neutral-950">Select an option</option>
                  <option value="yes" className="bg-neutral-950">Yes</option>
                  <option value="no" className="bg-neutral-950">No</option>
                  <option value="studying" className="bg-neutral-950">Currently studying</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Institution name (optional)</label>
                <input type="text" value={formData.institution_name} onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="Institution name" />
              </div>
            </div>

            {/* Creative Practice */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">
                Describe your creative practice. What do you make, how do you make it, and what makes it distinctly yours? *<br />
                <span className="text-neutral-600">Minimum 100 words</span>
              </label>
              <textarea required rows={6} value={formData.creative_practice} onChange={(e) => setFormData({ ...formData, creative_practice: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe your creative practice..." />
            </div>

            {/* Portfolio URL */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Portfolio, website, or social media link</label>
              <input type="url" value={formData.portfolio_url} onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="https://your-portfolio.com" />
            </div>

            {/* Vision */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">
                If Adorzia invested in you, what would you build? Describe the brand, product, customer, and future you are working toward. *<br />
                <span className="text-neutral-600">Minimum 150 words</span>
              </label>
              <textarea required rows={8} value={formData.vision_description} onChange={(e) => setFormData({ ...formData, vision_description: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe what you would build..." />
            </div>

            {/* Obstacle & Why Now */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">What is the single biggest obstacle between where you are now and where you want to be? *</label>
                <textarea required rows={5} value={formData.biggest_obstacle} onChange={(e) => setFormData({ ...formData, biggest_obstacle: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe your biggest obstacle..." />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Why is now the right moment for what you are building? *</label>
                <textarea required rows={5} value={formData.why_now} onChange={(e) => setFormData({ ...formData, why_now: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Explain why now is the right moment..." />
              </div>
            </div>

            {/* Heritage */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Does your work draw from a specific Pakistani craft tradition or cultural heritage? *</label>
              <select value={formData.heritage_craft} onChange={(e) => setFormData({ ...formData, heritage_craft: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                <option value="" className="bg-neutral-950">Select an option</option>
                <option value="yes" className="bg-neutral-950">Yes</option>
                <option value="no" className="bg-neutral-950">No</option>
              </select>
            </div>

            {formData.heritage_craft === 'yes' && (
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">
                  Describe the tradition, how it informs your work, and how you are evolving or preserving it
                </label>
                <textarea rows={6} value={formData.heritage_description} onChange={(e) => setFormData({ ...formData, heritage_description: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe the craft tradition..." />
              </div>
            )}

            {/* Additional Info */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">
                Is there anything about your background, circumstances, or creative journey you want us to know? (Optional)
              </label>
              <textarea rows={5} value={formData.additional_info} onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Share anything else you want us to know..." />
            </div>

            {/* Declarations */}
            <div className="pt-6 border-t border-neutral-800 space-y-4">
              <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors">
                <input type="checkbox" required checked={formData.declaration_original_work} onChange={(e) => setFormData({ ...formData, declaration_original_work: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                <span className="text-neutral-400 font-light text-sm">I confirm that all work submitted is my own original creative work</span>
              </label>
              <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors">
                <input type="checkbox" required checked={formData.declaration_pakistan_age} onChange={(e) => setFormData({ ...formData, declaration_pakistan_age: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                <span className="text-neutral-400 font-light text-sm">I confirm that I am based in Pakistan and am eighteen years of age or older</span>
              </label>
              <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors">
                <input type="checkbox" required checked={formData.declaration_presentations} onChange={(e) => setFormData({ ...formData, declaration_presentations: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                <span className="text-neutral-400 font-light text-sm">I understand that if shortlisted I will be expected to participate in presentation sessions</span>
              </label>
              <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors">
                <input type="checkbox" required checked={formData.declaration_terms} onChange={(e) => setFormData({ ...formData, declaration_terms: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                <span className="text-neutral-400 font-light text-sm">I have read and agree to the Spotlight application terms and conditions</span>
              </label>
            </div>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm">{error}</div>}

            <button type="submit" disabled={submitting} className="w-full px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group">
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit my application
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-neutral-600 font-light text-xs text-center leading-relaxed">
              Submissions close July 31, 2026 at midnight PKT. We will confirm receipt within five working days.
              For questions write to <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default SpotlightApplication
