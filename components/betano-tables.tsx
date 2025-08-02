"use client"

import React from "react"
import { StyledTable, StyledTableHeader, StyledTableBody, StyledTableRow, StyledTableCell } from "@/components/ui/styled-table"
import { AdvancedTextAnimation } from "@/components/advanced-text-animation"
import { MagneticElement } from "@/components/magnetic-element"

export function BetanoTables() {
  return (
    <div className="space-y-12">
      {/* Cálculo de Participantes */}
      <div className="glass-blur p-8">
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
            Cálculo de Participantes e Capacidade
          </AdvancedTextAnimation>
        </div>

        {/* Perfis de Usuário */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4 text-white/90">Perfis de Usuário - Tempo de Interação</h4>
          <p className="text-sm text-white/70 mb-4">
            Tempo médio para completar cadastro e realizar aposta na roleta, baseado no perfil de familiaridade com tecnologia:
          </p>
          <StyledTable>
            <StyledTableHeader>
              <StyledTableRow>
                <StyledTableCell isHeader>Perfil do Usuário</StyledTableCell>
                <StyledTableCell isHeader>% dos Participantes</StyledTableCell>
                <StyledTableCell isHeader>Tempo Cadastro + Aposta</StyledTableCell>
              </StyledTableRow>
            </StyledTableHeader>
            <StyledTableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Rápido</div>
                    <div className="text-xs text-white/60">Usuários tech-savvy</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>20%</StyledTableCell>
                <StyledTableCell>25 segundos</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Médio</div>
                    <div className="text-xs text-white/60">Usuários regulares</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>50%</StyledTableCell>
                <StyledTableCell>40 segundos</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Lento</div>
                    <div className="text-xs text-white/60">Primeira experiência</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>30%</StyledTableCell>
                <StyledTableCell>60 segundos</StyledTableCell>
              </StyledTableRow>
            </StyledTableBody>
          </StyledTable>
          <div className="mt-3 glass-blur-subtle p-3">
            <p className="text-sm text-white/80">
              <span className="font-medium">Tempo médio ponderado:</span> 43 segundos por participante
            </p>
            <p className="text-xs text-white/60 mt-1">
              Cálculo: (20% × 25s) + (50% × 40s) + (30% × 60s) = 43s
            </p>
          </div>
        </div>

        {/* Configuração dos Totens */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4 text-white/90">Configuração dos Totens Interativos</h4>
          <p className="text-sm text-white/70 mb-4">
            Especificações técnicas dos equipamentos para cadastro e participação na roleta:
          </p>
          <StyledTable>
            <StyledTableHeader>
              <StyledTableRow>
                <StyledTableCell isHeader>Especificação</StyledTableCell>
                <StyledTableCell isHeader>Detalhes</StyledTableCell>
                <StyledTableCell isHeader>Funcionalidade</StyledTableCell>
              </StyledTableRow>
            </StyledTableHeader>
            <StyledTableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Quantidade</div>
                    <div className="text-xs text-white/60">Total de equipamentos</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>4 unidades</StyledTableCell>
                <StyledTableCell>Processamento simultâneo de cadastros</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Display</div>
                    <div className="text-xs text-white/60">Tela touchscreen</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>55 polegadas</StyledTableCell>
                <StyledTableCell>Interface intuitiva para cadastro e apostas</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Capacidade</div>
                    <div className="text-xs text-white/60">Usuários simultâneos</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>1 pessoa por totem</StyledTableCell>
                <StyledTableCell>Experiência personalizada e privacidade</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Tempo Médio</div>
                    <div className="text-xs text-white/60">Por interação completa</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>43 segundos</StyledTableCell>
                <StyledTableCell>Cadastro + seleção de aposta + confirmação</StyledTableCell>
              </StyledTableRow>
            </StyledTableBody>
          </StyledTable>
        </div>

        {/* Capacidade de Cadastros */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4 text-white/90">Capacidade Operacional de Cadastros</h4>
          <p className="text-sm text-white/70 mb-4">
            Projeção de cadastros baseada no tempo médio de 43s por participante e operação com 4 totens simultâneos:
          </p>
          <StyledTable>
            <StyledTableHeader>
              <StyledTableRow>
                <StyledTableCell isHeader>Período de Análise</StyledTableCell>
                <StyledTableCell isHeader>Novos Cadastros</StyledTableCell>
                <StyledTableCell isHeader>Base de Cálculo</StyledTableCell>
              </StyledTableRow>
            </StyledTableHeader>
            <StyledTableBody>
              <StyledTableRow>
                <StyledTableCell>Por totem (5 minutos)</StyledTableCell>
                <StyledTableCell>6 cadastros</StyledTableCell>
                <StyledTableCell>300s ÷ 43s = ~7 participações</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Por rodada completa</StyledTableCell>
                <StyledTableCell>24 cadastros</StyledTableCell>
                <StyledTableCell>6 cadastros × 4 totens simultâneos</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Por hora operacional</StyledTableCell>
                <StyledTableCell>288 cadastros</StyledTableCell>
                <StyledTableCell>24 por rodada × 12 rodadas/hora</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Por dia (6h ativas)</StyledTableCell>
                <StyledTableCell className="font-bold text-white">1.730 cadastros</StyledTableCell>
                <StyledTableCell>288/hora × 6 horas de operação</StyledTableCell>
              </StyledTableRow>
            </StyledTableBody>
          </StyledTable>
          <div className="mt-3 glass-blur p-3">
            <p className="text-sm text-white">
              <span className="font-medium">Meta diária:</span> 1.700 cadastros (conversão de 0,5% do fluxo da estação)
            </p>
          </div>
        </div>

        {/* Tempo de Permanência */}
        <div>
          <h4 className="text-lg font-medium mb-4 text-white/90">Jornada Completa do Participante</h4>
          <p className="text-sm text-white/70 mb-4">
            Breakdown detalhado do tempo total de permanência na ativação, do primeiro contato até o recebimento do brinde:
          </p>
          <StyledTable>
            <StyledTableHeader>
              <StyledTableRow>
                <StyledTableCell isHeader>Etapa da Experiência</StyledTableCell>
                <StyledTableCell isHeader>Duração</StyledTableCell>
                <StyledTableCell isHeader>Descrição da Atividade</StyledTableCell>
              </StyledTableRow>
            </StyledTableHeader>
            <StyledTableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Aproximação e Fila</div>
                    <div className="text-xs text-white/60">Aguardando totem livre</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>108 segundos</StyledTableCell>
                <StyledTableCell>Atrair atenção, explicar mecânica, aguardar vez</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Cadastro e Aposta</div>
                    <div className="text-xs text-white/60">Interação no totem</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>43 segundos</StyledTableCell>
                <StyledTableCell>Preencher dados, escolher números/cores, confirmar</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Aguardo do Giro</div>
                    <div className="text-xs text-white/60">Expectativa e engajamento</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>150 segundos</StyledTableCell>
                <StyledTableCell>Socialização, foto, vídeos, aguardar rodada</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium">Giro e Premiação</div>
                    <div className="text-xs text-white/60">Momento de resultado</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>30 segundos</StyledTableCell>
                <StyledTableCell>Execução da roleta, anúncio, entrega de brinde</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow className="glass-blur-subtle">
                <StyledTableCell className="font-bold">
                  <div>
                    <div>Experiência Completa</div>
                    <div className="text-xs text-white/60">Tempo total investido</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell className="font-bold text-white">350s (5min 50s)</StyledTableCell>
                <StyledTableCell className="font-medium">Do primeiro contato ao brinde recebido</StyledTableCell>
              </StyledTableRow>
            </StyledTableBody>
          </StyledTable>
          <div className="mt-3 glass-blur p-3">
            <p className="text-sm text-white">
              <span className="font-medium">Impacto positivo:</span> Experiência completa de ~6 minutos gera alto engajamento e recall da marca
            </p>
          </div>
        </div>
      </div>

      {/* Fluxo de Cadastros e Brindes */}
      <div className="glass-blur p-8">
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
            Fluxo de Cadastros e Distribuição de Brindes
          </AdvancedTextAnimation>
        </div>

        {/* Metas e Configuração */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4 text-white/90">Metas e Configuração</h4>
          <StyledTable>
            <StyledTableHeader>
              <StyledTableRow>
                <StyledTableCell isHeader>Métrica</StyledTableCell>
                <StyledTableCell isHeader>Valor</StyledTableCell>
              </StyledTableRow>
            </StyledTableHeader>
            <StyledTableBody>
              <StyledTableRow>
                <StyledTableCell>Fluxo Estação Sé</StyledTableCell>
                <StyledTableCell>338.000 passagens/dia</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Taxa de conversão alvo</StyledTableCell>
                <StyledTableCell>0,5%</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Meta de cadastros/dia</StyledTableCell>
                <StyledTableCell className="font-bold text-white">1.700</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Giros por hora</StyledTableCell>
                <StyledTableCell>12</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Horas de ação/dia</StyledTableCell>
                <StyledTableCell>6 horas</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Total giros/dia</StyledTableCell>
                <StyledTableCell>72</StyledTableCell>
              </StyledTableRow>
            </StyledTableBody>
          </StyledTable>
        </div>

        {/* Regras de Premiação */}
        <div>
          <h4 className="text-lg font-medium mb-4 text-white/90">Sistema de Premiação Inteligente</h4>
          <p className="text-sm text-white/70 mb-4">
            Mecânica de recompensas que garante que 100% dos participantes recebam brindes, incentivando o engajamento:
          </p>
          <StyledTable>
            <StyledTableHeader>
              <StyledTableRow>
                <StyledTableCell isHeader>Tipo de Acerto</StyledTableCell>
                <StyledTableCell isHeader>Brinde Conquistado</StyledTableCell>
                <StyledTableCell isHeader>Probabilidade/Quantidade</StyledTableCell>
                <StyledTableCell isHeader>Valor Percebido</StyledTableCell>
              </StyledTableRow>
            </StyledTableHeader>
            <StyledTableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium text-white">Número Exato</div>
                    <div className="text-xs text-white/60">Acerto certeiro (1 em 37)</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>Fone Bluetooth Premium</StyledTableCell>
                <StyledTableCell>1 por giro (garantido)</StyledTableCell>
                <StyledTableCell className="text-white font-medium">Alto</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium text-white">Cor Correta</div>
                    <div className="text-xs text-white/60">Vermelho ou Preto (~48%)</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>Copo Betano Personalizado</StyledTableCell>
                <StyledTableCell>~12 participantes/giro</StyledTableCell>
                <StyledTableCell className="text-white font-medium">Médio</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium text-white">Paridade Correta</div>
                    <div className="text-xs text-white/60">Par ou Ímpar (~48%)</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>Cordão de Celular</StyledTableCell>
                <StyledTableCell>~8 participantes/giro</StyledTableCell>
                <StyledTableCell className="text-white font-medium">Médio</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <div>
                    <div className="font-medium text-white">Participação</div>
                    <div className="text-xs text-white/60">Garantia de brinde</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>Chaveiro Exclusivo Betano</StyledTableCell>
                <StyledTableCell>1 por telefone/dia</StyledTableCell>
                <StyledTableCell className="text-white font-medium">Lembrança</StyledTableCell>
              </StyledTableRow>
            </StyledTableBody>
          </StyledTable>
          <div className="mt-3 glass-blur p-3">
            <p className="text-sm text-white">
              <span className="font-medium">Estratégia:</span> Múltiplas formas de "ganhar" aumentam satisfação e reduzem frustração
            </p>
          </div>
        </div>
      </div>

      {/* Estoque de Brindes */}
      <div className="glass-blur p-8">
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
            Estoque de Brindes Planejado
          </AdvancedTextAnimation>
        </div>

        <StyledTable>
          <StyledTableHeader>
            <StyledTableRow>
              <StyledTableCell isHeader>Brinde</StyledTableCell>
              <StyledTableCell isHeader>Estoque Total</StyledTableCell>
              <StyledTableCell isHeader>Distribuição Diária</StyledTableCell>
              <StyledTableCell isHeader>Duração Estimada</StyledTableCell>
            </StyledTableRow>
          </StyledTableHeader>
          <StyledTableBody>
            <StyledTableRow>
              <StyledTableCell>
                <div>
                  <div className="font-medium text-white">Fone Bluetooth Premium</div>
                  <div className="text-xs text-white/60">Prêmio maior - número exato</div>
                </div>
              </StyledTableCell>
              <StyledTableCell>555 unidades</StyledTableCell>
              <StyledTableCell>72 por dia (1 por giro)</StyledTableCell>
              <StyledTableCell className="text-white">7,7 dias</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <div>
                  <div className="font-medium text-white">Copo Personalizado</div>
                  <div className="text-xs text-white/60">Acerto de cor (vermelho/preto)</div>
                </div>
              </StyledTableCell>
              <StyledTableCell>1.660 unidades</StyledTableCell>
              <StyledTableCell>~216 por dia</StyledTableCell>
              <StyledTableCell className="text-white">7,7 dias</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <div>
                  <div className="font-medium text-white">Cordão de Celular</div>
                  <div className="text-xs text-white/60">Acerto de paridade (par/ímpar)</div>
                </div>
              </StyledTableCell>
              <StyledTableCell>1.110 unidades</StyledTableCell>
              <StyledTableCell>~144 por dia</StyledTableCell>
              <StyledTableCell className="text-white">7,7 dias</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <div>
                  <div className="font-medium text-white">Chaveiro Betano</div>
                  <div className="text-xs text-white/60">Brinde garantido de participação</div>
                </div>
              </StyledTableCell>
              <StyledTableCell>15.000 unidades</StyledTableCell>
              <StyledTableCell>Até 1.700 por dia</StyledTableCell>
              <StyledTableCell className="text-white">8,8 dias</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow className="glass-blur-subtle">
              <StyledTableCell>
                <div>
                  <div className="font-medium text-white">Chaveiro Reserva</div>
                  <div className="text-xs text-white/60">Estoque de segurança adicional</div>
                </div>
              </StyledTableCell>
              <StyledTableCell>5.000 unidades</StyledTableCell>
              <StyledTableCell>Backup técnico</StyledTableCell>
              <StyledTableCell className="text-white">+2,9 dias</StyledTableCell>
            </StyledTableRow>
          </StyledTableBody>
        </StyledTable>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="glass-blur p-4">
            <h5 className="font-medium text-white mb-2">Planejamento Estratégico</h5>
            <p className="text-sm text-white/90">
              Estoque calculado para <span className="font-bold">7 dias de operação</span> com margem de segurança de 20% 
              nos itens principais e reserva técnica de chaveiros.
            </p>
          </div>
          <div className="glass-blur p-4">
            <h5 className="font-medium text-white mb-2">Garantia de Experiência</h5>
            <p className="text-sm text-white/90">
              <span className="font-bold">100% dos participantes</span> recebem pelo menos um brinde, 
              criando experiência positiva e lembrança duradoura da marca.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}