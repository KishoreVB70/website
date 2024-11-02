// components/ModalOverlay.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface RequestCredentialModalProps {
  statusMessage: string;
  onClose: () => void;
  onRequestCredential?: () => void;
  credentialStatus: "present" | "not_present" | null;
}

const RequestCredentialModal: React.FC<RequestCredentialModalProps> = ({
  statusMessage,
  onClose,
  onRequestCredential,
  credentialStatus,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg h-40 mt-[50vh] w-11/12 max-w-md text-center">
        <p className="mb-4 text-lg font-medium">{statusMessage}</p>
        
        {/* Show "Request Credential" button if credential is not present */}
        {credentialStatus === "not_present" && onRequestCredential && (
          <Button onClick={onRequestCredential} className="mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Request Credential
          </Button>
        )}

        <Button onClick={onClose} className="ml-5 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
          Close
        </Button>
      </div>
    </div>
  );
};

export default RequestCredentialModal;
