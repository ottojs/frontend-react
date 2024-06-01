// Modules
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import Button from "react-bootstrap/Button";
import blobFromImageDataUri from "../lib/blobFromImageDataUri";
import useFileUpload from "../hooks/useFileUpload.ts";
import WebcamCapture from "./WebcamCapture";
import ImageUploadButton from "./ImageUploadButton";
import Avatar from "./Avatar";
import AvatarCrop from "./AvatarCrop";
import { DataUser } from "../types.ts";

interface Props {
  user: DataUser;
  onImage: (url: string | null) => void;
}
const ComponentAvatarEditor = ({ user, onImage }: Props) => {
  const [processingImage, setProcessingImage] = useState<string | null>(null);
  const [capturingImage, setCapturingImage] = useState<boolean>(false);

  const onImageSubmit = async (imagedatauri: string) => {
    const imginfo = blobFromImageDataUri(imagedatauri);
    // TODO
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { filename } = await useFileUpload(imginfo.extension, imginfo.blob);
    onImage(filename);
  };
  return (
    <>
      <div>
        <Avatar
          name_first={user.name_first}
          name_last={user.name_last}
          color={user.color}
          picture_prefix={import.meta.env.VITE_CDN_URL + "/content/image/"}
          picture={user.picture}
        />
      </div>
      <div>
        {user.picture && (
          <Button
            variant="secondary"
            onClick={() => {
              onImage(null);
            }}
          >
            Remove Image
          </Button>
        )}
        {!user.picture && !processingImage && (
          <>
            <WebcamCapture
              onImage={(url: string | null) => {
                setProcessingImage(url);
              }}
              onCapturing={(tf: boolean) => {
                setCapturingImage(tf);
              }}
            />{" "}
            {!capturingImage && (
              <ImageUploadButton
                value={[]}
                onChange={(images: ImageListType) => {
                  if (images && images.length > 0 && images[0].dataURL) {
                    setProcessingImage(images[0].dataURL);
                  }
                }}
              />
            )}
          </>
        )}
        {!user.picture && processingImage && (
          <>
            <h3>Crop</h3>
            <AvatarCrop
              image={processingImage}
              onCropped={(imagePromise: Promise<string>) => {
                imagePromise.then((image) => {
                  {
                    /* image={image.length > 0 && image[0].dataURL} */
                  }
                  onImageSubmit(image);
                  setProcessingImage(null);
                });
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ComponentAvatarEditor;
