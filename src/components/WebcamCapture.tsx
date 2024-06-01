import { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";

const getCameraPermission = async () => {
  if ("MediaRecorder" in window) {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
    } catch (err) {
      // TODO: Handle Somehow
      //alert(err.message);
    }
  } else {
    alert("The MediaRecorder API is not supported in your browser.");
  }
};

interface Props {
  onImage: (url: string | null) => void;
  onCapturing: (tf: boolean) => void;
}
const ComponentCameraCapture = ({ onImage, onCapturing }: Props) => {
  const cameraRef = useRef<Webcam>(null);
  const [mirrored, setMirrored] = useState(false);
  const [havePermission, setHavePermission] = useState(false);

  const getCameraImage = useCallback(() => {
    if (cameraRef && cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      onImage(imageSrc);
    }
    onCapturing(false);
  }, [cameraRef, onImage, onCapturing]);

  // Ask for permission
  if (!havePermission) {
    return (
      <Button
        variant="primary"
        onClick={async () => {
          await getCameraPermission();
          setHavePermission(true);
          onCapturing(true);
        }}
      >
        Use Camera
      </Button>
    );
  }

  // Show Webcam
  return (
    <div className="text-center">
      <div>
        <Webcam
          height={300}
          width={300}
          ref={cameraRef}
          mirrored={mirrored}
          screenshotFormat="image/webp"
          screenshotQuality={1}
        />
      </div>
      <div>
        <input
          id="cameraflip"
          type="checkbox"
          checked={mirrored}
          onChange={(e) => setMirrored(e.target.checked)}
        />{" "}
        <label htmlFor="cameraflip">Mirror/Flip</label>
        <div className="btn-container m-3">
          <Button variant="primary" onClick={getCameraImage}>
            Take Picture
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComponentCameraCapture;
