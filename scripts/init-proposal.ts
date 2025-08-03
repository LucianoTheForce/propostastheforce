import { redisProposalOps } from '../lib/redis'
import { Proposal } from '../lib/proposal-types'

// Create initial proposal from existing Betano content
async function initializeProposal() {
  const clientSlug = 'betano'
  const projectSlug = 'estacao-se'
  
  // Create a minimal proposal to test the system
  const proposal: Proposal = {
    metadata: {
      id: `${clientSlug}:${projectSlug}`,
      clientSlug,
      projectSlug,
      clientName: 'BETANO',
      projectName: 'Estação SE',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      thumbnail: '',
      tags: ['sports-betting', 'experiential', 'sergipe']
    },
    content: {
      hero: {
        title: {
          en: 'BETANO & THE FORCE',
          pt: 'BETANO & THE FORCE'
        },
        subtitle: {
          en: 'Experiential Marketing Proposal',
          pt: 'Proposta de Marketing Experiencial'
        },
        proposalTitle: {
          en: 'Sports Betting Experience at Estação SE',
          pt: 'Experiência de Apostas Esportivas na Estação SE'
        },
        scrollIndicator: {
          en: 'Scroll to explore',
          pt: 'Role para explorar'
        }
      },
      company: {
        description: {
          en: 'THE FORCE is a creative agency specializing in experiential marketing and brand activations.',
          pt: 'THE FORCE é uma agência criativa especializada em marketing experiencial e ativações de marca.'
        },
        clientList: {
          en: 'Our Clients',
          pt: 'Nossos Clientes'
        },
        phone: '+55 11 99999-9999',
        email: 'contact@theforce.com',
        location: {
          en: 'São Paulo, Brazil',
          pt: 'São Paulo, Brasil'
        }
      },
      executiveSummary: {
        title: {
          en: 'Executive Summary',
          pt: 'Resumo Executivo'
        },
        description: {
          en: 'This proposal outlines an innovative experiential marketing campaign for Betano at Estação SE, creating immersive sports betting experiences that engage fans and drive brand awareness.',
          pt: 'Esta proposta delineia uma campanha inovadora de marketing experiencial para a Betano na Estação SE, criando experiências imersivas de apostas esportivas que engajam fãs e aumentam o conhecimento da marca.'
        }
      },
      strategicVision: {
        title: {
          en: 'Strategic Vision',
          pt: 'Visão Estratégica'
        },
        subtitle: {
          en: 'Transforming Sports Engagement',
          pt: 'Transformando o Engajamento Esportivo'
        },
        description: {
          en: 'Our strategy focuses on creating memorable touchpoints that connect Betano with passionate sports fans.',
          pt: 'Nossa estratégia foca em criar pontos de contato memoráveis que conectam a Betano com fãs apaixonados por esportes.'
        },
        points: [
          {
            en: 'Interactive betting demonstrations',
            pt: 'Demonstrações interativas de apostas'
          },
          {
            en: 'VIP fan experiences',
            pt: 'Experiências VIP para fãs'
          },
          {
            en: 'Social media amplification',
            pt: 'Amplificação em mídias sociais'
          }
        ]
      },
      conceptMechanics: {
        title: {
          en: 'Concept & Mechanics',
          pt: 'Conceito & Mecânica'
        },
        subtitle: {
          en: 'How It Works',
          pt: 'Como Funciona'
        },
        description: {
          en: 'A multi-phase activation that combines physical and digital experiences.',
          pt: 'Uma ativação multifásica que combina experiências físicas e digitais.'
        },
        flow: {
          en: 'Registration → Engagement → Experience → Conversion',
          pt: 'Cadastro → Engajamento → Experiência → Conversão'
        }
      },
      // Technical production (using the experiential content)
      technicalProduction: {
        title: {
          en: 'Experiential Marketing',
          pt: 'Marketing Experiencial'
        },
        subtitle: {
          en: 'Creating Lasting Impressions',
          pt: 'Criando Impressões Duradouras'
        },
        description: {
          en: 'Our activation combines interactive booths, brand ambassadors, and digital integration for a complete experience.',
          pt: 'Nossa ativação combina estandes interativos, embaixadores da marca e integração digital para uma experiência completa.'
        },
        videoDetails: [
          {
            en: 'Interactive betting simulations and games',
            pt: 'Simulações e jogos de apostas envolventes'
          },
          {
            en: 'Trained staff to guide and educate visitors',
            pt: 'Equipe treinada para orientar e educar visitantes'
          },
          {
            en: 'Seamless app downloads and account creation',
            pt: 'Downloads de app e criação de conta sem fricção'
          }
        ],
        intervalContentTitle: {
          en: 'Fan Engagement Activities',
          pt: 'Atividades de Engajamento dos Fãs'
        },
        intervalContentDescription: {
          en: 'Between matches, we keep fans engaged with special activities',
          pt: 'Entre os jogos, mantemos os fãs engajados com atividades especiais'
        },
        intervalContentDetails: [
          {
            en: 'Live betting tutorials',
            pt: 'Tutoriais de apostas ao vivo'
          },
          {
            en: 'Prize giveaways',
            pt: 'Sorteios de prêmios'
          },
          {
            en: 'Meet & greet sessions',
            pt: 'Sessões de encontro com personalidades'
          }
        ]
      },
      // Daily schedule placeholder
      dailySchedule: {
        title: {
          en: 'Event Schedule',
          pt: 'Cronograma do Evento'
        },
        subtitle: {
          en: 'Daily Activities',
          pt: 'Atividades Diárias'
        },
        description: {
          en: 'Full schedule of activations throughout the event',
          pt: 'Cronograma completo de ativações durante o evento'
        },
        items: [
          {
            time: '10:00',
            activity: {
              en: 'Booth Opening',
              pt: 'Abertura do Estande'
            },
            details: {
              en: 'Welcome activities and registration',
              pt: 'Atividades de boas-vindas e cadastro'
            }
          },
          {
            time: '14:00',
            activity: {
              en: 'Peak Hours Activation',
              pt: 'Ativação Horário de Pico'
            },
            details: {
              en: 'Main interactive experiences',
              pt: 'Principais experiências interativas'
            }
          },
          {
            time: '18:00',
            activity: {
              en: 'Evening Session',
              pt: 'Sessão Noturna'
            },
            details: {
              en: 'Special prizes and closing activities',
              pt: 'Prêmios especiais e atividades de encerramento'
            }
          }
        ]
      },
      // Strategic opportunity
      opportunity: {
        title: {
          en: 'Market Opportunity',
          pt: 'Oportunidade de Mercado'
        },
        stats: [
          {
            en: '85% of sports fans are interested in betting',
            pt: '85% dos fãs de esportes têm interesse em apostas'
          },
          {
            en: 'R$ 1.2B sports betting market in Brazil',
            pt: 'Mercado de apostas esportivas de R$ 1,2B no Brasil'
          },
          {
            en: '3x growth expected in the next 2 years',
            pt: 'Crescimento de 3x esperado nos próximos 2 anos'
          }
        ]
      },
      // Project section
      project: {
        label: {
          en: 'Project',
          pt: 'Projeto'
        },
        titles: [
          {
            en: 'BETANO at',
            pt: 'BETANO na'
          },
          {
            en: 'Estação SE',
            pt: 'Estação SE'
          }
        ],
        scopeTitle: {
          en: 'Project Scope',
          pt: 'Escopo do Projeto'
        },
        scope: [
          {
            en: 'Interactive booth design and production',
            pt: 'Design e produção de estande interativo'
          },
          {
            en: 'Staff training and management',
            pt: 'Treinamento e gestão de equipe'
          },
          {
            en: 'Digital integration and analytics',
            pt: 'Integração digital e análise de dados'
          }
        ]
      },
      // Creative concept
      creative: {
        label: {
          en: 'Creative',
          pt: 'Criativo'
        },
        brandTitles: [
          {
            en: 'BETANO',
            pt: 'BETANO'
          },
          {
            en: 'Your Winning Experience',
            pt: 'Sua Experiência Vencedora'
          }
        ],
        conceptTitle: {
          en: 'Creative Concept',
          pt: 'Conceito Criativo'
        },
        conceptIntro: {
          en: 'Bringing the excitement of sports betting to life',
          pt: 'Trazendo a emoção das apostas esportivas à vida'
        },
        concept: [
          {
            en: 'Immersive betting simulations',
            pt: 'Simulações imersivas de apostas'
          },
          {
            en: 'Real-time odds displays',
            pt: 'Exibição de odds em tempo real'
          },
          {
            en: 'Gamified user journey',
            pt: 'Jornada do usuário gamificada'
          }
        ]
      },
      // Overview
      overview: {
        label: {
          en: 'Overview',
          pt: 'Visão Geral'
        },
        titles: [
          {
            en: 'Complete',
            pt: 'Experiência'
          },
          {
            en: 'Experience',
            pt: 'Completa'
          }
        ],
        description: {
          en: 'A comprehensive activation that transforms casual sports fans into engaged Betano users',
          pt: 'Uma ativação abrangente que transforma fãs casuais de esportes em usuários engajados da Betano'
        },
        features: [
          {
            en: 'Interactive technology',
            pt: 'Tecnologia interativa'
          },
          {
            en: 'Professional staff',
            pt: 'Equipe profissional'
          },
          {
            en: 'Measurable results',
            pt: 'Resultados mensuráveis'
          }
        ]
      },
      // Client info
      clientInfo: {
        clientLabel: {
          en: 'Client',
          pt: 'Cliente'
        },
        clientName: {
          en: 'BETANO',
          pt: 'BETANO'
        },
        studioLabel: {
          en: 'Agency',
          pt: 'Agência'
        },
        studioName: {
          en: 'THE FORCE',
          pt: 'THE FORCE'
        }
      },
      deliverables: {
        label: {
          en: 'Deliverables',
          pt: 'Entregáveis'
        },
        title: {
          en: 'What We Deliver',
          pt: 'O Que Entregamos'
        },
        description: {
          en: 'Comprehensive activation package',
          pt: 'Pacote completo de ativação'
        },
        list: [
          {
            number: '01',
            title: {
              en: 'Event Production',
              pt: 'Produção do Evento'
            },
            description: {
              en: 'Complete booth design and setup with interactive technology',
              pt: 'Design e montagem completa do estande com tecnologia interativa'
            }
          },
          {
            number: '02',
            title: {
              en: 'Staffing & Training',
              pt: 'Equipe & Treinamento'
            },
            description: {
              en: 'Professional brand ambassadors with comprehensive training',
              pt: 'Embaixadores profissionais da marca com treinamento abrangente'
            }
          },
          {
            number: '03',
            title: {
              en: 'Marketing Support',
              pt: 'Suporte de Marketing'
            },
            description: {
              en: 'Social media content and real-time engagement metrics',
              pt: 'Conteúdo para redes sociais e métricas de engajamento em tempo real'
            }
          }
        ]
      },
      // Pricing section
      pricing: {
        label: {
          en: 'Investment',
          pt: 'Investimento'
        },
        title: {
          en: 'Investment Options',
          pt: 'Opções de Investimento'
        },
        description: {
          en: 'Flexible packages to meet your needs',
          pt: 'Pacotes flexíveis para atender suas necessidades'
        },
        proposals: [
          {
            label: {
              en: 'Standard',
              pt: 'Padrão'
            },
            title: {
              en: 'Essential Package',
              pt: 'Pacote Essencial'
            },
            items: [
              {
                en: 'Basic booth setup',
                pt: 'Montagem básica do estande'
              },
              {
                en: '2 brand ambassadors',
                pt: '2 embaixadores da marca'
              },
              {
                en: 'Standard reporting',
                pt: 'Relatórios padrão'
              }
            ],
            price: {
              en: 'R$ 250,000',
              pt: 'R$ 250.000'
            }
          },
          {
            label: {
              en: 'Premium',
              pt: 'Premium'
            },
            title: {
              en: 'Complete Experience',
              pt: 'Experiência Completa'
            },
            items: [
              {
                en: 'Full interactive booth',
                pt: 'Estande totalmente interativo'
              },
              {
                en: '4 brand ambassadors',
                pt: '4 embaixadores da marca'
              },
              {
                en: 'Real-time analytics',
                pt: 'Análise em tempo real'
              }
            ],
            price: {
              en: 'R$ 450,000',
              pt: 'R$ 450.000'
            }
          }
        ],
        investmentOptions: {
          title: {
            en: 'Additional Options',
            pt: 'Opções Adicionais'
          },
          options: [
            {
              en: 'Extended event coverage',
              pt: 'Cobertura estendida do evento'
            },
            {
              en: 'Additional staff training',
              pt: 'Treinamento adicional de equipe'
            }
          ],
          complete: {
            en: 'Complete Package',
            pt: 'Pacote Completo'
          },
          completePrice: {
            en: 'R$ 450,000',
            pt: 'R$ 450.000'
          }
        },
        flexibleInvestment: {
          title: {
            en: 'Flexible Payment',
            pt: 'Pagamento Flexível'
          },
          optionA: {
            en: '50% upfront, 50% on delivery',
            pt: '50% antecipado, 50% na entrega'
          },
          optionB: {
            en: '3 monthly installments',
            pt: '3 parcelas mensais'
          },
          completeLabel: {
            en: 'Full payment discount: 5%',
            pt: 'Desconto pagamento à vista: 5%'
          }
        }
      },
      // Methodology
      methodology: {
        title: {
          en: 'Our Process',
          pt: 'Nosso Processo'
        },
        description: {
          en: 'A proven methodology for successful activations',
          pt: 'Uma metodologia comprovada para ativações de sucesso'
        },
        steps: [
          {
            en: 'Strategy & Planning',
            pt: 'Estratégia & Planejamento'
          },
          {
            en: 'Creative Development',
            pt: 'Desenvolvimento Criativo'
          },
          {
            en: 'Production & Setup',
            pt: 'Produção & Montagem'
          },
          {
            en: 'Execution & Management',
            pt: 'Execução & Gestão'
          },
          {
            en: 'Analysis & Reporting',
            pt: 'Análise & Relatórios'
          }
        ],
        viewTerms: {
          en: 'View full methodology',
          pt: 'Ver metodologia completa'
        }
      },
      // Terms
      terms: {
        label: {
          en: 'Terms',
          pt: 'Termos'
        },
        title: {
          en: 'Terms & Conditions',
          pt: 'Termos & Condições'
        },
        description: {
          en: 'Standard terms for our services',
          pt: 'Termos padrão para nossos serviços'
        },
        conditions: [
          {
            en: 'Payment terms as agreed',
            pt: 'Termos de pagamento conforme acordado'
          },
          {
            en: 'Cancellation policy applies',
            pt: 'Política de cancelamento se aplica'
          },
          {
            en: 'Intellectual property remains with THE FORCE',
            pt: 'Propriedade intelectual permanece com THE FORCE'
          }
        ]
      },
      // Contact
      contact: {
        title: {
          en: 'Contact Us',
          pt: 'Entre em Contato'
        },
        company: {
          en: 'THE FORCE Creative Agency',
          pt: 'THE FORCE Agência Criativa'
        },
        cnpj: '12.345.678/0001-90',
        address: {
          en: 'São Paulo, SP',
          pt: 'São Paulo, SP'
        },
        addressFull: {
          en: 'Av. Paulista, 1000 - São Paulo, SP',
          pt: 'Av. Paulista, 1000 - São Paulo, SP'
        },
        phone: '+55 11 99999-9999',
        instagram: {
          en: '@theforce.agency',
          pt: '@theforce.agency'
        }
      },
      // Approval
      approval: {
        title: {
          en: 'Proposal Approval',
          pt: 'Aprovação da Proposta'
        },
        location: {
          en: 'São Paulo',
          pt: 'São Paulo'
        },
        client: {
          en: 'BETANO',
          pt: 'BETANO'
        },
        theForceLabel: {
          en: 'THE FORCE',
          pt: 'THE FORCE'
        },
        creativeDirector: {
          en: 'Creative Director',
          pt: 'Diretor Criativo'
        },
        acceptProposal: {
          en: 'Accept Proposal',
          pt: 'Aceitar Proposta'
        }
      }
    }
  }
  
  try {
    console.log('Initializing Betano proposal...')
    const success = await redisProposalOps.saveProposal(proposal)
    console.log(`Created proposal: ${proposal.metadata.id} - Success: ${success}`)
    
    // Verify it was created
    const retrieved = await redisProposalOps.getProposal(clientSlug, projectSlug)
    console.log('Proposal retrieved:', !!retrieved)
    
    // Check the list
    const list = await redisProposalOps.getProposalsList()
    console.log('Proposals in list:', list.length)
    
    if (retrieved) {
      console.log('Proposal metadata:', retrieved.metadata)
    }
  } catch (error) {
    console.error('Error initializing proposal:', error)
  }
}

// Run the initialization
initializeProposal().then(() => {
  console.log('Initialization complete')
}).catch((error) => {
  console.error('Initialization failed:', error)
})