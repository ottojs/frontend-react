import { useState } from "react";
import Alert from "react-bootstrap/Alert";

function PageHome() {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <div className="col col-lg-6 offset-lg-3 text-center">
      <h1>
        <i className="bi bi-house-door"></i> Home
      </h1>
      {showAlert && (
        <Alert
          variant="warning"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Please Note!</Alert.Heading>
          This is an alert box. Click to dismiss.
        </Alert>
      )}
    </div>
  );
}

export default PageHome;
