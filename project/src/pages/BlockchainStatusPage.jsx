import React, { useState, useEffect } from 'react';
import { checkBlockchainValidity } from '../api/blockchainApi.js';
import { Shield, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const BlockchainStatusPage = () => {
  const [blockchainStatus, setBlockchainStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load blockchain status on component mount
  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const status = await checkBlockchainValidity();
      setBlockchainStatus(status);
    } catch (error) {
      console.error('Error checking blockchain status:', error);
      alert('Failed to check blockchain status. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Shield className="h-8 w-8 mr-3 text-blue-600" />
        Blockchain Status
      </h1>

      {/* Status Check Button */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Blockchain Integrity Check</h3>
            <p className="text-sm text-gray-600 mt-1">
              Verify that the blockchain is valid and secure
            </p>
          </div>
          <button
            onClick={checkStatus}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </div>
      </div>

      {/* Status Display */}
      {blockchainStatus !== null && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Report</h3>
          
          <div className="space-y-6">
            {/* Validity Status */}
            <div className="flex items-center p-4 rounded-lg border">
              <div className="flex-shrink-0">
                {blockchainStatus ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">
                  Blockchain Validity
                </h4>
                <p className="text-sm text-gray-600">
                  {blockchainStatus 
                    ? 'The blockchain is valid and secure. All blocks have proper hash chains.' 
                    : 'WARNING: The blockchain integrity has been compromised!'}
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  blockchainStatus 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {blockchainStatus ? 'VALID' : 'INVALID'}
                </span>
              </div>
            </div>

            {/* Information Panel */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-3">About Blockchain Security</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  • The blockchain ensures vote integrity through cryptographic hashing
                </p>
                <p>
                  • Each block contains a hash of the previous block, creating an immutable chain
                </p>
                <p>
                  • Any tampering with votes would invalidate the entire blockchain
                </p>
                <p>
                  • Regular status checks help maintain system security and transparency
                </p>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-md font-medium text-blue-900 mb-2">System Information</h4>
              <div className="text-sm text-blue-800">
                <p>Last checked: {new Date().toLocaleString()}</p>
                <p>Blockchain validation algorithm: SHA-256 hash verification</p>
                <p>Security level: Enterprise-grade cryptographic protection</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-600 mr-3" />
            <span className="text-gray-600">Verifying blockchain integrity...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainStatusPage;