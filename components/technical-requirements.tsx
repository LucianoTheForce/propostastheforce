"use client"

import React from 'react'

export function TechnicalRequirements() {
  return (
    <div className="space-y-8">
      {/* Requisitos Técnicos de Produção */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Requisitos Técnicos de Produção
        </h2>
        
        {/* Conteúdo de Vídeo e Ciclos Operacionais */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Conteúdo de Vídeo e Ciclos Operacionais
          </h3>
          <p className="text-white/80 mb-4">
            A ativação requer execução técnica precisa com 72 vídeos únicos de resultados da roleta diariamente, além de conteúdo contínuo durante períodos não-gaming.
          </p>
        </div>

        {/* Produção de Conteúdo */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-white mb-4">Produção de Conteúdo</h4>
          <div className="space-y-3 text-white/80">
            <p><strong>Produção Diária de Vídeo:</strong> 72 vídeos únicos de 30 segundos da roleta com diferentes resultados da bolinha</p>
            <p><strong>Conteúdo Semanal:</strong> 504 vídeos individuais (72 × 7 dias) com números/cores vencedores predeterminados</p>
            <p><strong>Integração JCDecaux:</strong> 1 hora diária de conteúdo da roleta gigante visível por toda estação</p>
            <p><strong>Conteúdo Pré-renderizado:</strong> Todos os vídeos produzidos com física realista e branding Betano</p>
          </div>
        </div>

        {/* Conteúdo Durante Períodos Não-Gaming */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-white mb-4">Conteúdo Durante Períodos Não-Gaming</h4>
          <p className="text-white/80 mb-4">
            Durante os 4 minutos e 30 segundos entre cada giro da roleta, múltiplos fluxos de conteúdo mantêm o engajamento:
          </p>
          <div className="space-y-3 text-white/80">
            <p><strong>Período de Cadastro (2min):</strong> Vídeos promocionais mostrando recursos da plataforma Betano e prêmios</p>
            <p><strong>Cronômetro Regressivo (2min 30s):</strong> Contagem regressiva dinâmica com música e efeitos visuais crescentes</p>
            <p><strong>Conteúdo Ambiente:</strong> Vídeos da marca Betano, depoimentos de usuários e demonstrações da plataforma</p>
            <p><strong>Experiência Áudio:</strong> Trilha sonora customizada construindo emoção em direção a cada momento da roleta</p>
            <p><strong>Display LED do Estande:</strong> Presença contínua da marca com logos animados e celebrações de vencedores</p>
            <p><strong>Anúncios Ao Vivo:</strong> Comentários do promoter e mostras de prêmios entre ciclos de jogo</p>
          </div>
        </div>
      </div>
    </div>
  )
}