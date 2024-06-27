// Modules
import { useEffect, useState } from "react";
import { useAudioRecorder } from "@fixhq/react-audio-voice-recorder";
import Button from "react-bootstrap/Button";

const PageRecorder = () => {
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const {
    startRecording,
    stopRecording,
    //togglePauseResume,
    recordingBlob,
    isRecording,
    //isPaused,
    //recordingTime,
    //mediaRecorder,
  } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;
    console.log("RECBLOB");
    setAudioBlob(recordingBlob);
    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-4 offset-lg-4 text-center">
          <h1>
            <i className="bi bi-mic"></i> Audio Recorder
          </h1>
          <div className="m-3">
            <Button
              variant="danger"
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              onTouchCancel={stopRecording}
              onPointerCancel={stopRecording}
            >
              <i className="bi bi-mic"></i> Press and Hold to Record
            </Button>
          </div>
          <div className="m-3">
            {isRecording ? (
              <Button variant="warning" onClick={stopRecording}>
                Stop Button
              </Button>
            ) : (
              <Button variant="danger" onClick={startRecording}>
                Start Button
              </Button>
            )}
          </div>
          <div className="m-3">
            {!isRecording && audioBlob && (
              <audio
                src={URL.createObjectURL(audioBlob)}
                controls={true}
              ></audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageRecorder;
