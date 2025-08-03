// Types for the proposal management system
export interface ProposalMetadata {
  id: string
  clientSlug: string
  projectSlug: string
  clientName: string
  projectName: string
  status: 'draft' | 'sent' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
  thumbnail?: string // Base64 or URL
  tags?: string[]
}

export interface ProposalContent {
  // Hero section
  hero: {
    title: LocalizedText
    subtitle: LocalizedText
    proposalTitle: LocalizedText
    scrollIndicator: LocalizedText
  }
  
  // Company info
  company: {
    description: LocalizedText
    clientList: LocalizedText
    phone: string
    email: string
    location: LocalizedText
  }
  
  // Executive summary
  executiveSummary: {
    title: LocalizedText
    description: LocalizedText
  }
  
  // Strategic vision
  strategicVision: {
    title: LocalizedText
    subtitle: LocalizedText
    description: LocalizedText
    points: LocalizedText[]
  }
  
  // Concept & Mechanics
  conceptMechanics: {
    title: LocalizedText
    subtitle: LocalizedText
    description: LocalizedText
    flow: LocalizedText
  }
  
  // Technical production
  technicalProduction: {
    title: LocalizedText
    subtitle: LocalizedText
    description: LocalizedText
    videoDetails: LocalizedText[]
    intervalContentTitle: LocalizedText
    intervalContentDescription: LocalizedText
    intervalContentDetails: LocalizedText[]
  }
  
  // Daily schedule
  dailySchedule: {
    title: LocalizedText
    subtitle: LocalizedText
    description: LocalizedText
    items: DailyScheduleItem[]
  }
  
  // Strategic opportunity
  opportunity: {
    title: LocalizedText
    stats: LocalizedText[]
  }
  
  // Project details
  project: {
    label: LocalizedText
    titles: LocalizedText[]
    scopeTitle: LocalizedText
    scope: LocalizedText[]
  }
  
  // Creative concept
  creative: {
    label: LocalizedText
    brandTitles: LocalizedText[]
    conceptTitle: LocalizedText
    conceptIntro: LocalizedText
    concept: LocalizedText[]
  }
  
  // Overview
  overview: {
    label: LocalizedText
    titles: LocalizedText[]
    description: LocalizedText
    features: LocalizedText[]
  }
  
  // Client info
  clientInfo: {
    clientLabel: LocalizedText
    clientName: LocalizedText
    studioLabel: LocalizedText
    studioName: LocalizedText
  }
  
  // Deliverables
  deliverables: {
    label: LocalizedText
    title: LocalizedText
    description: LocalizedText
    list: DeliverableItem[]
  }
  
  // Pricing
  pricing: {
    label: LocalizedText
    title: LocalizedText
    description: LocalizedText
    proposals: ProposalPricing[]
    investmentOptions: {
      title: LocalizedText
      options: LocalizedText[]
      complete: LocalizedText
      completePrice: LocalizedText
    }
    flexibleInvestment: {
      title: LocalizedText
      optionA: LocalizedText
      optionB: LocalizedText
      completeLabel: LocalizedText
    }
  }
  
  // Methodology
  methodology: {
    title: LocalizedText
    description: LocalizedText
    steps: LocalizedText[]
    viewTerms: LocalizedText
  }
  
  // Terms
  terms: {
    label: LocalizedText
    title: LocalizedText
    description: LocalizedText
    conditions: LocalizedText[]
  }
  
  // Contact
  contact: {
    title: LocalizedText
    company: LocalizedText
    cnpj: string
    address: LocalizedText
    addressFull: LocalizedText
    phone: string
    instagram: LocalizedText
  }
  
  // Approval
  approval: {
    title: LocalizedText
    location: LocalizedText
    client: LocalizedText
    theForceLabel: LocalizedText
    creativeDirector: LocalizedText
    acceptProposal: LocalizedText
  }
  
  // Budget data (from existing system)
  budget?: {
    title: string
    description: string
    categories: BudgetCategory[]
    totals: BudgetTotals
    summary: BudgetSummary
  }
}

// Localized text support
export interface LocalizedText {
  en: string
  pt: string
}

// Supporting types
export interface DailyScheduleItem {
  time: string
  activity: LocalizedText
  details: LocalizedText
}

export interface DeliverableItem {
  number: string
  title: LocalizedText
  description: LocalizedText
}

export interface ProposalPricing {
  label: LocalizedText
  title: LocalizedText
  subtitle?: LocalizedText
  items: LocalizedText[]
  price: LocalizedText
}

export interface BudgetCategory {
  id: string
  name: string
  description: string
  items: BudgetItem[]
}

export interface BudgetItem {
  id: string
  description: string
  detailedDescription: string
  status: boolean
  quantity: number
  days: number
  frequency: number
  unitPrice: number
  supplier: string
  invoice: string
  notes?: string
}

export interface BudgetTotals {
  direto: number
  faturamentoDireto: number
  equipe: number
  geral: number
}

export interface BudgetSummary {
  totalItems: number
  totalCategories: number
  activeItems: number
  currency: string
  lastUpdated: string
}

// Complete proposal type
export interface Proposal {
  metadata: ProposalMetadata
  content: ProposalContent
}

// List response type
export interface ProposalListItem {
  metadata: ProposalMetadata
  // We don't need all content for list view
}

// Helper function to generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
}

// Helper to create proposal ID from slugs
export function createProposalId(clientSlug: string, projectSlug: string): string {
  return `${clientSlug}:${projectSlug}`
}