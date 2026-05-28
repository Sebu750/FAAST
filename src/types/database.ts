export interface NewsletterSubscription {
  id: string
  email: string
  created_at: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface PartnershipInquiry {
  id: string
  company_name: string
  contact_name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export interface SpotlightApplication {
  id: string
  name: string
  email: string
  brand_name: string
  portfolio_url: string
  description: string
  created_at: string
}
