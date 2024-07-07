// Modules
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Confetti from "react-confetti";

const PageCheckout = () => {
  const [searchParams] = useSearchParams();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  // Check for Payment Results
  const success = searchParams.get("success") === "1";
  const cancel = searchParams.get("cancel") === "1";

  return (
    <>
      {success && (
        <Confetti
          width={width}
          recycle={false}
          height={height}
          gravity={0.2}
          numberOfPieces={200}
        />
      )}
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 offset-lg-4 text-center">
            <h1>
              <i className="bi bi-cart-plus-fill"></i> Checkout
            </h1>
            {success && (
              <Alert variant="success">
                <Alert.Heading>Purchase Successful</Alert.Heading>
                You now own the item!
              </Alert>
            )}
            {cancel && (
              <Alert variant="warning">
                <Alert.Heading>Purchase Canceled</Alert.Heading>
                The checkout process was not completed
              </Alert>
            )}
            <Button
              variant="primary"
              onClick={() => {
                window.location.href =
                  import.meta.env.VITE_API_URL +
                  "/v0/payments/checkout/onetime";
              }}
            >
              Go to Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageCheckout;
