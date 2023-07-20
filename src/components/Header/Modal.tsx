import React, { ReactNode } from 'react';
import { Button, Card } from '@aws-amplify/ui-react';

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, children }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <Card>
        <div className="bg-white p-4 rounded relative z-10">
          {children}
          <div className="flex justify-center my-2">
            <Button variation="primary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
