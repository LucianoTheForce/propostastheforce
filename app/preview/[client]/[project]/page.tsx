'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Proposal, LocalizedText } from '@/lib/proposal-types';
import { Globe } from 'lucide-react';

export default function ProposalPreview() {
  const params = useParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  const clientSlug = params.client as string;
  const projectSlug = params.project as string;
  const proposalId = `${clientSlug}:${projectSlug}`;

  useEffect(() => {
    fetchProposal();
  }, [clientSlug, projectSlug]);

  const fetchProposal = async () => {
    try {
      const response = await fetch(`/api/proposals/${proposalId}`);
      const data = await response.json();
      
      if (data.success) {
        setProposal(data.proposal);
      } else {
        console.error('Proposal not found');
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    } finally {
      setLoading(false);
    }
  };

  const getText = (content: LocalizedText): string => {
    return content[language];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'sent':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      draft: { pt: 'Rascunho', en: 'Draft' },
      sent: { pt: 'Enviada', en: 'Sent' },
      approved: { pt: 'Aprovada', en: 'Approved' },
      rejected: { pt: 'Rejeitada', en: 'Rejected' }
    };
    return statusTexts[status as keyof typeof statusTexts][language];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Proposal Not Found</h1>
          <p className="text-gray-600">The requested proposal could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="font-medium">{language === 'pt' ? 'EN' : 'PT'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="hero-section relative bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{getText(proposal.content.hero.title)}</h1>
            <p className="text-xl text-gray-300 mb-8">{getText(proposal.content.hero.subtitle)}</p>
            <div className="inline-flex items-center space-x-4">
              <h2 className="text-3xl font-semibold">{getText(proposal.content.hero.proposalTitle)}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.metadata.status)}`}>
                {getStatusText(proposal.metadata.status)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {language === 'pt' ? 'Sobre a Empresa' : 'About the Company'}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {getText(proposal.content.company.description)}
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Nossos Clientes' : 'Our Clients'}
                  </h3>
                  <p className="text-gray-700">{getText(proposal.content.company.clientList)}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Contato' : 'Contact'}
                  </h3>
                  <p className="text-gray-700">
                    📧 {proposal.content.company.email}<br />
                    📱 {proposal.content.company.phone}<br />
                    📍 {getText(proposal.content.company.location)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getText(proposal.content.executiveSummary.title)}
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {getText(proposal.content.executiveSummary.description)}
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getText(proposal.content.strategicVision.title)}
            </h2>
            <p className="text-xl text-gray-600">
              {getText(proposal.content.strategicVision.subtitle)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {getText(proposal.content.strategicVision.description)}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposal.content.strategicVision.points.map((point, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="ml-4 text-gray-700">{getText(point)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              {language === 'pt' ? 'Proposta criada em' : 'Proposal created on'} {formatDate(proposal.metadata.createdAt)}
            </p>
            <p className="text-gray-400">
              {language === 'pt' ? 'Última atualização' : 'Last updated'}: {formatDate(proposal.metadata.updatedAt)}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}