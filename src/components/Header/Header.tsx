import { useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import Modal from './Modal';
import Upload from './Upload';
import '@aws-amplify/ui-react/styles.css';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="title text-3xl text-brand">Midgallery</h1>
      <Button variation="primary" onClick={() => setShowModal(true)}>
       Upload
      </Button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Upload />
      </Modal>
    </header>
  );
};

export default Header;
