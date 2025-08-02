"use client"

import React from "react"
import { motion } from "framer-motion"
import { AdvancedTextAnimation } from "@/components/advanced-text-animation"
import { MagneticElement } from "@/components/magnetic-element"
import { StyledTable, StyledTableHeader, StyledTableBody, StyledTableRow, StyledTableCell } from "@/components/ui/styled-table"
import { useLanguage } from "@/contexts/language-context"

export function EnhancedProposal() {
  const { t } = useLanguage()

  return (
    <div className="space-y-24">
      {/* Journey Flow - Visual Process */}
      <div className="glass-blur p-8">
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
            Jornada do Participante - Fluxo Visual
          </AdvancedTextAnimation>
        </div>
        <div className="heading-medium font-sans mb-4 text-white/90">
          Processo de 6 Etapas em 5min 50s
        </div>
        
        {/* Visual Flow Steps */}
        <motion.div 
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Step 1 */}
          <motion.div 
            className="glass-blur-subtle flex items-center gap-4 p-4 hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
              1
            </div>
            <div className="flex-1">
              <div className="font-medium text-white mb-1">ABORDAGEM ATIVA</div>
              <div className="text-sm text-white/80">Promotores com tablets mostram prêmios premium → Explicam processo rápido</div>
            </div>
            <div className="text-xs text-white/60 font-mono">~30s</div>
          </motion.div>

          {/* Arrow */}
          <motion.div 
            className="flex justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="w-px h-8 bg-white/20"></div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="glass-blur-subtle flex items-center gap-4 p-4 hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
              2
            </div>
            <div className="flex-1">
              <div className="font-medium text-white mb-1">CADASTRO DIGITAL</div>
              <div className="text-sm text-white/80">4 totens touchscreen 55″ → Dados de marketing + códigos únicos</div>
            </div>
            <div className="text-xs text-white/60 font-mono">50s</div>
          </motion.div>

          <motion.div 
            className="flex justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="w-px h-8 bg-white/20"></div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="glass-blur-subtle flex items-center gap-4 p-4 hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
              3
            </div>
            <div className="flex-1">
              <div className="font-medium text-white mb-1">TICKET + CONEXÃO</div>
              <div className="text-sm text-white/80">Ticket impresso + código WhatsApp → Conexão digital imediata</div>
            </div>
            <div className="text-xs text-white/60 font-mono">5s</div>
          </motion.div>

          <motion.div 
            className="flex justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="w-px h-8 bg-white/20"></div>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            className="glass-blur-subtle flex items-center gap-4 p-4 hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
              4
            </div>
            <div className="flex-1">
              <div className="font-medium text-white mb-1">EXPECTATIVA CRESCENTE</div>
              <div className="text-sm text-white/80">Cronômetros + vídeos promocionais → Antecipação para o giro</div>
            </div>
            <div className="text-xs text-white/60 font-mono">2min 30s</div>
          </motion.div>

          <motion.div 
            className="flex justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="w-px h-8 bg-white/20"></div>
          </motion.div>

          {/* Step 5 */}
          <motion.div 
            className="glass-blur-subtle flex items-center gap-4 p-4 hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
              5
            </div>
            <div className="flex-1">
              <div className="font-medium text-white mb-1">MOMENTO CLÍMAX</div>
              <div className="text-sm text-white/80">Animação roleta 30s → Mecânica realística + anúncios dramáticos</div>
            </div>
            <div className="text-xs text-white/60 font-mono">30s</div>
          </motion.div>

          <motion.div 
            className="flex justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="w-px h-8 bg-white/20"></div>
          </motion.div>

          {/* Step 6 */}
          <motion.div 
            className="glass-blur-subtle flex items-center gap-4 p-4 hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
              6
            </div>
            <div className="flex-1">
              <div className="font-medium text-white mb-1">RECOMPENSA GARANTIDA</div>
              <div className="text-sm text-white/80">Vencedores no balcão + chaveiros para todos → Lembrança da marca</div>
            </div>
            <div className="text-xs text-white/60 font-mono">1min 30s</div>
          </motion.div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30%" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.8
              }
            }
          }}
        >
          <motion.div 
            className="glass-blur-subtle p-4 text-center hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="text-2xl font-bold text-white mb-1">72×</div>
            <div className="text-sm text-white/60">Repetições diárias</div>
          </motion.div>
          <motion.div 
            className="glass-blur-subtle p-4 text-center hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="text-2xl font-bold text-white mb-1">1.730+</div>
            <div className="text-sm text-white/60">Cadastros gerados</div>
          </motion.div>
          <motion.div 
            className="glass-blur-subtle p-4 text-center hover:bg-white/5 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }
            }}
          >
            <div className="text-2xl font-bold text-white mb-1">5min 50s</div>
            <div className="text-sm text-white/60">Tempo total</div>
          </motion.div>
        </motion.div>
      </div>


      {/* Technical Production Requirements */}
      <div className="glass-blur p-8">
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
            {t('technicalProductionTitle')}
          </AdvancedTextAnimation>
        </div>
        <div className="heading-medium font-sans mb-4 text-white/90">
          {t('technicalProductionSubtitle')}
        </div>
        
        <div className="body-medium text-white/80 font-sans mb-6">
          <AdvancedTextAnimation tag="p" type="fade">
            {t('technicalProductionDescription')}
          </AdvancedTextAnimation>
        </div>

        {/* Video Production Details */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4 text-white/90">Produção de Conteúdo</h4>
          <div className="space-y-3">
            {(t('videoProductionDetails') as string[]).map((detail, index) => (
              <div key={index} className="glass-blur-subtle flex items-start p-4">
                <div className="w-2 h-2 bg-white/60 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div className="body-medium text-white/80 font-sans">
                  <AdvancedTextAnimation delay={0.1 * index} type="fade">
                    {detail}
                  </AdvancedTextAnimation>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interval Content */}
        <div>
          <h4 className="text-lg font-medium mb-4 text-white/90">{t('intervalContentTitle')}</h4>
          <div className="body-medium text-white/80 font-sans mb-4">
            {t('intervalContentDescription')}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(t('intervalContentDetails') as string[]).map((detail, index) => (
              <div key={index} className="glass-blur-subtle flex items-start p-4">
                <div className="w-2 h-2 bg-white/60 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div className="body-medium text-white/80 font-sans">
                  <AdvancedTextAnimation delay={0.1 * index} type="fade">
                    {detail}
                  </AdvancedTextAnimation>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="glass-blur p-8">
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
            {t('dailyScheduleTitle')}
          </AdvancedTextAnimation>
        </div>
        <div className="heading-medium font-sans mb-4 text-white/90">
          {t('dailyScheduleSubtitle')}
        </div>
        
        <div className="body-medium text-white/80 font-sans mb-6">
          <AdvancedTextAnimation tag="p" type="fade">
            {t('dailyScheduleDescription')}
          </AdvancedTextAnimation>
        </div>

        <StyledTable>
          <StyledTableHeader>
            <StyledTableRow>
              <StyledTableCell isHeader>Horário</StyledTableCell>
              <StyledTableCell isHeader>Atividade</StyledTableCell>
              <StyledTableCell isHeader>Detalhes Operacionais</StyledTableCell>
            </StyledTableRow>
          </StyledTableHeader>
          <StyledTableBody>
            {(t('dailyScheduleItems') as any[]).map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <div className="font-mono text-white font-medium">
                    {item.time}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div className="font-medium text-white">
                    {item.activity}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div className="text-white/80">
                    {item.details}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-blur-subtle p-4">
            <div className="text-lg font-bold text-white mb-1">72</div>
            <div className="text-sm text-white/70">Giros da roleta por dia</div>
          </div>
          <div className="glass-blur-subtle p-4">
            <div className="text-lg font-bold text-white mb-1">1.730</div>
            <div className="text-sm text-white/70">Cadastros esperados</div>
          </div>
          <div className="glass-blur-subtle p-4">
            <div className="text-lg font-bold text-white mb-1">6h</div>
            <div className="text-sm text-white/70">Horas de operação ativa</div>
          </div>
        </div>
      </div>
    </div>
  )
}