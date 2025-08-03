import { Redis } from '@upstash/redis'
import { Proposal, ProposalListItem, ProposalMetadata, createProposalId } from './proposal-types'

// Initialize Redis client with environment variables
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Redis keys for our application
export const REDIS_KEYS = {
  BUDGET_DATA: 'budget:data',
  BUDGET_BACKUP: 'budget:backup',
  PROPOSALS_LIST: 'proposals:list',
  PROPOSAL_PREFIX: 'proposal:',
  PROPOSAL_THUMBNAILS: 'proposals:thumbnails',
} as const

// TypeScript interfaces for budget data
interface BudgetItem {
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

interface BudgetCategory {
  id: string
  name: string
  description: string
  items: BudgetItem[]
}

interface BudgetData {
  title: string
  description: string
  categories: BudgetCategory[]
  totals: {
    direto: number
    faturamentoDireto: number
    equipe: number
    geral: number
  }
  summary: {
    totalItems: number
    totalCategories: number
    activeItems: number
    currency: string
    lastUpdated: string
  }
}

// Helper functions for budget data operations
export const redisBudgetOps = {
  // Get budget data from Redis
  async getBudgetData(): Promise<BudgetData | null> {
    try {
      const data = await redis.get(REDIS_KEYS.BUDGET_DATA)
      if (data && typeof data === 'string') {
        return JSON.parse(data) as BudgetData
      }
      return data as BudgetData | null
    } catch (error) {
      console.error('Error getting budget data from Redis:', error)
      return null
    }
  },

  // Save budget data to Redis
  async setBudgetData(data: BudgetData): Promise<boolean> {
    try {
      // Save current data
      await redis.set(REDIS_KEYS.BUDGET_DATA, JSON.stringify(data))
      
      // Create backup with timestamp
      const backup = {
        data,
        timestamp: new Date().toISOString(),
      }
      await redis.set(REDIS_KEYS.BUDGET_BACKUP, JSON.stringify(backup))
      
      return true
    } catch (error) {
      console.error('Error saving budget data to Redis:', error)
      return false
    }
  },

  // Reset budget data (for development/testing)
  async resetBudgetData(originalData: BudgetData): Promise<boolean> {
    try {
      await redis.set(REDIS_KEYS.BUDGET_DATA, JSON.stringify(originalData))
      return true
    } catch (error) {
      console.error('Error resetting budget data in Redis:', error)
      return false
    }
  },

  // Check Redis connection
  async ping() {
    try {
      const result = await redis.ping()
      return result === 'PONG'
    } catch (error) {
      console.error('Redis ping failed:', error)
      return false
    }
  }
}

// Helper functions for proposal data operations
export const redisProposalOps = {
  // Get a single proposal by ID
  async getProposal(clientSlug: string, projectSlug: string): Promise<Proposal | null> {
    try {
      const id = createProposalId(clientSlug, projectSlug)
      const key = `${REDIS_KEYS.PROPOSAL_PREFIX}${id}`
      const data = await redis.get(key)
      
      if (data && typeof data === 'string') {
        return JSON.parse(data) as Proposal
      }
      return data as Proposal | null
    } catch (error) {
      console.error('Error getting proposal from Redis:', error)
      return null
    }
  },

  // Save a proposal
  async saveProposal(proposal: Proposal): Promise<boolean> {
    try {
      const id = createProposalId(proposal.metadata.clientSlug, proposal.metadata.projectSlug)
      const key = `${REDIS_KEYS.PROPOSAL_PREFIX}${id}`
      
      // Update timestamp
      proposal.metadata.updatedAt = new Date().toISOString()
      
      // Save proposal data
      await redis.set(key, JSON.stringify(proposal))
      
      // Update proposals list metadata
      const listData = await redis.get(REDIS_KEYS.PROPOSALS_LIST) || '{}'
      const list = typeof listData === 'string' ? JSON.parse(listData) : listData
      list[id] = proposal.metadata
      await redis.set(REDIS_KEYS.PROPOSALS_LIST, JSON.stringify(list))
      
      return true
    } catch (error) {
      console.error('Error saving proposal to Redis:', error)
      return false
    }
  },

  // Delete a proposal
  async deleteProposal(clientSlug: string, projectSlug: string): Promise<boolean> {
    try {
      const id = createProposalId(clientSlug, projectSlug)
      const key = `${REDIS_KEYS.PROPOSAL_PREFIX}${id}`
      
      // Delete proposal data
      await redis.del(key)
      
      // Remove from proposals list
      const listData = await redis.get(REDIS_KEYS.PROPOSALS_LIST) || '{}'
      const list = typeof listData === 'string' ? JSON.parse(listData) : listData
      delete list[id]
      await redis.set(REDIS_KEYS.PROPOSALS_LIST, JSON.stringify(list))
      
      // Delete thumbnail if exists
      const thumbnailData = await redis.get(REDIS_KEYS.PROPOSAL_THUMBNAILS) || '{}'
      const thumbnails = typeof thumbnailData === 'string' ? JSON.parse(thumbnailData) : thumbnailData
      delete thumbnails[id]
      await redis.set(REDIS_KEYS.PROPOSAL_THUMBNAILS, JSON.stringify(thumbnails))
      
      return true
    } catch (error) {
      console.error('Error deleting proposal from Redis:', error)
      return false
    }
  },

  // Get all proposals list (metadata only)
  async getProposalsList(): Promise<ProposalListItem[]> {
    try {
      const listData = await redis.get(REDIS_KEYS.PROPOSALS_LIST) || '{}'
      const list = typeof listData === 'string' ? JSON.parse(listData) : listData
      
      return Object.values(list as Record<string, ProposalMetadata>).map((metadata) => ({
        metadata
      }))
    } catch (error) {
      console.error('Error getting proposals list from Redis:', error)
      return []
    }
  },

  // Save proposal thumbnail
  async saveProposalThumbnail(clientSlug: string, projectSlug: string, thumbnail: string): Promise<boolean> {
    try {
      const id = createProposalId(clientSlug, projectSlug)
      const thumbnailData = await redis.get(REDIS_KEYS.PROPOSAL_THUMBNAILS) || '{}'
      const thumbnails = typeof thumbnailData === 'string' ? JSON.parse(thumbnailData) : thumbnailData
      
      thumbnails[id] = thumbnail
      await redis.set(REDIS_KEYS.PROPOSAL_THUMBNAILS, JSON.stringify(thumbnails))
      
      // Also update the metadata
      const proposal = await redisProposalOps.getProposal(clientSlug, projectSlug)
      if (proposal) {
        proposal.metadata.thumbnail = thumbnail
        await redisProposalOps.saveProposal(proposal)
      }
      
      return true
    } catch (error) {
      console.error('Error saving proposal thumbnail to Redis:', error)
      return false
    }
  },

  // Get proposal thumbnail
  async getProposalThumbnail(clientSlug: string, projectSlug: string): Promise<string | null> {
    try {
      const id = createProposalId(clientSlug, projectSlug)
      const thumbnailData = await redis.get(REDIS_KEYS.PROPOSAL_THUMBNAILS) || '{}'
      const thumbnails = typeof thumbnailData === 'string' ? JSON.parse(thumbnailData) : thumbnailData
      
      return thumbnails[id] || null
    } catch (error) {
      console.error('Error getting proposal thumbnail from Redis:', error)
      return null
    }
  }
}