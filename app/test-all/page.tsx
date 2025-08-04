'use client';

import { useState } from 'react';

export default function TestAllPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, success: boolean, details: any) => {
    setResults(prev => [...prev, { test, success, details, time: new Date().toISOString() }]);
  };

  const runAllTests = async () => {
    setLoading(true);
    setResults([]);

    try {
      // Test 1: List Proposals
      const listResponse = await fetch('/api/proposals/list');
      const listData = await listResponse.json();
      addResult('List Proposals', listData.success, listData);

      // Test 2: Create Proposal
      const createResponse = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: 'Test Client',
          projectName: 'Test Project'
        })
      });
      const createData = await createResponse.json();
      addResult('Create Proposal', createData.success, createData);

      if (createData.success) {
        const { clientSlug, projectSlug } = createData;

        // Test 3: Get Proposal
        const getResponse = await fetch(`/api/proposals/${createData.id}`);
        const getData = await getResponse.json();
        addResult('Get Proposal', getData.success, getData);

        // Test 4: Update Proposal
        const updateResponse = await fetch(`/api/proposals/${createData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metadata: {
              status: 'sent'
            }
          })
        });
        const updateData = await updateResponse.json();
        addResult('Update Proposal', updateData.success, updateData);

        // Test 5: Generate Thumbnail
        const thumbnailResponse = await fetch(`/api/proposals/${createData.id}/thumbnail`, {
          method: 'POST'
        });
        const thumbnailData = await thumbnailResponse.json();
        addResult('Generate Thumbnail', thumbnailData.success, thumbnailData);

        // Test 6: Duplicate Proposal
        const duplicateResponse = await fetch(`/api/proposals/${createData.id}/duplicate`, {
          method: 'POST'
        });
        const duplicateData = await duplicateResponse.json();
        addResult('Duplicate Proposal', duplicateData.success, duplicateData);

        // Test 7: Export Proposals
        const exportResponse = await fetch('/api/proposals/export');
        const exportSuccess = exportResponse.ok;
        addResult('Export Proposals', exportSuccess, { status: exportResponse.status });

        // Test 8: Delete Proposal
        const deleteResponse = await fetch(`/api/proposals/${createData.id}`, {
          method: 'DELETE'
        });
        const deleteData = await deleteResponse.json();
        addResult('Delete Proposal', deleteData.success, deleteData);

        // Clean up duplicate if created
        if (duplicateData.success) {
          await fetch(`/api/proposals/${duplicateData.clientSlug}-${duplicateData.projectSlug}`, {
            method: 'DELETE'
          });
        }
      }

    } catch (error) {
      addResult('Test Error', false, { error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">System Test Suite</h1>
        
        <button
          onClick={runAllTests}
          disabled={loading}
          className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running Tests...' : 'Run All Tests'}
        </button>

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Test Results:</h2>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{result.test}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? 'PASSED' : 'FAILED'}
                  </span>
                </div>
                <details className="text-sm text-gray-600">
                  <summary className="cursor-pointer">Details</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}