// Modules
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Confetti from "react-confetti";
import { vanilla } from "../services/apiClient";
import useAppContext from "../services/AppContext";

const PageCheckout = () => {
  const [searchParams] = useSearchParams();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const appcontext = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  }, []);

  // Mark as Page Viewed
  useEffect(() => {
    console.log("CONTEXT ANALYTICS", appcontext.analytics);
    vanilla
      .post("/v0/analytics/events", {
        session_id: appcontext.analytics,
        name: "page_view",
        data: {
          page: "checkout",
        },
      })
      .then(() => {});
  }, [appcontext.analytics]);

  // Check for Payment Results
  const success = searchParams.get("success") === "1";
  const cancel = searchParams.get("cancel") === "1";

  const [oneTimeLoading, setOneTimeLoading] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

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
              disabled={oneTimeLoading}
              onClick={() => {
                setOneTimeLoading(true);
                const request = vanilla.post("/v0/payments", {
                  session_id: appcontext.analytics,
                  type: "one-time",
                  path_success: "/checkout?success=1",
                  path_cancel: "/checkout?cancel=1",
                  //email: "user@example.com",
                });
                request
                  .then((res) => {
                    // Redirect
                    window.location.href = res.data.data.url;
                  })
                  .catch(() => {
                    setOneTimeLoading(false);
                  });
              }}
            >
              {oneTimeLoading ? "Loading..." : "One-Time Purchase"}
            </Button>{" "}
            <Button
              variant="secondary"
              disabled={subscriptionLoading}
              onClick={() => {
                setSubscriptionLoading(true);
                const request = vanilla.post("/v0/payments", {
                  session_id: appcontext.analytics,
                  type: "subscription",
                  path_success: "/checkout?success=1",
                  path_cancel: "/checkout?cancel=1",
                  email: "user@example.com",
                });
                request
                  .then((res) => {
                    // Redirect
                    window.location.href = res.data.data.url;
                  })
                  .catch(() => {
                    setSubscriptionLoading(false);
                  });
              }}
            >
              {subscriptionLoading ? "Loading..." : "Subscription Purchase"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageCheckout;
