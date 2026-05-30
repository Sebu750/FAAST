import SEO from '../components/SEO'

const Legal = () => {
  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#bb9457] selection:text-black font-sans antialiased">
      <SEO
        title="Privacy Policy - Adorzia"
        description="Adorzia Privacy Policy - Learn how we collect, use, and protect your personal information. Last updated June 1, 2026."
        canonicalURL="https://adorzia.com/legal/privacy"
        ogTitle="Privacy Policy - Adorzia"
        ogDescription="Adorzia Privacy Policy - Your privacy rights and our data protection practices."
        schemaType="WebPage"
      />

      {/* Hero Section */}
      <section className="relative bg-neutral-950 border-b border-neutral-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.05),transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">
            Legal
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.1]">
            Privacy <span className="text-gradient italic font-light">Policy</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-400 font-mono">
            <span>Last updated: June 1, 2026</span>
            <span className="text-neutral-700">|</span>
            <span>Effective date: June 1, 2026</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-neutral-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Introduction
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  Adorzia (referred to as "Adorzia", "we", "us", or "our") is a fashion entrepreneurship ecosystem based in Pakistan, operating the Adorzia website, coworking studios, marketplace, and Spotlight event. We are committed to protecting the privacy of every person who interacts with us - whether you are a creative applying for studio membership, a designer listing on our marketplace, an investor making an enquiry, or a visitor simply exploring what we are building.
                </p>
                <p>
                  This Privacy Policy explains what personal information we collect, how we use it, who we share it with, and what rights you have over it. Please read it carefully. By using the Adorzia website or any of our services, you agree to the practices described in this policy.
                </p>
                <p className="text-white font-medium">
                  If you do not agree with this policy, please do not use our website or services.
                </p>
              </div>
            </div>

            {/* Who We Are */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  Adorzia is a fashion entrepreneurship company founded in Pakistan in 2025. We operate the following services:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#bb9457] mt-1.5">-</span>
                    <span>The Adorzia website at adorzia.com</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#bb9457] mt-1.5">-</span>
                    <span>Adorzia coworking fashion studios in Lahore, Islamabad, and Karachi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#bb9457] mt-1.5">-</span>
                    <span>The Adorzia Marketplace - a curated online platform for Pakistani fashion designers and heritage craftspeople</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#bb9457] mt-1.5">-</span>
                    <span>Adorzia Spotlight - our annual national fashion talent discovery and investment event</span>
                  </li>
                </ul>
                <p className="text-white">For any privacy related questions or concerns you can contact us at:</p>
                <div className="ml-6 space-y-1 text-sm">
                  <p>Email: <a href="mailto:privacy@adorzia.com" className="text-[#bb9457] hover:underline">privacy@adorzia.com</a></p>
                  <p>General contact: <a href="mailto:hello@adorzia.com" className="text-[#bb9457] hover:underline">hello@adorzia.com</a></p>
                </div>
              </div>
            </div>

            {/* What Information We Collect */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                What Information We Collect
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                We collect personal information in the following ways.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl text-white font-medium mb-4">Information you give us directly:</h3>
                <p className="text-neutral-300 font-light leading-relaxed mb-4">
                  When you fill in any form on our website - including contact forms, newsletter signups, studio membership applications, marketplace seller applications, heritage craft program applications, Spotlight event applications, investor deck requests, and buyer early access signups - you provide us with personal information. Depending on the form, this may include your full name, email address, phone number, city and province, age, professional background and discipline, creative portfolio and uploaded images, links to websites and social media profiles, written statements about your work and vision, and information about your business or organization.
                </p>
                <p className="text-neutral-300 font-light leading-relaxed">
                  When you communicate with us directly - by email, through our contact form, or through social media - we retain the contents of that communication and your contact details.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl text-white font-medium mb-4">Information we collect automatically:</h3>
                <p className="text-neutral-300 font-light leading-relaxed">
                  When you visit the Adorzia website we automatically collect certain technical information including your IP address, browser type and version, operating system, referring website, pages visited on our site, time and date of your visit, and time spent on each page. This information is collected through cookies and similar tracking technologies. Please see our Cookie Policy for full details.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-white font-medium mb-4">Information from third parties:</h3>
                <p className="text-neutral-300 font-light leading-relaxed">
                  We may receive information about you from third party platforms - for example if you follow or interact with Adorzia on Instagram, LinkedIn, TikTok, or Facebook, or if you access our website through a link shared on those platforms. We do not purchase personal data from third party data brokers.
                </p>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                How We Use Your Information
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                We use the personal information we collect for the following purposes.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-white font-medium mb-2">To process your applications and enquiries:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    When you apply for studio membership, apply to list on the marketplace, apply to the heritage craft program, submit for Spotlight, or make an investor or press enquiry - we use your information to review your application, communicate with you about its status, and manage the relationship that follows.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">To deliver our services:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    If you become a studio member, a marketplace seller, a Spotlight participant, or any other active participant in the Adorzia ecosystem, we use your information to manage that relationship - including sending you relevant communications, processing any transactions, and maintaining accurate records.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">To send you updates and communications:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    If you have subscribed to our newsletter or opted in to mailing list communications, we use your email address to send you updates about Adorzia - including studio news, marketplace launches, Spotlight announcements, and ecosystem developments. You can unsubscribe at any time using the link in any email we send.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">To improve our website and services:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We use automatically collected technical data to understand how people use our website, identify areas for improvement, and ensure the site functions correctly across different devices and browsers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">To comply with legal obligations:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We retain and use certain information as required by applicable Pakistani law and any other legal obligations that apply to our operations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">To protect our legitimate interests:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We may use your information to protect Adorzia and its users against fraud, abuse, and other harmful activity - and to enforce our terms and conditions where necessary.
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Basis for Processing */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Legal Basis for Processing
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                We process your personal information on the following legal bases.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Consent:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Where you have given us clear consent to process your information for a specific purpose - such as subscribing to our newsletter or opting in to marketing communications.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Contract:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Where processing is necessary to fulfill a contractual relationship with you - such as managing your studio membership, marketplace seller account, or Spotlight participation.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Legitimate interests:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Where we have a legitimate business interest in processing your information that does not override your rights - such as improving our services, communicating relevant updates, and protecting our platform.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Legal obligation:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Where we are required by law to process or retain your information.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Share Your Information */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                How We Share Your Information
              </h2>
              <div className="space-y-4 mb-6">
                <p className="text-neutral-300 font-light leading-relaxed">
                  We do not sell your personal information to anyone. We do not share your personal information with third parties for their own marketing purposes.
                </p>
                <p className="text-white font-medium">
                  We may share your information in the following limited circumstances.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-white font-medium mb-2">With our service providers:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We work with trusted third party companies who help us operate our website and services - including web hosting providers, email delivery platforms, analytics tools, and payment processors. These companies only have access to the personal information they need to perform their specific function and are contractually required to keep it secure and confidential.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">With our team:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Your application and enquiry information is accessible to relevant members of the Adorzia internal team - specifically those responsible for reviewing applications, managing communications, and operating the relevant service you have applied for or enquired about.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">With Spotlight judges and mentors:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    If you apply for Adorzia Spotlight and are shortlisted, relevant elements of your application - your creative profile, portfolio, and written statements - will be shared with our panel of judges and mentors for the purpose of evaluation. You will be informed when this sharing occurs.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">With investors - only with your consent:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    If you are a Spotlight finalist or winner and we wish to introduce your profile to external investors as part of the co-investment framework, we will always seek your explicit consent before sharing your information with any external investor.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">With legal authorities:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We may disclose your information if required to do so by Pakistani law, court order, or government authority, or if we believe disclosure is necessary to protect the rights, safety, or property of Adorzia, our users, or the public.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">In the event of a business transfer:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    If Adorzia is acquired, merged with another company, or undergoes a significant business change, your personal information may be transferred as part of that transaction. We will notify you of any such change and the privacy implications.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Data Retention
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                We retain your personal information for as long as is necessary for the purposes described in this policy.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">Application data:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We retain all application data - for Spotlight, marketplace, studio membership, and heritage craft program - for a minimum of two years from the date of submission, regardless of the outcome of the application. This allows us to consider applicants for future cycles and to maintain accurate records.
                  </p>
                </div>

                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">Contact and enquiry data:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We retain contact form submissions and email communications for two years from the date of last communication.
                  </p>
                </div>

                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">Newsletter subscriber data:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We retain subscriber information for as long as you remain subscribed. If you unsubscribe, we retain a record of your unsubscribe request to ensure we do not contact you again.
                  </p>
                </div>

                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">Financial and transaction data:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    We retain financial records as required by Pakistani tax and accounting law - typically a minimum of five years.
                  </p>
                </div>

                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">Technical and analytics data:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Automatically collected website usage data is retained for a maximum of twenty-six months.
                  </p>
                </div>
              </div>

              <p className="text-neutral-300 font-light leading-relaxed mt-6">
                When data is no longer required we delete it securely or anonymize it so it can no longer be linked to you.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Your Rights
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                You have the following rights over your personal information held by Adorzia.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "The right to access",
                    description: "You can request a copy of the personal information we hold about you at any time."
                  },
                  {
                    title: "The right to correction",
                    description: "If any information we hold about you is inaccurate or incomplete, you have the right to ask us to correct it."
                  },
                  {
                    title: "The right to deletion",
                    description: "You can ask us to delete your personal information. We will honor this request where we are not legally required to retain the data and where no overriding legitimate interest applies."
                  },
                  {
                    title: "The right to withdraw consent",
                    description: "Where we are processing your information based on your consent - such as newsletter subscriptions - you can withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing before the withdrawal."
                  },
                  {
                    title: "The right to object",
                    description: "You can object to our processing of your personal information where it is based on legitimate interests."
                  },
                  {
                    title: "The right to data portability",
                    description: "You can request a copy of your personal information in a structured, commonly used, machine-readable format."
                  }
                ].map((right, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#bb9457] mt-1 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-white font-medium mb-1">{right.title}:</h3>
                      <p className="text-neutral-300 font-light leading-relaxed">{right.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 border border-[#bb9457]/30 bg-[#bb9457]/5">
                <p className="text-neutral-300 font-light leading-relaxed">
                  To exercise any of these rights please write to us at <a href="mailto:privacy@adorzia.com" className="text-[#bb9457] hover:underline font-medium">privacy@adorzia.com</a>. We will respond within fourteen working days. We will not charge you for exercising your rights. We may ask you to verify your identity before processing your request.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Data Security
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  We take reasonable and appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, alteration, disclosure, or destruction. These measures include secure servers, encrypted data transmission, access controls limiting who within our team can view your information, and regular security reviews.
                </p>
                <p className="text-white font-medium">
                  However no method of internet transmission or electronic storage is completely secure. While we do everything we reasonably can to protect your personal information, we cannot guarantee absolute security. If you believe your personal information has been compromised please contact us immediately at <a href="mailto:privacy@adorzia.com" className="text-[#bb9457] hover:underline">privacy@adorzia.com</a>.
                </p>
              </div>
            </div>

            {/* International Transfers */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                International Transfers
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  Adorzia is based in Pakistan. If you are accessing our website or services from outside Pakistan, your information will be transferred to and processed in Pakistan. We take appropriate steps to ensure that any such transfer is conducted in accordance with applicable privacy laws and that your information remains protected.
                </p>
                <p>
                  Some of our third party service providers may process your data in other countries. We ensure that any such transfers are protected by appropriate contractual safeguards.
                </p>
              </div>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our services, legal obligations, or the way we handle personal information. When we make significant changes we will notify you by updating the date at the top of this policy and, where appropriate, by sending a notification to the email address associated with your account or subscription.
                </p>
                <p>
                  We encourage you to review this policy periodically. Your continued use of the Adorzia website and services after any changes constitutes your acceptance of the updated policy.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Cookies
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                We use cookies and similar tracking technologies on the Adorzia website. Please refer to our separate Cookie Policy for full details of the cookies we use, why we use them, and how you can manage your cookie preferences.
              </p>
            </div>

            {/* Third Party Links */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Third Party Links
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                Our website may contain links to third party websites - including social media platforms, press coverage, partner organizations, and other external resources. This Privacy Policy applies only to the Adorzia website and services. We are not responsible for the privacy practices of any third party website and encourage you to read the privacy policy of any site you visit.
              </p>
            </div>

            {/* Children */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Children
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                The Adorzia website and services are not directed at anyone under the age of eighteen. We do not knowingly collect personal information from anyone under eighteen. If you believe a minor has provided us with personal information please contact us at <a href="mailto:privacy@adorzia.com" className="text-[#bb9457] hover:underline">privacy@adorzia.com</a> and we will delete it promptly.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-20 p-8 border border-[#bb9457]/30 bg-gradient-to-br from-[#bb9457]/10 to-transparent">
              <h3 className="font-serif text-2xl text-white font-normal tracking-tight mb-4">
                Contact Us
              </h3>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  If you have any questions, concerns, or complaints about this Privacy Policy or the way we handle your personal information, please contact us.
                </p>
                <div className="ml-6 space-y-2 text-sm">
                  <p className="text-neutral-300">
                    Email: <a href="mailto:privacy@adorzia.com" className="text-[#bb9457] hover:underline font-medium">privacy@adorzia.com</a>
                  </p>
                  <p className="text-neutral-300">
                    General enquiries: <a href="mailto:hello@adorzia.com" className="text-[#bb9457] hover:underline font-medium">hello@adorzia.com</a>
                  </p>
                  <p className="text-neutral-300">
                    Response time: Within fourteen working days
                  </p>
                </div>
                <p className="text-white font-medium">
                  If you are not satisfied with our response you have the right to escalate your concern to the relevant data protection authority in Pakistan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Legal
