import SEO from '../components/SEO'

const SpotlightTerms = () => {
  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#bb9457] selection:text-black font-sans antialiased">
      <SEO
        title="Spotlight Event Terms and Conditions - Adorzia"
        description="Adorzia Spotlight Fall 2026 Event Terms and Conditions - Govern all applications and participation in Pakistan's first national fashion talent discovery and investment event."
        canonicalURL="https://adorzia.com/legal/spotlight-terms"
        ogTitle="Spotlight Event Terms and Conditions - Adorzia"
        ogDescription="Terms and Conditions for Adorzia Spotlight Fall 2026 - Pakistan's premier fashion talent discovery and investment event."
        schemaType="WebPage"
      />

      {/* Hero Section */}
      <section className="relative bg-neutral-950 border-b border-neutral-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.05),transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">
            Legal - Spotlight Fall 2026
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.1]">
            Spotlight Event <span className="text-gradient italic font-light">Terms</span>
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
                  These Spotlight Event Terms and Conditions govern all applications to, participation in, and association with the Adorzia Spotlight Fall 2026 event - Pakistan's first national fashion talent discovery and investment event organised by Adorzia.
                </p>
                <p className="text-white font-medium">
                  By submitting an application to Adorzia Spotlight Fall 2026 you confirm that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety. If you do not agree with any part of these terms you must not submit an application or participate in the event in any capacity.
                </p>
                <p className="text-white font-medium">
                  These terms apply to all applicants regardless of whether they are shortlisted, selected as finalists, or named as winners. Submitting an application constitutes acceptance of these terms.
                </p>
                <p>
                  These Spotlight Event Terms and Conditions should be read alongside the Adorzia <a href="/legal/terms" className="text-[#bb9457] hover:underline">general Terms and Conditions</a> and <a href="/legal/privacy" className="text-[#bb9457] hover:underline">Privacy Policy</a>, both of which also apply to all applicants and participants.
                </p>
                <p className="text-white">For any questions relating to these terms please contact us at:</p>
                <div className="ml-6 space-y-1 text-sm">
                  <p>Email: <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a></p>
                </div>
              </div>
            </div>

            {/* Definitions */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Definitions
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                For the purposes of these Terms and Conditions the following definitions apply.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    term: "Adorzia",
                    definition: "The fashion entrepreneurship company operating the Spotlight event, headquartered in Pakistan and founded in 2025."
                  },
                  {
                    term: "Spotlight or the Event",
                    definition: "Adorzia Spotlight Fall 2026 - the first annual Adorzia national fashion talent discovery and investment event."
                  },
                  {
                    term: "Applicant",
                    definition: "Any individual who submits a complete application to Adorzia Spotlight Fall 2026 during the submission window."
                  },
                  {
                    term: "Shortlisted applicant",
                    definition: "Any applicant selected to proceed to the presentation stage of the selection process."
                  },
                  {
                    term: "Finalist",
                    definition: "Any applicant selected to present at the live Spotlight event following the shortlist stage."
                  },
                  {
                    term: "Winner",
                    definition: "Any finalist selected by the judging panel to receive investment and brand partnership support from Adorzia following the live event."
                  },
                  {
                    term: "Panel",
                    definition: "The judges and mentors appointed by Adorzia to evaluate applications, presentations, and finalist performances at the Spotlight event."
                  },
                  {
                    term: "Submission window",
                    definition: "The period during which applications are accepted - June 1, 2026 to July 31, 2026 at midnight Pakistan Standard Time."
                  },
                  {
                    term: "Application materials",
                    definition: "All content submitted by an applicant through the Spotlight application form including written responses, uploaded images, portfolio links, and any supplementary materials."
                  },
                  {
                    term: "Investment agreement",
                    definition: "The separate legally binding agreement negotiated and executed between Adorzia and a Spotlight winner following the event, which governs the terms of any financial investment made by Adorzia."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#bb9457] font-medium mt-0.5 flex-shrink-0">
                      {item.term}:
                    </span>
                    <p className="text-neutral-300 font-light leading-relaxed">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Eligibility
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                To be eligible to apply for Adorzia Spotlight Fall 2026 an applicant must meet all of the following criteria at the time of application.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Age:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The applicant must be eighteen years of age or older at the time of submission.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Location:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The applicant must be based in Pakistan at the time of application. Pakistani nationals temporarily residing abroad may contact <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a> to discuss their eligibility on a case by case basis.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Creative discipline:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The applicant must be working in fashion design, textile craft, heritage craft, fashion entrepreneurship, accessories design, or a creative discipline at the intersection of fashion and making.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Original work:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The applicant must be the sole or primary creator of the work submitted in their application. Collaborative work may be submitted with full disclosure of the collaborative nature and the roles of all contributors.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Honesty and good faith:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The applicant must be submitting their application honestly, in good faith, and without intent to deceive or misrepresent.
                  </p>
                </div>
              </div>

              <p className="text-white font-medium mb-4">
                The following persons are not eligible to apply.
              </p>
              <ul className="space-y-2 ml-6 mb-6">
                {[
                  "Employees, contractors, directors, or immediate family members of Adorzia or any official Spotlight sponsor or judging panel member.",
                  "Anyone who has been found to have submitted fraudulent or plagiarised work in any previous Adorzia application.",
                  "Anyone currently subject to legal proceedings that would materially affect their ability to enter into a business or investment relationship with Adorzia."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#bb9457] mt-1.5">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-neutral-300 font-light leading-relaxed">
                Adorzia reserves the right to verify eligibility at any stage of the process and to disqualify any applicant who does not meet the eligibility criteria, regardless of how far they have progressed in the selection process.
              </p>
            </div>

            {/* Application Process */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Application Process
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Submission window:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Applications must be submitted through the official Spotlight application form on the Adorzia website at adorzia.com/spotlight. The submission window opens on June 1, 2026 and closes on July 31, 2026 at midnight Pakistan Standard Time. Applications received after this deadline will not be considered under any circumstances.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Complete applications:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Only complete applications will be reviewed. An application is considered complete when all mandatory fields have been filled, at least three images of the applicant's work have been uploaded, and the declaration checkboxes have been confirmed. Adorzia will not contact applicants to request missing information from incomplete submissions.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Confirmation of receipt:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia will send an automated confirmation email to the email address provided within five working days of receiving a complete application. If you do not receive a confirmation within this period please check your spam folder before contacting us at <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a>.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">One application per applicant:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Each individual may submit only one application per Spotlight cycle. Multiple applications from the same individual will result in all submissions from that individual being disqualified.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">No amendments after submission:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Once an application has been submitted it cannot be amended. Please review your application thoroughly before submitting. If you believe you have made a significant error in your submission please contact <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a> as soon as possible. Adorzia will consider amendment requests at its discretion but is under no obligation to accept them.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Language:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Applications may be submitted in English or Urdu. Adorzia will review applications in both languages equally. If submitting in Urdu please ensure your written responses are clearly legible.
                  </p>
                </div>
              </div>
            </div>

            {/* Selection Process */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Selection Process
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                Adorzia Spotlight Fall 2026 follows a multi-stage selection process. The selection criteria, methodology, and timeline are as follows.
              </p>
              
              <div className="space-y-8">
                <div className="border-l-4 border-[#bb9457] pl-6 py-2">
                  <h3 className="text-xl text-white font-medium mb-2">Stage one - initial review:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    All complete applications received during the submission window will be reviewed by the Adorzia Spotlight selection team. Applications will be evaluated on the following criteria: creative originality and distinctiveness, quality and craft of submitted work, clarity and ambition of the applicant's vision, commercial potential and entrepreneurial thinking, and overall strength and coherence of the application.
                  </p>
                </div>

                <div className="border-l-4 border-[#bb9457] pl-6 py-2">
                  <h3 className="text-xl text-white font-medium mb-2">Stage two - shortlisting:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    A shortlist of applicants will be selected following the initial review and communicated to shortlisted applicants in August 2026. Applicants who are not shortlisted will also be notified. Adorzia will not enter into correspondence about individual shortlisting decisions.
                  </p>
                </div>

                <div className="border-l-4 border-[#bb9457] pl-6 py-2">
                  <h3 className="text-xl text-white font-medium mb-2">Stage three - shortlist presentations:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Shortlisted applicants will be invited to present their work and vision to a panel appointed by Adorzia. Presentations will take place in person at an Adorzia studio where possible or virtually for applicants from cities without an Adorzia studio presence. Presentation format and duration will be communicated to shortlisted applicants at the time of invitation. Failure to attend or participate in the presentation stage without prior notice to Adorzia will result in disqualification.
                  </p>
                </div>

                <div className="border-l-4 border-[#bb9457] pl-6 py-2">
                  <h3 className="text-xl text-white font-medium mb-2">Stage four - finalist selection:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Following shortlist presentations a group of finalists will be selected by the panel and announced publicly in September 2026. Finalist selection decisions are final.
                  </p>
                </div>

                <div className="border-l-4 border-[#bb9457] pl-6 py-2">
                  <h3 className="text-xl text-white font-medium mb-2">Stage five - the Spotlight live event:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Finalists will present their work and brand vision at the Adorzia Spotlight Fall 2026 live event. Full details of the event format, venue, and logistics will be communicated to finalists at least four weeks prior to the event date.
                  </p>
                </div>

                <div className="border-l-4 border-[#bb9457] pl-6 py-2">
                  <h3 className="text-xl text-white font-medium mb-2">Stage six - winner selection and announcement:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Winners will be selected by the judging panel at or following the live event and announced publicly. The panel's decision is final and binding. Adorzia will not enter into any correspondence disputing the outcome of any selection decision at any stage.
                  </p>
                </div>
              </div>
            </div>

            {/* Investment and Prize Terms */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Investment and Prize Terms
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 border border-[#bb9457]/30 bg-[#bb9457]/5">
                  <h3 className="text-lg text-white font-medium mb-2">No binding commitment prior to signed agreement:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The selection of a Spotlight winner does not constitute a binding financial commitment by Adorzia. Any investment made by Adorzia in a Spotlight winner is subject to a separate investment agreement negotiated in good faith and executed in writing by both parties following the event. Nothing in these Terms and Conditions, the application process, the selection process, or any verbal or written communication during the event constitutes a binding commitment to invest prior to the execution of a signed investment agreement.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Investment structure:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The investment offered to Spotlight winners is structured as a business investment in the winner's fashion brand or creative enterprise - not as a personal prize payment. The specific terms of investment including amount, equity or revenue share arrangement, milestones, and ongoing obligations will be negotiated individually with each winner and set out in the investment agreement.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Winner obligations during negotiation:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Winners are expected to engage with the investment agreement negotiation process in good faith and within a reasonable timeframe following the event. Adorzia reserves the right to withdraw an investment offer if a winner is unresponsive, negotiates in bad faith, or fails to engage within sixty days of the event.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">No guaranteed outcome:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia does not guarantee any specific commercial outcome, revenue, brand growth, or business result for any Spotlight winner as a result of the investment, mentorship, or other support provided. All support is provided in good faith with the shared goal of building a successful fashion brand.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Mentorship:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Mentorship provided to Spotlight finalists and winners is offered in good faith by industry professionals who volunteer or are appointed by Adorzia. Mentorship relationships are advisory in nature and do not create any employer-employee relationship, agency relationship, or fiduciary duty.
                  </p>
                </div>
              </div>
            </div>

            {/* Publicity and Media */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Publicity and Media
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Event photography and filming:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    The Adorzia Spotlight live event will be photographed and filmed. By attending the event as a finalist, winner, judge, mentor, or guest you consent to being photographed and filmed and to Adorzia using that photography and footage for promotional, editorial, and archival purposes related to Spotlight and the Adorzia ecosystem.
                  </p>
                  <p className="text-neutral-300 font-light leading-relaxed mt-3">
                    If you have specific concerns about being photographed or filmed please notify Adorzia in writing before the event at <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a> and we will make reasonable accommodations where possible.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Press and media:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia may invite press and media to attend the Spotlight event and to cover finalist and winner stories. Finalists and winners may be asked to participate in press interviews, editorial features, and social media content creation as part of the Spotlight promotional program. Participation in press activity beyond the event itself is voluntary and will always be discussed and agreed with the relevant finalist or winner in advance.
                  </p>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">Social media:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia will share Spotlight content across its social media channels throughout the application period, shortlisting, finalist announcement, and event. Where Adorzia tags or features individual applicants, shortlisted applicants, finalists, or winners on social media we will always notify that individual before doing so.
                  </p>
                </div>
              </div>
            </div>

            {/* Applicant Obligations */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Applicant Obligations
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                By submitting an application to Adorzia Spotlight Fall 2026 each applicant agrees to the following obligations.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Honesty and accuracy:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    All information provided in the application is truthful, accurate, and not misleading. All work submitted is the applicant's own original creative work or is disclosed as collaborative with full attribution.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Availability:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    If shortlisted, the applicant will make themselves reasonably available for the presentation stage - either in person or virtually. If selected as a finalist, the applicant will make every reasonable effort to attend the live event in person. If attendance is genuinely impossible due to circumstances outside the applicant's control, the applicant must notify Adorzia as soon as possible at <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline">spotlight@adorzia.com</a>.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Conduct:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Applicants will conduct themselves professionally and respectfully in all interactions with Adorzia, panel members, fellow applicants, event staff, guests, and any media present at the event.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Confidentiality of selection process:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Applicants must not publicly disclose the details of their shortlist presentation, panel feedback, or any other confidential aspect of the selection process prior to official announcements by Adorzia.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Compliance with these terms:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Applicants will comply with all provisions of these Terms and Conditions throughout the application process and beyond where ongoing obligations apply.
                  </p>
                </div>
              </div>
            </div>

            {/* Disqualification */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Disqualification
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                Adorzia reserves the right to disqualify any applicant or participant at any stage of the Spotlight process for any of the following reasons.
              </p>
              <ul className="space-y-2 ml-6">
                {[
                  "Submission of false, fraudulent, or plagiarised application materials.",
                  "Failure to meet eligibility criteria at any point during the process.",
                  "Breach of any provision of these Terms and Conditions.",
                  "Conduct that Adorzia reasonably considers to be harmful, disrespectful, discriminatory, or damaging to the reputation of Adorzia, the Spotlight event, other applicants, panel members, or any other party connected to the event.",
                  "Public disclosure of confidential selection process information prior to official announcements.",
                  "Failure to attend or engage with the shortlist presentation or live event without adequate notice or reasonable cause.",
                  "Any other behavior that Adorzia determines in its reasonable judgment to be incompatible with participation in the event."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#bb9457] mt-1.5">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  Disqualification decisions are made by Adorzia and are final. Adorzia will notify disqualified applicants in writing. Adorzia is not required to disclose the specific reason for a disqualification decision where doing so would breach the confidentiality of other applicants or the integrity of the selection process.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Limitation of Liability
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                Adorzia makes every reasonable effort to operate the Spotlight event professionally, fairly, and in the best interests of all applicants and participants. However to the fullest extent permitted by applicable Pakistani law Adorzia accepts no liability for the following.
              </p>
              <ul className="space-y-2 ml-6">
                {[
                  "The outcome of any selection decision at any stage of the process.",
                  "Any loss, damage, cost, or expense incurred by any applicant in preparing or submitting an application.",
                  "Any loss, damage, cost, or expense incurred by any applicant, finalist, or winner in connection with attending presentations or the live event.",
                  "Any failure to perform obligations under these terms caused by circumstances outside Adorzia's reasonable control including natural disasters, government action, civil unrest, or any other force majeure event.",
                  "Any indirect, consequential, or economic loss arising from participation in or exclusion from the Spotlight event."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#bb9457] mt-1.5">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Cancellation or Postponement */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Event Cancellation or Postponement
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                Adorzia reserves the right to cancel, postpone, or significantly alter the format of the Spotlight Fall 2026 event in response to circumstances outside its reasonable control - including but not limited to natural disasters, public health emergencies, civil unrest, government restrictions, or any other force majeure event.
              </p>
              
              <div className="space-y-6">
                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">In the event of cancellation:</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Adorzia will notify all applicants, shortlisted applicants, and finalists as soon as reasonably possible.",
                      "Where the event is cancelled Adorzia will make reasonable efforts to reschedule it at the earliest appropriate opportunity.",
                      "No compensation will be payable to applicants, shortlisted applicants, or finalists in the event of cancellation."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#bb9457] mt-1.5">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">In the event of postponement:</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "All applicants, shortlisted applicants, and finalists will be notified of the new date as soon as it is confirmed.",
                      "Selection decisions made prior to postponement will remain valid unless Adorzia determines in its reasonable judgment that a full reselection process is necessary."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#bb9457] mt-1.5">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-lg text-white font-medium mb-2">In the event of format change:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia reserves the right to move the event to a virtual format if in-person delivery becomes impossible. All other terms of participation remain in effect in a virtual format.
                  </p>
                </div>
              </div>
            </div>

            {/* Amendments */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Amendments
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                Adorzia reserves the right to amend these Terms and Conditions at any time prior to the close of the submission window on July 31, 2026. Any amendments will be published on the Spotlight page at adorzia.com/spotlight and applicants who have already submitted will be notified by email. Continued participation in the process following notification of any amendment constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Severability
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                If any provision of these Terms and Conditions is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it valid and enforceable. All remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Governing Law
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                These Spotlight Event Terms and Conditions are governed by and construed in accordance with the laws of Pakistan. Any dispute arising from or in connection with these terms or the Spotlight event shall be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-20 p-8 border border-[#bb9457]/30 bg-gradient-to-br from-[#bb9457]/10 to-transparent">
              <h3 className="font-serif text-2xl text-white font-normal tracking-tight mb-4">
                Contact
              </h3>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  For all enquiries relating to these Terms and Conditions or the Spotlight event please contact us.
                </p>
                <div className="ml-6 space-y-2 text-sm">
                  <p className="text-neutral-300">
                    Email: <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:underline font-medium">spotlight@adorzia.com</a>
                  </p>
                  <p className="text-neutral-300">
                    General enquiries: <a href="mailto:hello@adorzia.com" className="text-[#bb9457] hover:underline font-medium">hello@adorzia.com</a>
                  </p>
                  <p className="text-neutral-300">
                    Response time: Within seven working days during the submission window. Within fourteen working days outside the submission window.
                  </p>
                </div>
                <p className="text-white font-medium mt-6">
                  Adorzia - Where Visionaries Rise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpotlightTerms
