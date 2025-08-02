"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface TabItem {
  id: string
  title: string
  content: React.ReactNode
  expandable?: boolean
}

interface TabSystemProps {
  tabs: TabItem[]
  defaultTab?: string
  className?: string
}

export function TabSystem({ tabs, defaultTab, className = "" }: TabSystemProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div className={`tab-container ${className}`}>
      {/* Tab Headers */}
      <div className="tab-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.expandable && (
              <span className="mr-2">
                {expandedItems.includes(tab.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </span>
            )}
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTabData?.expandable ? (
          <div>
            <div 
              className="cursor-pointer flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              onClick={() => toggleExpanded(activeTab)}
            >
              <h3 className="text-lg font-medium text-white">{activeTabData.title}</h3>
              {expandedItems.includes(activeTab) ? (
                <ChevronDown className="w-5 h-5 text-white/60" />
              ) : (
                <ChevronRight className="w-5 h-5 text-white/60" />
              )}
            </div>
            <div className={`expandable-content ${expandedItems.includes(activeTab) ? 'expanded' : ''}`}>
              <div className="p-4 pt-0">
                {activeTabData.content}
              </div>
            </div>
          </div>
        ) : (
          activeTabData?.content
        )}
      </div>
    </div>
  )
}

// Componente específico para descrições de itens
interface ItemDescriptionTabsProps {
  items: Array<{
    id: string
    title: string
    description: string
    details?: string
    specifications?: string[]
  }>
  className?: string
}

export function ItemDescriptionTabs({ items, className = "" }: ItemDescriptionTabsProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className={`glass-blur ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Descrições Detalhadas</h3>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="glass-blur-subtle">
              <div 
                className="cursor-pointer p-4 hover:bg-white/5 transition-colors flex items-center justify-between"
                onClick={() => toggleExpanded(item.id)}
              >
                <div>
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <p className="text-sm text-white/70 mt-1">{item.description}</p>
                </div>
                {expandedItems.includes(item.id) ? (
                  <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-white/60 flex-shrink-0 ml-4" />
                )}
              </div>
              
              <div className={`expandable-content ${expandedItems.includes(item.id) ? 'expanded' : ''}`}>
                <div className="px-4 pb-4">
                  {item.details && (
                    <div className="mb-4">
                      <p className="text-sm text-white/80">{item.details}</p>
                    </div>
                  )}
                  
                  {item.specifications && item.specifications.length > 0 && (
                    <div>
                      <h5 className="font-medium text-white mb-2">Especificações:</h5>
                      <ul className="space-y-1">
                        {item.specifications.map((spec, index) => (
                          <li key={index} className="text-sm text-white/70 flex items-start">
                            <span className="text-white/40 mr-2 mt-1">•</span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}