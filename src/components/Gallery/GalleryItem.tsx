import { Storage, S3ProviderListOutputItem } from '@aws-amplify/storage';
import { Button } from '@aws-amplify/ui-react';

type GalleryItemProps = {
  index: number;
  imageSrc: string;
  imageKeys: S3ProviderListOutputItem[];
};

const GalleryItem: React.FC<GalleryItemProps> = ({
  index,
  imageSrc,
  imageKeys,
}) => {
  const removeImage = async (imageKey: string) => {
    try {
      await Storage.remove(imageKey);
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handleRemoveImage = (imageKey: string | undefined) => {
    if (imageKey) {
      removeImage(imageKey)
        .then(() => console.log('Image removed!'))
        .catch((error) =>
          console.error('Error handling image removal:', error)
        );
    }
  };

  return (
    <a href="#" className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={imageSrc}
          alt={imageKeys[index]?.key}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col">
        <p className="m-1 text-center text-gray-200 font-medium truncate">
          {imageKeys[index]?.key}
        </p>
        <Button onClick={() => handleRemoveImage(imageKeys[index]?.key)}>
          Remove
        </Button>
      </div>
    </a>
  );
};

export default GalleryItem;
