import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import heroRunway from '../assets/hero-runway.jpg'

const SpotlightApplication = () => {
  const [currentStep, setCurrentStep] = useState(1)
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
  const [draftSaved, setDraftSaved] = useState(false)
  const [hasDraft, setHasDraft] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const totalSteps = 5
  
  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('spotlight_application_draft')
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        setFormData(parsed.formData)
        setCurrentStep(parsed.currentStep || 1)
        setHasDraft(true)
      } catch (e) {
        console.error('Failed to load draft:', e)
      }
    }
  }, [])
  
  // Auto-save on form changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.name || formData.email || formData.creative_practice) {
        saveDraft()
      }
    }, 2000) // Auto-save 2 seconds after last change
    
    return () => clearTimeout(timeoutId)
  }, [formData])
  
  const saveDraft = () => {
    try {
      localStorage.setItem('spotlight_application_draft', JSON.stringify({
        formData,
        currentStep,
        savedAt: new Date().toISOString()
      }))
      setDraftSaved(true)
      setHasDraft(true)
      setTimeout(() => setDraftSaved(false), 3000)
    } catch (e) {
      console.error('Failed to save draft:', e)
    }
  }
  
  const clearDraft = () => {
    localStorage.removeItem('spotlight_application_draft')
    setHasDraft(false)
  }
  
  // Validation functions for each step
  const validateStep = (step: number): string[] => {
    const errors: string[] = []
    
    switch(step) {
      case 1: // Personal Information
        if (!formData.name.trim()) errors.push('Full name is required')
        if (!formData.location.trim()) errors.push('City and province is required')
        if (!formData.email.trim()) errors.push('Email address is required')
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('Valid email address is required')
        if (!formData.phone.trim()) errors.push('Phone number is required')
        if (!formData.age || parseInt(formData.age) < 18) errors.push('You must be 18 years or older')
        if (!formData.hear_about) errors.push('Please select how you heard about Spotlight')
        break
        
      case 2: // Creative Background
        if (!formData.discipline) errors.push('Please select your discipline')
        if (!formData.years_experience) errors.push('Please select your years of experience')
        if (!formData.formal_education) errors.push('Please select your education status')
        if (!formData.creative_practice.trim()) errors.push('Creative practice description is required')
        else if (formData.creative_practice.trim().split(/\s+/).length < 100) errors.push('Creative practice must be at least 100 words')
        break
        
      case 3: // Vision & Business
        if (!formData.vision_description.trim()) errors.push('Vision description is required')
        else if (formData.vision_description.trim().split(/\s+/).length < 150) errors.push('Vision description must be at least 150 words')
        if (!formData.biggest_obstacle.trim()) errors.push('Biggest obstacle description is required')
        if (!formData.why_now.trim()) errors.push('Why now explanation is required')
        break
        
      case 4: // Heritage & Additional
        if (!formData.heritage_craft) errors.push('Please select if your work draws from heritage craft')
        break
        
      case 5: // Declarations
        if (!formData.declaration_original_work) errors.push('You must confirm original work')
        if (!formData.declaration_pakistan_age) errors.push('You must confirm Pakistan residency and age')
        if (!formData.declaration_presentations) errors.push('You must agree to participate in presentations')
        if (!formData.declaration_terms) errors.push('You must agree to terms and conditions')
        break
    }
    
    return errors
  }
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Validate current step before proceeding
      const errors = validateStep(currentStep)
      if (errors.length > 0) {
        setValidationErrors(errors)
        window.scrollTo(0, 0)
        return
      }
      
      // Clear errors and proceed
      setValidationErrors([])
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }
  
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
      
      // Generate reference number
      const refNum = `SP-2026-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`
      setReferenceNumber(refNum)
      
      setSubmitted(true)
      window.scrollTo(0, 0)
      // Clear draft after successful submission
      clearDraft()
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-neutral-950">
        <div className="max-w-2xl mx-auto px-6">
          {/* Success Icon */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#bb9457]/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-4 tracking-tight">Application Received</h1>
            <p className="text-neutral-400 text-lg font-light">Thank you for applying to Adorzia Spotlight Fall 2026.</p>
          </div>

          {/* Details Card */}
          <div className="p-8 md:p-10 bg-neutral-900/50 border border-neutral-800 rounded-lg space-y-6 mb-8">
            {/* Reference Number */}
            <div className="text-center pb-6 border-b border-neutral-800">
              <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono mb-2">Reference Number</div>
              <div className="font-mono text-3xl md:text-4xl text-[#bb9457] font-bold tracking-wider">{referenceNumber}</div>
              <p className="text-xs text-neutral-500 mt-2">Please save this for your records</p>
            </div>

            {/* Review Timeline */}
            <div className="flex items-start gap-4 p-4 bg-[#bb9457]/5 border border-[#bb9457]/20 rounded-sm">
              <svg className="w-6 h-6 text-[#bb9457] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-white font-medium text-sm mb-1">Expected Review Timeline</div>
                <p className="text-neutral-400 font-light text-sm">Applications are reviewed between <span className="text-[#bb9457] font-medium">August 2026</span>. Shortlisted candidates will be contacted directly.</p>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="pt-6 border-t border-neutral-800">
              <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono mb-4">What happens next</div>
              <div className="space-y-3">
                {[
                  'Receipt confirmed within 5 working days',
                  'Full review by our selection panel in August 2026',
                  'Shortlist announcements via email',
                  'Finalist presentations in September 2026',
                  'Spotlight Event in Fall 2026'
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#bb9457] font-mono text-xs flex-shrink-0 mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-neutral-300 font-light text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-all duration-300">
              Submit Another Application
            </button>
            <a href="mailto:spotlight@adorzia.com" className="px-8 py-4 border border-neutral-700 text-white font-medium text-sm rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 text-center">
              Contact Us
            </a>
          </div>

          <p className="text-center text-neutral-600 font-light text-xs mt-8">
            Questions? Write to <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a>
          </p>
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-[#bb9457]/30 bg-black/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Spotlight Fall 2026 - Application</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight">
              This is your application. <span className="text-[#bb9457] italic font-light">Take your time with it.</span>
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              We read every submission carefully. Be honest, be specific, and show us what makes your creative vision worth investing in.
            </p>
          </div>

          {/* Application Timeline */}
          <div className="mb-12 p-8 bg-neutral-900/50 border border-neutral-800 rounded-lg">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono mb-6 text-center">Application Timeline</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-serif text-[#bb9457] font-normal mb-2">June 1</div>
                <div className="text-xs text-neutral-400 font-light uppercase tracking-wider">Applications Open</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-serif text-[#bb9457] font-normal mb-2">July 31</div>
                <div className="text-xs text-neutral-400 font-light uppercase tracking-wider">Applications Close</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-serif text-[#bb9457] font-normal mb-2">August</div>
                <div className="text-xs text-neutral-400 font-light uppercase tracking-wider">Shortlist</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-serif text-[#bb9457] font-normal mb-2">September</div>
                <div className="text-xs text-neutral-400 font-light uppercase tracking-wider">Finalists</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
              <p className="text-xs text-neutral-500 font-light">Spotlight Event • Fall 2026</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs text-neutral-400 font-light">
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Creative Background'}
                {currentStep === 3 && 'Vision & Business'}
                {currentStep === 4 && 'Heritage & Additional'}
                {currentStep === 5 && 'Review & Submit'}
              </span>
            </div>
            {/* Progress Track */}
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#bb9457] to-[#d4af37] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step === currentStep 
                      ? 'bg-[#bb9457] text-black scale-110' 
                      : step < currentStep 
                        ? 'bg-[#bb9457]/30 text-[#bb9457]' 
                        : 'bg-neutral-800 text-neutral-600'
                  }`}>
                    {step < currentStep ? '✓' : step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Draft / Continue Later */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm">
            <div className="flex items-center gap-3">
              {hasDraft && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-neutral-400 font-light">Draft saved</span>
                </div>
              )}
              {!hasDraft && (
                <span className="text-xs text-neutral-500 font-light">Your progress will be saved automatically</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {draftSaved && (
                <span className="text-xs text-[#bb9457] font-medium animate-pulse">✓ Draft saved successfully</span>
              )}
              <button 
                type="button" 
                onClick={saveDraft} 
                className="px-4 py-2 bg-neutral-800 border border-neutral-700 text-white text-xs font-medium uppercase tracking-wider rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Draft
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-8 md:p-12 lg:p-16 border border-neutral-800/50 rounded-lg bg-neutral-900/20 backdrop-blur-sm">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-8">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-red-400 font-medium text-sm mb-2">Please complete the following:</div>
                        <ul className="space-y-1">
                          {validationErrors.map((error, idx) => (
                            <li key={idx} className="text-red-300 text-sm font-light flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Section Header */}
                <div className="mb-12 pb-8 border-b border-neutral-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-4xl text-[#bb9457]/30 font-bold">01</span>
                    <div className="w-12 h-px bg-[#bb9457]/50" />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-2">Personal Information</h3>
                  <p className="text-neutral-400 font-light text-sm">Let's start with the basics about you.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Full name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">City and province *</label>
                    <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="Lahore, Punjab" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Email address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Phone number *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="+92 xxx xxxxxxx" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Age - must be eighteen or older *</label>
                    <input type="number" required min="18" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="25" />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">How did you hear about Spotlight? *</label>
                    <select required value={formData.hear_about} onChange={(e) => setFormData({ ...formData, hear_about: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
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

                <div className="flex justify-between items-center pt-10 border-t border-neutral-800/50 mt-12">
                  <div></div>
                  <button type="button" onClick={nextStep} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 flex items-center gap-3 group">
                    Next Step
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Creative Background */}
            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-red-400 font-medium text-sm mb-2">Please complete the following:</div>
                        <ul className="space-y-1">
                          {validationErrors.map((error, idx) => (
                            <li key={idx} className="text-red-300 text-sm font-light flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Section Header */}
                <div className="mb-12 pb-8 border-b border-neutral-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-4xl text-[#bb9457]/30 font-bold">02</span>
                    <div className="w-12 h-px bg-[#bb9457]/50" />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-2">Creative Practice</h3>
                  <p className="text-neutral-400 font-light text-sm">Tell us about your creative journey and experience.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Discipline *</label>
                    <select required value={formData.discipline} onChange={(e) => setFormData({ ...formData, discipline: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
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
                    <label className="text-sm text-neutral-300 font-light block mb-2">Years working in your discipline *</label>
                    <select required value={formData.years_experience} onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                      <option value="" className="bg-neutral-950">Select duration</option>
                      <option value="<1" className="bg-neutral-950">Less than 1 year</option>
                      <option value="1-3" className="bg-neutral-950">1 to 3 years</option>
                      <option value="3-5" className="bg-neutral-950">3 to 5 years</option>
                      <option value="5+" className="bg-neutral-950">5 or more years</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Formal education in fashion or design? *</label>
                    <select required value={formData.formal_education} onChange={(e) => setFormData({ ...formData, formal_education: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                      <option value="" className="bg-neutral-950">Select an option</option>
                      <option value="yes" className="bg-neutral-950">Yes</option>
                      <option value="no" className="bg-neutral-950">No</option>
                      <option value="studying" className="bg-neutral-950">Currently studying</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Institution name (optional)</label>
                    <input type="text" value={formData.institution_name} onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="Institution name" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-neutral-300 font-light block mb-2">
                    Describe your creative practice. What do you make, how do you make it, and what makes it distinctly yours? *
                    <span className="block text-xs text-neutral-500 mt-1">Minimum 100 words</span>
                  </label>
                  <textarea required rows={6} value={formData.creative_practice} onChange={(e) => setFormData({ ...formData, creative_practice: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe your creative practice..." />
                </div>

                <div>
                  <label className="text-sm text-neutral-300 font-light block mb-2">Portfolio, website, or social media link</label>
                  <input type="url" value={formData.portfolio_url} onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" placeholder="https://your-portfolio.com" />
                </div>

                <div className="flex justify-between items-center pt-10 border-t border-neutral-800/50 mt-12">
                  <button type="button" onClick={prevStep} className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 flex items-center gap-3 group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous
                  </button>
                  <button type="button" onClick={nextStep} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 flex items-center gap-3 group">
                    Next Step
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Vision & Business */}
            {currentStep === 3 && (
              <div className="space-y-8">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-red-400 font-medium text-sm mb-2">Please complete the following:</div>
                        <ul className="space-y-1">
                          {validationErrors.map((error, idx) => (
                            <li key={idx} className="text-red-300 text-sm font-light flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Section Header */}
                <div className="mb-12 pb-8 border-b border-neutral-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-4xl text-[#bb9457]/30 font-bold">03</span>
                    <div className="w-12 h-px bg-[#bb9457]/50" />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-2">Your Vision</h3>
                  <p className="text-neutral-400 font-light text-sm">Help us understand your vision and business potential.</p>
                </div>

                <div>
                  <label className="text-sm text-neutral-300 font-light block mb-2">
                    If Adorzia invested in you, what would you build? Describe the brand, product, customer, and future you are working toward. *
                    <span className="block text-xs text-neutral-500 mt-1">Minimum 150 words</span>
                  </label>
                  <textarea required rows={8} value={formData.vision_description} onChange={(e) => setFormData({ ...formData, vision_description: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe what you would build..." />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">What is the single biggest obstacle between where you are now and where you want to be? *</label>
                    <textarea required rows={5} value={formData.biggest_obstacle} onChange={(e) => setFormData({ ...formData, biggest_obstacle: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe your biggest obstacle..." />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">Why is now the right moment for what you are building? *</label>
                    <textarea required rows={5} value={formData.why_now} onChange={(e) => setFormData({ ...formData, why_now: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Explain why now is the right moment..." />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-10 border-t border-neutral-800/50 mt-12">
                  <button type="button" onClick={prevStep} className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 flex items-center gap-3 group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous
                  </button>
                  <button type="button" onClick={nextStep} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 flex items-center gap-3 group">
                    Next Step
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Heritage & Additional */}
            {currentStep === 4 && (
              <div className="space-y-8">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-red-400 font-medium text-sm mb-2">Please complete the following:</div>
                        <ul className="space-y-1">
                          {validationErrors.map((error, idx) => (
                            <li key={idx} className="text-red-300 text-sm font-light flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Section Header */}
                <div className="mb-12 pb-8 border-b border-neutral-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-4xl text-[#bb9457]/30 font-bold">04</span>
                    <div className="w-12 h-px bg-[#bb9457]/50" />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-2">Heritage & Craft</h3>
                  <p className="text-neutral-400 font-light text-sm">Tell us about your heritage connection and share anything else.</p>
                </div>

                <div>
                  <label className="text-sm text-neutral-300 font-light block mb-2">Does your work draw from a specific Pakistani craft tradition or cultural heritage? *</label>
                  <select value={formData.heritage_craft} onChange={(e) => setFormData({ ...formData, heritage_craft: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors cursor-pointer">
                    <option value="" className="bg-neutral-950">Select an option</option>
                    <option value="yes" className="bg-neutral-950">Yes</option>
                    <option value="no" className="bg-neutral-950">No</option>
                  </select>
                </div>

                {formData.heritage_craft === 'yes' && (
                  <div>
                    <label className="text-sm text-neutral-300 font-light block mb-2">
                      Describe the tradition, how it informs your work, and how you are evolving or preserving it
                    </label>
                    <textarea rows={6} value={formData.heritage_description} onChange={(e) => setFormData({ ...formData, heritage_description: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Describe the craft tradition..." />
                  </div>
                )}

                <div>
                  <label className="text-sm text-neutral-300 font-light block mb-2">
                    Is there anything about your background, circumstances, or creative journey you want us to know? (Optional)
                  </label>
                  <textarea rows={5} value={formData.additional_info} onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })} className="w-full border-b border-neutral-700/50 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" placeholder="Share anything else you want us to know..." />
                </div>

                <div className="flex justify-between items-center pt-10 border-t border-neutral-800/50 mt-12">
                  <button type="button" onClick={prevStep} className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 flex items-center gap-3 group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous
                  </button>
                  <button type="button" onClick={nextStep} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 flex items-center gap-3 group">
                    Review & Submit
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-8">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-red-400 font-medium text-sm mb-2">Please complete the following:</div>
                        <ul className="space-y-1">
                          {validationErrors.map((error, idx) => (
                            <li key={idx} className="text-red-300 text-sm font-light flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Section Header */}
                <div className="mb-12 pb-8 border-b border-neutral-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-4xl text-[#bb9457]/30 font-bold">05</span>
                    <div className="w-12 h-px bg-[#bb9457]/50" />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-2">Declarations</h3>
                  <p className="text-neutral-400 font-light text-sm">Review your information and confirm your declarations.</p>
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

                <div className="flex justify-between items-center pt-10 border-t border-neutral-800/50 mt-12">
                  <button type="button" onClick={prevStep} className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 flex items-center gap-3 group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous
                  </button>
                  <button type="submit" disabled={submitting} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center gap-3 group">
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
                        Submit Application
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-neutral-600 font-light text-xs text-center leading-relaxed">
                  Submissions close July 31, 2026 at midnight PKT. We will confirm receipt within five working days.
                  For questions write to <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a>
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}

export default SpotlightApplication
