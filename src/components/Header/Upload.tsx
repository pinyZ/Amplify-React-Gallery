import { Authenticator } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Upload = () => {
  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <StorageManager
            acceptedFileTypes={['image/*']}
            accessLevel="public"
            maxFileCount={6}
          />
          <div className="flex justify-center my-2">
            <Button variation="primary" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </main>
      )}
    </Authenticator>
  );
};

export default Upload;
