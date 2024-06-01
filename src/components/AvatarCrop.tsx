import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import Button from "react-bootstrap/Button";
import FormRange from "react-bootstrap/FormRange";
import { cropImage } from "../lib/cropUtils";
import "./AvatarCrop.css";

interface Props {
  image: string;
  onCropped: (data: Promise<string>) => void;
}
function ComponentAvatarCrop({ image, onCropped }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  return (
    <div className="crop-container">
      <div className="cropper">
        <Cropper
          //image="url"
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          //onCropChange={onCropChange}
          //onCropComplete={onCropComplete}
          //onZoomChange={onZoomChange}
          //
          onCropChange={setCrop}
          // croppedArea
          onCropComplete={(_, croppedAreaPixels) => {
            console.log(croppedAreaPixels.width / croppedAreaPixels.height);
            setCroppedAreaPixels(croppedAreaPixels);
          }}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <FormRange
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(Number(e.target.value));
          }}
        />
      </div>
      <Button
        variant="primary"
        onClick={() => onCropped(cropImage(image, croppedAreaPixels))}
      >
        Use Image
      </Button>
    </div>
  );
}

export default ComponentAvatarCrop;
