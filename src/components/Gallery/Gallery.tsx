import { useState, useEffect, useCallback, useRef } from 'react';
import { Storage } from 'aws-amplify';
import { S3ProviderListOutputItem } from '@aws-amplify/storage';
import GalleryItem from './GalleryItem';
import '@aws-amplify/ui-react/styles.css';
import { Button } from '@aws-amplify/ui-react';

const PAGE_SIZE = 4;

const Gallery = () => {
  const [imageKeys, setImageKeys] = useState<S3ProviderListOutputItem[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const nextTokenRef = useRef<string | undefined>(undefined);
  const hasNextPageRef = useRef(true);

  const fetchImages = useCallback(
    async (nextToken: string | undefined = undefined) => {
      try {
        const response = await Storage.list('', {
          level: 'public',
          pageSize: PAGE_SIZE,
          nextToken: nextToken,
        });

        if (response.hasNextToken) {
          nextTokenRef.current = response.nextToken;
        } else {
          nextTokenRef.current = undefined;
          hasNextPageRef.current = false;
        }

        setImageKeys(response.results);
        const s3Images = await Promise.all(
          response.results.map(
            async (image) => await Storage.get(image.key!, { level: 'public' })
          )
        );
        setImages(s3Images);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void fetchImages();
  }, [fetchImages]);

  const handleRefresh = () => {
    fetchImages()
      .then(() =>  hasNextPageRef.current = true)
      .catch((error) => console.error('Error handling image removal:', error));
  };

  const handleNext = () => {
    fetchImages(nextTokenRef.current)
      .then()
      .catch((error) => console.error('Error handling image removal:', error));
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              index={index}
              imageSrc={image}
              imageKeys={imageKeys}
            />
          ))}
          {loading &&
            Array.from(Array(PAGE_SIZE).keys()).map((_, index) => (
              <div
                key={index}
                role="status"
                className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
              >
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
                <span className="sr-only">Loading</span>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button variation="primary" onClick={() => handleRefresh()}>
          Refresh
        </Button>
        {hasNextPageRef.current ? (
          <Button variation="primary" onClick={() => handleNext()}>
            Next
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default Gallery;
