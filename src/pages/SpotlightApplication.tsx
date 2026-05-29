import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendSpotlightApplicationNotification } from '../lib/email'
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
      await sendSpotlightApplicationNotification({
        name: formData.name,
        email: formData.email,
        brand_name: formData.location,
        portfolio_url: formData.portfolio_url || undefined,
        description: formData.creative_practice
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
          <div className="text-6xl mb-6">✨</div>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-4 tracking-tight">Application Received</h1>
          <p className="text-neutral-400 text-lg mb-8 font-light">Your portfolio has been entered into the archive. Expect evaluation updates via secure mail.</p>
          <button onClick={() => setSubmitted(false)} className="bg-[#bb9457] text-black px-8 py-3 font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-colors">
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
        {/* Enhanced background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroRunway}
            alt="" 
            className="w-full h-full object-cover scale-110 opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.12),transparent_70%)]" />
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header with glassmorphism */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Spotlight Fall 2026 — Application</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              This is your application. <span className="text-gradient italic font-light">Take your time with it.</span>
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              We read every submission carefully. There is no word count that guarantees selection and no format that automatically impresses us. Be honest, be specific, and show us what makes your creative vision worth investing in.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 glass px-6 py-3 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse" />
              <p className="text-white font-normal text-sm">Submissions open June 1, 2026</p>
            </div>
          </div>

          {/* Application Form with glassmorphism container */}
          <form onSubmit={handleSubmit} className="glass-dark p-10 md:p-16 rounded-sm space-y-16">
            {/* Personal Information */}
            <div className="border-b border-white/10 pb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#bb9457]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Personal information</h3>
              </div>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Full name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">City and province *</label>
                    <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm" placeholder="Lahore, Punjab" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Email address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Phone number *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm" placeholder="+92 xxx xxxxxxx" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Age — must be eighteen or older *</label>
                    <input type="number" required min="18" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm" placeholder="25" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">How did you hear about Spotlight? *</label>
                    <select required value={formData.hear_about} onChange={(e) => setFormData({ ...formData, hear_about: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm cursor-pointer">
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
              </div>
            </div>

            {/* Creative Background */}
            <div className="border-b border-white/10 pb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#bb9457]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Creative background</h3>
              </div>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Discipline *</label>
                    <select required value={formData.discipline} onChange={(e) => setFormData({ ...formData, discipline: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm cursor-pointer">
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
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Years working in your discipline *</label>
                    <select required value={formData.years_experience} onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm cursor-pointer">
                      <option value="" className="bg-neutral-950">Select duration</option>
                      <option value="<1" className="bg-neutral-950">Less than 1 year</option>
                      <option value="1-3" className="bg-neutral-950">1 to 3 years</option>
                      <option value="3-5" className="bg-neutral-950">3 to 5 years</option>
                      <option value="5+" className="bg-neutral-950">5 or more years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Formal education in fashion or design *</label>
                  <select required value={formData.formal_education} onChange={(e) => setFormData({ ...formData, formal_education: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm cursor-pointer">
                    <option value="" className="bg-neutral-950">Select an option</option>
                    <option value="yes" className="bg-neutral-950">Yes</option>
                    <option value="no" className="bg-neutral-950">No</option>
                    <option value="studying" className="bg-neutral-950">Currently studying</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">If yes — institution name (optional)</label>
                  <input type="text" value={formData.institution_name} onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm" placeholder="Institution name" />
                </div>
              </div>
            </div>

            {/* Your Work */}
            <div className="border-b border-white/10 pb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#bb9457]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your work</h3>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">
                    Describe your creative practice in your own words. What do you make, how do you make it, and what makes it distinctly yours? *<br />
                    <span className="text-neutral-500 text-[10px]">(Minimum 100 words)</span>
                  </label>
                  <textarea required rows={8} value={formData.creative_practice} onChange={(e) => setFormData({ ...formData, creative_practice: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 resize-none rounded-sm" placeholder="Describe your creative practice..." />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">
                    Upload images of your work<br />
                    <span className="text-neutral-500 text-[10px]">Up to 8 images, JPG or PNG, maximum 5 MB each. These can be finished pieces, works in progress, sketches, studio photographs, or any visual documentation of what you create.</span>
                  </label>
                  <div className="relative group">
                    <input type="file" multiple accept="image/jpeg,image/png" className="w-full text-neutral-400 file:bg-white/10 file:text-white file:border-0 file:px-6 file:py-3 file:rounded-sm file:cursor-pointer hover:file:bg-white/20 file:transition-colors transition-all duration-300" />
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 pointer-events-none rounded-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    If you have a website, portfolio, or social media presence that shows your work, share the link here — optional
                  </label>
                  <input type="url" value={formData.portfolio_url} onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm" placeholder="https://your-portfolio.com" />
                </div>
              </div>
            </div>

            {/* Your Vision */}
            <div className="border-b border-white/10 pb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#bb9457]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your vision</h3>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">
                    If Adorzia invested in you and gave you everything Spotlight offers — what would you build? Describe the brand, the product, the customer, and the future you are working toward. *<br />
                    <span className="text-neutral-500 text-[10px]">(Minimum 150 words)</span>
                  </label>
                  <textarea required rows={10} value={formData.vision_description} onChange={(e) => setFormData({ ...formData, vision_description: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 resize-none rounded-sm" placeholder="Describe what you would build..." />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">
                    What is the single biggest obstacle between where you are now and where you want to be? *
                  </label>
                  <textarea required rows={5} value={formData.biggest_obstacle} onChange={(e) => setFormData({ ...formData, biggest_obstacle: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 resize-none rounded-sm" placeholder="Describe your biggest obstacle..." />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">
                    Why is now the right moment for what you are building? *
                  </label>
                  <textarea required rows={5} value={formData.why_now} onChange={(e) => setFormData({ ...formData, why_now: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 resize-none rounded-sm" placeholder="Explain why now is the right moment..." />
                </div>
              </div>
            </div>

            {/* Heritage and Identity */}
            <div className="border-b border-white/10 pb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#bb9457]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Heritage and identity - optional section</h3>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block mb-3">Does your work draw from a specific Pakistani craft tradition or cultural heritage? *</label>
                  <select value={formData.heritage_craft} onChange={(e) => setFormData({ ...formData, heritage_craft: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 rounded-sm cursor-pointer">
                    <option value="" className="bg-neutral-950">Select an option</option>
                    <option value="yes" className="bg-neutral-950">Yes</option>
                    <option value="no" className="bg-neutral-950">No</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    If yes - describe the tradition, how it informs your work, and how you are evolving or preserving it
                  </label>
                  <textarea rows={7} value={formData.heritage_description} onChange={(e) => setFormData({ ...formData, heritage_description: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 resize-none rounded-sm" placeholder="Describe the craft tradition..." />
                </div>
              </div>
            </div>

            {/* Final Question */}
            <div className="border-b border-white/10 pb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#bb9457]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Final question</h3>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                  Is there anything about your background, your circumstances, or your creative journey that you want us to know that the questions above did not give you space to share? — optional
                </label>
                <textarea rows={7} value={formData.additional_info} onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })} className="w-full border-b border-neutral-700 bg-white/5 py-4 px-4 text-white outline-none focus:border-[#bb9457] focus:bg-white/10 transition-all duration-300 resize-none rounded-sm" placeholder="Share anything else you want us to know..." />
              </div>
            </div>

            {/* Declaration */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#bb9457]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Declaration</h3>
              </div>
              <div className="space-y-4">
                <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors duration-300">
                  <input type="checkbox" required checked={formData.declaration_original_work} onChange={(e) => setFormData({ ...formData, declaration_original_work: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                  <span className="text-neutral-300 font-light text-sm">I confirm that all work submitted is my own original creative work</span>
                </label>
                <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors duration-300">
                  <input type="checkbox" required checked={formData.declaration_pakistan_age} onChange={(e) => setFormData({ ...formData, declaration_pakistan_age: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                  <span className="text-neutral-300 font-light text-sm">I confirm that I am based in Pakistan and am eighteen years of age or older</span>
                </label>
                <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors duration-300">
                  <input type="checkbox" required checked={formData.declaration_presentations} onChange={(e) => setFormData({ ...formData, declaration_presentations: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                  <span className="text-neutral-300 font-light text-sm">I understand that if shortlisted I will be expected to participate in presentation sessions in person or virtually</span>
                </label>
                <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors duration-300">
                  <input type="checkbox" required checked={formData.declaration_terms} onChange={(e) => setFormData({ ...formData, declaration_terms: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                  <span className="text-neutral-300 font-light text-sm">I have read and agree to the Spotlight application terms and conditions</span>
                </label>
              </div>
            </div>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm">{error}</div>}

            <div className="pt-8">
              <button type="submit" disabled={submitting} className="inline-flex items-center bg-[#bb9457] text-black px-10 py-5 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 animate-pulse-glow rounded-sm">
                {submitting ? (
                  <>
                    <span className="animate-spin mr-3">⏳</span>
                    Submitting…
                  </>
                ) : (
                  'Submit my application'
                )}
              </button>
              <p className="mt-6 text-neutral-500 font-light text-sm leading-relaxed">
                Submissions close July 31, 2026 at midnight PKT. We will confirm receipt of every complete application within five working days. Incomplete applications will not be reviewed. For any questions about the application process write to spotlight@adorzia.com
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default SpotlightApplication
