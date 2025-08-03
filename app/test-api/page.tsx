'use client';

import { useState } from 'react';

export default function TestAPIPage() {
  const [results, setResults] = useState<string[]>([]);
  
  const addResult = (result: string) => {
    setResults(prev => [...prev, result]);
  };
  
  const testListProposals = async () => {
    try {
      const response = await fetch('/api/proposals/list');
      const data = await response.json();
      addResult(`LIST: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      addResult(`LIST ERROR: ${error}`);
    }
  };
  
  const testGetProposal = async () => {
    try {
      const response = await fetch('/api/proposals/betano:estacao-se');
      const data = await response.json();
      addResult(`GET: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      addResult(`GET ERROR: ${error}`);
    }
  };
  
  const testCreateProposal = async () => {
    try {
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metadata: {
            clientName: 'Test Client',
            projectName: 'Test Project'
          },
          content: {
            hero: {
              title: { en: 'Test Title', pt: 'Título Teste' },
              subtitle: { en: 'Test Subtitle', pt: 'Subtítulo Teste' },
              description: { en: 'Test Description', pt: 'Descrição Teste' }
            },
            sections: []
          }
        })
      });
      const data = await response.json();
      addResult(`CREATE: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      addResult(`CREATE ERROR: ${error}`);
    }
  };
  
  const testUpdateProposal = async () => {
    try {
      const response = await fetch('/api/proposals/betano:estacao-se', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: {
            hero: {
              title: { en: 'Updated Title', pt: 'Título Atualizado' }
            }
          }
        })
      });
      const data = await response.json();
      addResult(`UPDATE: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      addResult(`UPDATE ERROR: ${error}`);
    }
  };
  
  const testDeleteProposal = async () => {
    try {
      const response = await fetch('/api/proposals/test-client:test-project', {
        method: 'DELETE'
      });
      const data = await response.json();
      addResult(`DELETE: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      addResult(`DELETE ERROR: ${error}`);
    }
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Proposal API Endpoints</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={testListProposals}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test LIST
        </button>
        <button
          onClick={testGetProposal}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test GET
        </button>
        <button
          onClick={testCreateProposal}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test CREATE
        </button>
        <button
          onClick={testUpdateProposal}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Test UPDATE
        </button>
        <button
          onClick={testDeleteProposal}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Test DELETE
        </button>
        <button
          onClick={() => setResults([])}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Results
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Results:</h2>
        <pre className="whitespace-pre-wrap overflow-x-auto text-sm">
          {results.length === 0 ? 'No results yet. Click a button above to test.' : results.join('\n\n')}
        </pre>
      </div>
    </div>
  );
}