import SEO from '../components/SEO'

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#bb9457] selection:text-black font-sans antialiased">
      <SEO
        title="Terms and Conditions - Adorzia"
        description="Adorzia Terms and Conditions - Govern your use of the Adorzia website and all services. Last updated June 1, 2026."
        canonicalURL="https://adorzia.com/legal/terms"
        ogTitle="Terms and Conditions - Adorzia"
        ogDescription="Adorzia Terms and Conditions - Terms governing use of our website, studios, marketplace, and Spotlight event."
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
            Terms and <span className="text-gradient italic font-light">Conditions</span>
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
                  These Terms and Conditions govern your use of the Adorzia website located at adorzia.com and all services operated by Adorzia - including our coworking fashion studios, the Adorzia Marketplace, the Adorzia Spotlight event, and any other services we offer now or in the future.
                </p>
                <p className="text-white font-medium">
                  Please read these Terms and Conditions carefully before using our website or services. By accessing our website, submitting any application or enquiry, subscribing to our communications, or using any part of our services, you agree to be bound by these Terms and Conditions in full.
                </p>
                <p className="text-white font-medium">
                  If you do not agree with any part of these Terms and Conditions, you must not use our website or services.
                </p>
                <p>
                  Adorzia reserves the right to update these Terms and Conditions at any time. We will notify users of significant changes by updating the date at the top of this page and where appropriate by direct communication. Your continued use of our website or services following any update constitutes your acceptance of the revised terms.
                </p>
              </div>
            </div>

            {/* About Adorzia */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                About Adorzia
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  Adorzia is a fashion entrepreneurship company founded in Pakistan in 2025. We operate a fashion ecosystem comprising coworking studio spaces for fashion professionals, a curated online marketplace for Pakistani fashion designers and heritage craftspeople, and the Adorzia Spotlight annual national fashion talent discovery and investment event.
                </p>
                <p>
                  Adorzia is headquartered in Pakistan with studio operations in Lahore, Islamabad, and Karachi.
                </p>
                <p className="text-white">For any questions relating to these Terms and Conditions please contact us at:</p>
                <div className="ml-6 space-y-1 text-sm">
                  <p>Email: <a href="mailto:legal@adorzia.com" className="text-[#bb9457] hover:underline">legal@adorzia.com</a></p>
                  <p>General contact: <a href="mailto:hello@adorzia.com" className="text-[#bb9457] hover:underline">hello@adorzia.com</a></p>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Eligibility
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  By using the Adorzia website or any of our services you confirm that you are at least eighteen years of age. Our website and services are not directed at anyone under eighteen and we do not knowingly allow anyone under eighteen to register, apply, or participate in any Adorzia service.
                </p>
                <p>
                  You confirm that all information you provide to Adorzia - through any form, application, communication, or registration - is accurate, complete, and truthful. Providing false or misleading information to Adorzia is grounds for immediate termination of your application, membership, or participation in any of our services.
                </p>
              </div>
            </div>

            {/* Use of the Website */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Use of the Website
              </h2>
              
              <div className="mb-6">
                <h3 className="text-xl text-white font-medium mb-3">Permitted use:</h3>
                <p className="text-neutral-300 font-light leading-relaxed">
                  You may use the Adorzia website for lawful purposes only. You may browse, read, and interact with the website for personal and professional information gathering, to submit genuine applications and enquiries, and to engage with Adorzia content in good faith.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-white font-medium mb-3">Prohibited use:</h3>
                <p className="text-neutral-300 font-light leading-relaxed mb-4">
                  You must not use the Adorzia website or any of its content for any of the following purposes.
                </p>
                <ul className="space-y-2 ml-6">
                  {[
                    "To violate any applicable Pakistani law or regulation or any other applicable law in your jurisdiction.",
                    "To transmit or upload any content that is defamatory, offensive, obscene, threatening, or otherwise objectionable.",
                    "To impersonate any person or organization or misrepresent your identity or affiliation.",
                    "To submit false, fraudulent, or misleading applications or enquiries.",
                    "To attempt to gain unauthorized access to any part of our website, our systems, or any account that does not belong to you.",
                    "To use automated tools, bots, scrapers, or other means to extract data from our website without our written permission.",
                    "To upload or transmit malicious code, viruses, or any software designed to disrupt, damage, or interfere with our website or systems.",
                    "To reproduce, duplicate, copy, sell, or exploit any part of our website content without our express written permission.",
                    "To use our website in any way that places an unreasonable load on our infrastructure or interferes with other users' access."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#bb9457] mt-1.5">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-neutral-300 font-light leading-relaxed">
                Adorzia reserves the right to restrict or terminate access to the website for any user who violates these terms or whose behavior we reasonably believe to be harmful to Adorzia, our community, or our services.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  All content on the Adorzia website - including but not limited to text, copy, brand identity, logos, visual design, photography, illustrations, graphics, and the overall presentation and structure of the site - is the intellectual property of Adorzia and is protected by applicable copyright, trademark, and intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, publicly display, or create derivative works from any Adorzia content without our prior written consent.
                </p>
                <p>
                  The Adorzia name, logo, and all associated brand assets are trademarks of Adorzia. You may not use our trademarks without our prior written permission.
                </p>
                <p>
                  Where our website contains content contributed by third parties - including designer portfolios, product listings, or application materials - the intellectual property rights in that content remain with the original creator. Adorzia does not claim ownership of content submitted by users unless explicitly agreed otherwise in a separate written agreement.
                </p>
                <p className="text-white font-medium">
                  By submitting any content to Adorzia - through application forms, contact forms, or any other means - you grant Adorzia a non-exclusive, royalty-free, worldwide license to use, display, and reproduce that content for the purpose of reviewing your application, operating our services, and communicating about our ecosystem. This license does not allow Adorzia to sell your content or use it in ways unrelated to our services without your consent.
                </p>
              </div>
            </div>

            {/* Adorzia Studios */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Adorzia Studios - Terms of Use
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                Studio membership and access to Adorzia coworking spaces is subject to a separate Studio Membership Agreement which you will receive and must sign prior to accessing any studio. The following general terms apply to all studio users.
              </p>
              
              <div className="space-y-6">
                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Access and conduct:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Studio members and guests must behave respectfully toward all other members, guests, and Adorzia staff at all times. Adorzia studios are professional creative workspaces and must be treated accordingly. Disruptive, abusive, discriminatory, or threatening behavior will result in immediate removal from the studio and termination of membership without refund.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Equipment and facilities:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Studio equipment and facilities are to be used responsibly and for their intended purposes only. Any damage caused by misuse, negligence, or deliberate action is the financial responsibility of the member who caused it. Members must leave equipment and shared spaces in the condition in which they found them.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Personal property:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia is not responsible for the loss, theft, or damage of any personal property brought into our studios. Members are responsible for securing their own belongings.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Membership fees and cancellation:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Membership fees, payment terms, cancellation policies, and refund entitlements are set out in the Studio Membership Agreement. Adorzia reserves the right to update studio pricing with reasonable advance notice to existing members.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-[#bb9457] bg-neutral-900/30">
                  <h3 className="text-white font-medium mb-2">Termination of membership:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia reserves the right to terminate any studio membership at its discretion where a member violates these Terms and Conditions, the Studio Membership Agreement, or any other studio conduct policy. Termination decisions will be communicated in writing.
                  </p>
                </div>
              </div>
            </div>

            {/* Adorzia Marketplace */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Adorzia Marketplace - Terms of Use
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                The Adorzia Marketplace is subject to separate Marketplace Seller Terms and Marketplace Buyer Terms which apply to all selling and buying activity on the platform. The following general terms apply to all marketplace users.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">For sellers:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    All work listed on the Adorzia Marketplace must be original work created by the seller. You must not list counterfeit goods, goods that infringe the intellectual property rights of any third party, or goods that misrepresent their origin, craft tradition, or maker. Adorzia reserves the right to remove any listing that does not meet our curation standards, violates these terms, or is reported by buyers as misrepresented.
                  </p>
                </div>

                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">For buyers:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    All purchases made on the Adorzia Marketplace are subject to the terms of the individual listing and the Marketplace Buyer Terms. Adorzia acts as a platform facilitating transactions between buyers and sellers. Adorzia is not the seller of any listed product unless explicitly stated.
                  </p>
                </div>

                <div className="p-4 border border-neutral-800 bg-neutral-900/20">
                  <h3 className="text-white font-medium mb-2">Disputes:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    In the event of a dispute between a buyer and a seller, Adorzia will make reasonable efforts to facilitate a resolution. Adorzia's decision in marketplace disputes is final where both parties have agreed to our dispute resolution process.
                  </p>
                </div>
              </div>
            </div>

            {/* Adorzia Spotlight */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Adorzia Spotlight - Terms of Participation
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed mb-6">
                Participation in the Adorzia Spotlight event is subject to the separate Spotlight Event Terms and Conditions published on the Spotlight page. The following general terms apply to all applicants and participants.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-white font-medium mb-2">Applications:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    All Spotlight applications must be submitted honestly and in good faith. All work submitted must be the original creative work of the applicant. Submitting work that belongs to another person, misrepresenting your background or experience, or providing false information in your application will result in immediate disqualification and may affect your eligibility for future Adorzia opportunities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">Selection:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Adorzia's selection decisions at all stages of the Spotlight process - including shortlisting, finalist selection, and winner announcement - are final. We are not able to enter into correspondence about individual selection decisions beyond the feedback we choose to provide.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">Investment:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    Any investment made by Adorzia in Spotlight winners is subject to a separate investment agreement negotiated and signed between Adorzia and the winner following the event. Nothing in the Spotlight application process, these Terms and Conditions, or any other Adorzia communication constitutes a binding commitment to invest prior to the execution of a signed investment agreement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-white font-medium mb-2">Publicity:</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    By participating in the Adorzia Spotlight event as a finalist or winner, you grant Adorzia permission to use your name, image, creative profile, and selected portfolio images for promotional purposes related to Spotlight and the broader Adorzia ecosystem. Full publicity terms are set out in the Spotlight Event Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Applications and Enquiries */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Applications and Enquiries
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p className="text-white font-medium">
                  Submitting an application or enquiry to Adorzia - for studio membership, marketplace listing, heritage craft program participation, Spotlight, investor deck request, or any other purpose - does not create a binding contract or any obligation on the part of Adorzia to accept your application, grant your request, or enter into any agreement with you.
                </p>
                <p>
                  Adorzia reserves the right to accept or decline any application at its discretion. We are not required to provide reasons for any decision unless we choose to do so.
                </p>
                <p>
                  All application materials submitted to Adorzia are treated in accordance with our <a href="/legal/privacy" className="text-[#bb9457] hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>

            {/* Newsletter and Marketing Communications */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Newsletter and Marketing Communications
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  By subscribing to the Adorzia newsletter or opting in to marketing communications through any form on our website, you consent to receive email communications from us about our studios, marketplace, Spotlight event, and ecosystem news.
                </p>
                <p>
                  You can unsubscribe from marketing communications at any time by clicking the unsubscribe link in any email we send. Unsubscribing from marketing communications does not affect transactional communications related to any active application, membership, or service relationship.
                </p>
              </div>
            </div>

            {/* Third Party Links and Services */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Third Party Links and Services
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  Our website contains links to third party websites and we may reference third party platforms and services. These links are provided for your convenience and information only. Adorzia does not endorse, control, or accept responsibility for the content, privacy practices, or terms of any third party website or service.
                </p>
                <p className="text-white font-medium">
                  Your use of any third party website or service is entirely at your own risk and subject to the terms of that third party.
                </p>
              </div>
            </div>

            {/* Disclaimer of Warranties */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Disclaimer of Warranties
              </h2>
              <div className="p-6 border border-[#bb9457]/30 bg-[#bb9457]/5">
                <p className="text-neutral-300 font-light leading-relaxed">
                  The Adorzia website and all content on it are provided on an "as-is" and "as-available" basis without any warranties of any kind - express, implied, or statutory. Adorzia makes no warranty that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
                </p>
                <p className="text-neutral-300 font-light leading-relaxed mt-4">
                  While we make every reasonable effort to ensure the accuracy and completeness of content on our website, we do not warrant that any information on the site is accurate, complete, current, or suitable for any particular purpose. You rely on information from our website at your own risk.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  To the fullest extent permitted by applicable Pakistani law, Adorzia and its founders, directors, employees, and representatives shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services - including but not limited to loss of revenue, loss of data, loss of business opportunity, or any other financial or commercial loss.
                </p>
                <p>
                  Adorzia's total liability to you for any claim arising from your use of our website or services shall not exceed the amount you have paid to Adorzia in the twelve months preceding the event giving rise to the claim, or five thousand Pakistani rupees, whichever is greater.
                </p>
                <p className="text-white font-medium">
                  Nothing in these Terms and Conditions limits Adorzia's liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited by law.
                </p>
              </div>
            </div>

            {/* Indemnification */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Indemnification
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                You agree to indemnify, defend, and hold harmless Adorzia and its founders, directors, employees, and representatives from and against any claims, liabilities, damages, losses, costs, and expenses - including reasonable legal fees - arising from your use of our website or services, your violation of these Terms and Conditions, or your violation of any third party rights.
              </p>
            </div>

            {/* Governing Law and Jurisdiction */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Governing Law and Jurisdiction
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                These Terms and Conditions are governed by and construed in accordance with the laws of Pakistan. Any dispute arising from or in connection with these Terms and Conditions or your use of the Adorzia website or services shall be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Severability
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                If any provision of these Terms and Conditions is found by a court of competent jurisdiction to be invalid, unlawful, or unenforceable, that provision shall be modified to the minimum extent necessary to make it valid and enforceable. All remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* Entire Agreement */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-6">
                Entire Agreement
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed">
                These Terms and Conditions, together with our Privacy Policy, Cookie Policy, and any other policies or agreements applicable to specific services you use, constitute the entire agreement between you and Adorzia regarding your use of our website and services. They supersede all prior agreements, representations, and understandings between you and Adorzia on these matters.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-20 p-8 border border-[#bb9457]/30 bg-gradient-to-br from-[#bb9457]/10 to-transparent">
              <h3 className="font-serif text-2xl text-white font-normal tracking-tight mb-4">
                Contact Us
              </h3>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  If you have any questions about these Terms and Conditions please contact us.
                </p>
                <div className="ml-6 space-y-2 text-sm">
                  <p className="text-neutral-300">
                    Email: <a href="mailto:legal@adorzia.com" className="text-[#bb9457] hover:underline font-medium">legal@adorzia.com</a>
                  </p>
                  <p className="text-neutral-300">
                    General enquiries: <a href="mailto:hello@adorzia.com" className="text-[#bb9457] hover:underline font-medium">hello@adorzia.com</a>
                  </p>
                  <p className="text-neutral-300">
                    Response time: Within fourteen working days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Terms
