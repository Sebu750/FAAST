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
  phone: string | null
  location: string
  age: string | null
  discipline: string
  years_experience: string | null
  formal_education: string | null
  institution_name: string | null
  creative_practice: string
  portfolio_url: string | null
  vision_description: string
  biggest_obstacle: string
  why_now: string
  heritage_craft: string | null
  heritage_description: string | null
  additional_info: string | null
  declaration_original_work: boolean
  declaration_pakistan_age: boolean
  declaration_presentations: boolean
  declaration_terms: boolean
  status: string
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface MarketplaceApplication {
  id: string
  brand_name: string
  founder_name: string
  email: string
  phone: string
  location: string
  website: string | null
  product_category: string
  product_description: string
  price_range: string | null
  years_in_business: string | null
  product_images: string[] | null
  instagram_handle: string | null
  unique_selling_proposition: string
  target_customer: string
  status: string
  admin_notes: string | null
  internal_comments: string | null
  created_at: string
  updated_at: string
}

export interface StudioApplication {
  id: string
  name: string
  email: string
  phone: string
  location: string
  age: number
  discipline: string
  years_experience: string
  portfolio_url: string | null
  membership_type: string
  start_date: string | null
  expected_duration: string | null
  equipment_needed: string | null
  project_description: string
  instagram_handle: string | null
  why_studio: string
  previous_studio_experience: boolean
  status: string
  admin_notes: string | null
  internal_comments: string | null
  created_at: string
  updated_at: string
}

export interface HeritageApplication {
  id: string
  artisan_name: string
  email: string
  phone: string
  location: string
  community_name: string | null
  craft_type: string
  craft_tradition: string
  years_practicing: string
  learned_from: string | null
  certification: boolean
  current_production_capacity: string | null
  products_offered: string
  previous_collaborations: string | null
  interest_in_modern_design: boolean
  willing_to_train: boolean
  portfolio_images: string[] | null
  preservation_efforts: string | null
  innovation_examples: string | null
  community_impact: string | null
  status: string
  admin_notes: string | null
  internal_comments: string | null
  created_at: string
  updated_at: string
}

export interface InvestorDeckRequest {
  id: string
  name: string
  email: string
  organization: string
  role: string
  phone: string | null
  investment_focus: string
  investment_range: string | null
  geographic_interest: string | null
  requested_documents: string[] | null
  additional_info: string | null
  how_heard: string | null
  deck_sent: boolean
  deck_sent_at: string | null
  meeting_scheduled: boolean
  meeting_date: string | null
  follow_up_status: string | null
  status: string
  admin_notes: string | null
  internal_comments: string | null
  created_at: string
  updated_at: string
}

export interface PressInquiry {
  id: string
  journalist_name: string
  email: string
  publication: string
  role: string
  phone: string | null
  article_type: string
  topic: string
  deadline: string | null
  publication_date: string | null
  interview_type: string | null
  spokesperson_requested: string | null
  images_requested: boolean
  additional_requirements: string | null
  press_kit_sent: boolean
  press_kit_sent_at: string | null
  interview_scheduled: boolean
  interview_date: string | null
  published_url: string | null
  status: string
  admin_notes: string | null
  internal_comments: string | null
  created_at: string
  updated_at: string
}

export interface StudioWaitlist {
  id: string
  name: string
  email: string
  phone: string
  preferred_city: string
  current_city: string
  discipline: string
  years_experience: string
  membership_type: string
  intended_start_date: string | null
  portfolio_url: string | null
  instagram_handle: string | null
  why_studio: string
  current_workspace: string
  status: string
  admin_notes: string | null
  created_at: string
  updated_at: string
}
