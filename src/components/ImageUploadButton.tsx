// Modules
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import Button from "react-bootstrap/Button";

interface ImageUploadButtonInterface {
  value: ImageType[];
  onChange: (imageList: ImageListType) => void;
}
const ImageUploadButton = ({ value, onChange }: ImageUploadButtonInterface) => {
  return (
    <ImageUploading value={value} onChange={onChange}>
      {({ onImageUpload, onImageUpdate }) => (
        <Button
          variant="primary"
          onClick={value ? onImageUpload : () => onImageUpdate(0)}
        >
          Upload Image
        </Button>
      )}
    </ImageUploading>
  );
};

export default ImageUploadButton;
