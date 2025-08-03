'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Share2, Copy, Check, Edit3, Loader2, Camera } from 'lucide-react';
import { Proposal, LocalizedText } from '@/lib/proposal-types';

export default function ProposalEditor() {
  const params = useParams();
  const router = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [translatingField, setTranslatingField] = useState<string | null>(null);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const translationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clientSlug = params.client as string;
  const projectSlug = params.project as string;
  const proposalId = `${clientSlug}:${projectSlug}`;

  useEffect(() => {
    fetchProposal();
  }, [clientSlug, projectSlug]);

  // Handle Ctrl key press detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.metaKey) {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control' || !e.ctrlKey) {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Clear unsaved changes indicator when saving completes
  useEffect(() => {
    if (!saving && hasUnsavedChanges) {
      setHasUnsavedChanges(false);
    }
  }, [saving]);

  const fetchProposal = async () => {
    try {
      const response = await fetch(`/api/proposals/${proposalId}`);
      const data = await response.json();
      
      if (data.success) {
        setProposal(data.proposal);
      } else {
        console.error('Proposal not found');
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const saveProposal = async (updatedProposal: Proposal, isAutoSave = false) => {
    if (!isAutoSave) setSaving(true);
    try {
      const response = await fetch(`/api/proposals/${proposalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProposal)
      });

      const data = await response.json();
      if (data.success) {
        setProposal(updatedProposal);
        if (isAutoSave) {
          setHasUnsavedChanges(false);
        }
      }
    } catch (error) {
      console.error('Error saving proposal:', error);
      if (isAutoSave) {
        alert('Failed to auto-save changes');
      }
    } finally {
      if (!isAutoSave) setSaving(false);
    }
  };

  const translateField = async (text: string, sourceLang: 'pt' | 'en', targetLang: 'pt' | 'en'): Promise<string> => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          sourceLang, 
          targetLang,
          context: 'business proposal'
        })
      });

      const data = await response.json();
      if (data.success) {
        return data.translation;
      }
      throw new Error(data.error);
    } catch (error) {
      console.error('Translation error:', error);
      return ''; // Return empty string on error to not overwrite existing content
    }
  };

  const handleTextEdit = async (fieldPath: string, lang: 'pt' | 'en', value: string) => {
    if (!proposal) return;

    // Deep clone the proposal
    const updatedProposal = JSON.parse(JSON.stringify(proposal)) as Proposal;
    
    // Type-safe field update using a switch based on field path
    const updateField = (path: string, language: 'pt' | 'en', newValue: string) => {
      switch (path) {
        // Hero section
        case 'hero.title':
          updatedProposal.content.hero.title[language] = newValue;
          break;
        case 'hero.subtitle':
          updatedProposal.content.hero.subtitle[language] = newValue;
          break;
        case 'hero.proposalTitle':
          updatedProposal.content.hero.proposalTitle[language] = newValue;
          break;
        // Company section
        case 'company.description':
          updatedProposal.content.company.description[language] = newValue;
          break;
        case 'company.clientList':
          updatedProposal.content.company.clientList[language] = newValue;
          break;
        case 'company.location':
          updatedProposal.content.company.location[language] = newValue;
          break;
        // Executive Summary
        case 'executiveSummary.title':
          updatedProposal.content.executiveSummary.title[language] = newValue;
          break;
        case 'executiveSummary.description':
          updatedProposal.content.executiveSummary.description[language] = newValue;
          break;
        // Strategic Vision
        case 'strategicVision.title':
          updatedProposal.content.strategicVision.title[language] = newValue;
          break;
        case 'strategicVision.subtitle':
          updatedProposal.content.strategicVision.subtitle[language] = newValue;
          break;
        case 'strategicVision.description':
          updatedProposal.content.strategicVision.description[language] = newValue;
          break;
        default:
          console.warn(`Unknown field path: ${path}`);
          return;
      }
    };

    updateField(fieldPath, lang, value);

    // Update timestamp
    updatedProposal.metadata.updatedAt = new Date().toISOString();

    setProposal(updatedProposal);
    setHasUnsavedChanges(true);

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      saveProposal(updatedProposal, true);
    }, 1000); // Save after 1 second of no typing

    // Auto-translate if enabled
    if (autoTranslate && value.trim()) {
      const otherLang = lang === 'pt' ? 'en' : 'pt';
      
      // Clear existing translation timeout
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }

      // Set new timeout for debounced translation
      setTranslatingField(`${fieldPath}-${otherLang}`);
      translationTimeoutRef.current = setTimeout(async () => {
        const translation = await translateField(value, lang, otherLang);
        if (translation && proposal) {
          // Update the translated version
          const translatedProposal = JSON.parse(JSON.stringify(proposal)) as Proposal;
          updateField(fieldPath, otherLang, translation);
          translatedProposal.metadata.updatedAt = new Date().toISOString();
          setProposal(translatedProposal);
          saveProposal(translatedProposal, true);
        }
        setTranslatingField(null);
      }, 1500); // Translate after 1.5 seconds of no typing
    }
  };

  const handleFieldClick = (fieldPath: string) => {
    if (isCtrlPressed && editMode) {
      setEditingField(fieldPath);
    }
  };

  const handleFieldBlur = () => {
    setEditingField(null);
  };

  const renderEditableField = (
    label: string,
    content: LocalizedText,
    fieldPath: string,
    multiline = false
  ) => {
    const isEditing = editingField === fieldPath;
    const isTranslatingPt = translatingField === `${fieldPath}-pt`;
    const isTranslatingEn = translatingField === `${fieldPath}-en`;
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="space-y-2">
          {/* Portuguese */}
          <div className="relative">
            {isEditing ? (
              multiline ? (
                <textarea
                  value={content.pt}
                  onChange={(e) => handleTextEdit(fieldPath, 'pt', e.target.value)}
                  onBlur={handleFieldBlur}
                  className="w-full p-3 border border-blue-400 rounded-md resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Portuguese"
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  value={content.pt}
                  onChange={(e) => handleTextEdit(fieldPath, 'pt', e.target.value)}
                  onBlur={handleFieldBlur}
                  className="w-full p-3 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Portuguese"
                  autoFocus
                />
              )
            ) : (
              <div
                className={`p-3 bg-gray-50 rounded-md ${
                  editMode && isCtrlPressed ? 'cursor-text hover:bg-gray-100 hover:ring-1 hover:ring-gray-300' : ''
                }`}
                onClick={() => handleFieldClick(fieldPath)}
                title={editMode ? 'Hold Ctrl and click to edit' : ''}
              >
                <p className={multiline ? '' : 'text-lg'}>{content.pt}</p>
              </div>
            )}
            {isTranslatingPt && (
              <div className="absolute top-3 right-3 flex items-center text-xs text-gray-500">
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                Translating...
              </div>
            )}
          </div>
          {/* English */}
          <div className="relative">
            {isEditing ? (
              multiline ? (
                <textarea
                  value={content.en}
                  onChange={(e) => handleTextEdit(fieldPath, 'en', e.target.value)}
                  onBlur={handleFieldBlur}
                  className="w-full p-3 border border-gray-300 rounded-md resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="English"
                />
              ) : (
                <input
                  type="text"
                  value={content.en}
                  onChange={(e) => handleTextEdit(fieldPath, 'en', e.target.value)}
                  onBlur={handleFieldBlur}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="English"
                />
              )
            ) : (
              <div
                className={`p-3 bg-gray-50 rounded-md ${
                  editMode && isCtrlPressed ? 'cursor-text hover:bg-gray-100 hover:ring-1 hover:ring-gray-300' : ''
                }`}
                onClick={() => handleFieldClick(fieldPath)}
                title={editMode ? 'Hold Ctrl and click to edit' : ''}
              >
                <p className={`text-sm text-gray-600 ${multiline ? '' : 'mt-1'}`}>{content.en}</p>
              </div>
            )}
            {isTranslatingEn && (
              <div className="absolute top-3 right-3 flex items-center text-xs text-gray-500">
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                Translating...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!proposal) return;
    
    const updatedProposal: Proposal = {
      ...proposal,
      metadata: {
        ...proposal.metadata,
        status: newStatus as 'draft' | 'sent' | 'approved' | 'rejected',
        updatedAt: new Date().toISOString()
      }
    };
    
    await saveProposal(updatedProposal);
  };

  const copyShareLink = () => {
    const previewUrl = `${window.location.origin}/preview/${clientSlug}/${projectSlug}`;
    navigator.clipboard.writeText(previewUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const generateThumbnail = async () => {
    setGeneratingThumbnail(true);
    try {
      const response = await fetch(`/api/proposals/${proposalId}/thumbnail`, {
        method: 'POST'
      });
      
      const data = await response.json();
      if (data.success) {
        // Refresh the proposal to show the new thumbnail
        fetchProposal();
      } else {
        alert('Failed to generate thumbnail');
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      alert('Failed to generate thumbnail');
    } finally {
      setGeneratingThumbnail(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Proposal not found</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {proposal.metadata.clientName} - {proposal.metadata.projectName}
                </h1>
                <p className="text-sm text-gray-500">
                  Created {formatDate(proposal.metadata.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Status Selector */}
              <select
                value={proposal.metadata.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Action Buttons */}
              <button
                onClick={() => setEditMode(!editMode)}
                className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium transition-colors ${
                  editMode
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <Edit3 className="h-4 w-4 mr-1.5" />
                {editMode ? 'Editing' : 'Edit'}
              </button>

              <button
                onClick={generateThumbnail}
                disabled={generatingThumbnail}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingThumbnail ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-1.5" />
                    Thumbnail
                  </>
                )}
              </button>

              <button
                onClick={copyShareLink}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-1.5" />
                    Share
                  </>
                )}
              </button>

              <Link
                href={`/preview/${clientSlug}/${projectSlug}`}
                target="_blank"
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Eye className="h-4 w-4 mr-1.5" />
                Preview
              </Link>

              {(saving || hasUnsavedChanges) && (
                <div className="flex items-center text-sm text-gray-500">
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Saving...
                    </>
                  ) : hasUnsavedChanges ? (
                    <span className="text-orange-500">Unsaved changes</span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Edit Mode Instructions */}
      {editMode && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-800">
                <strong>Edit Mode Active:</strong> Hold Ctrl (or Cmd on Mac) and click on any text field to edit it. Changes are saved automatically.
                {isCtrlPressed && <span className="ml-2 font-semibold">[Ctrl key pressed - Click to edit]</span>}
              </p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center text-sm text-blue-800">
                  <input
                    type="checkbox"
                    checked={autoTranslate}
                    onChange={(e) => setAutoTranslate(e.target.checked)}
                    className="mr-2 rounded border-blue-600 text-blue-600 focus:ring-blue-500"
                  />
                  Auto-translate
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-12">
            {/* Hero Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                {renderEditableField('Title', proposal.content.hero.title, 'hero.title')}
                {renderEditableField('Subtitle', proposal.content.hero.subtitle, 'hero.subtitle')}
                {renderEditableField('Proposal Title', proposal.content.hero.proposalTitle, 'hero.proposalTitle')}
              </div>
            </section>

            {/* Company Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
              <div className="space-y-4">
                {renderEditableField('Company Description', proposal.content.company.description, 'company.description', true)}
                {renderEditableField('Client List', proposal.content.company.clientList, 'company.clientList', true)}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="font-mono">{proposal.content.company.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p>{proposal.content.company.email}</p>
                    </div>
                  </div>
                </div>
                {renderEditableField('Location', proposal.content.company.location, 'company.location')}
              </div>
            </section>

            {/* Executive Summary */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive Summary</h2>
              <div className="space-y-4">
                {renderEditableField('Title', proposal.content.executiveSummary.title, 'executiveSummary.title')}
                {renderEditableField('Description', proposal.content.executiveSummary.description, 'executiveSummary.description', true)}
              </div>
            </section>

            {/* Strategic Vision */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Strategic Vision</h2>
              <div className="space-y-4">
                {renderEditableField('Title', proposal.content.strategicVision.title, 'strategicVision.title')}
                {renderEditableField('Subtitle', proposal.content.strategicVision.subtitle, 'strategicVision.subtitle')}
                {renderEditableField('Description', proposal.content.strategicVision.description, 'strategicVision.description', true)}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Strategic Points</label>
                  <div className="space-y-2">
                    {proposal.content.strategicVision.points.map((point, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        <p>{point.pt}</p>
                        <p className="text-sm text-gray-600 mt-1">{point.en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* More sections to be implemented... */}
            <div className="text-center py-8 text-gray-500">
              <p>Additional sections (About, Deliverables, Budget, etc.) will be displayed here</p>
              <p className="text-sm mt-2">Auto-translation is now active!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}