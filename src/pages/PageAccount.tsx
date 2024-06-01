// Modules
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import useAppContext from "../services/AppContext";
import { accountService } from "../services/apiClient";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "name must be at least 2 characters" })
    .max(40, { message: "name must be fewer than 40 characters" }),
});
type FormData = z.infer<typeof schema>;

const PageAccount = () => {
  const appcontext = useAppContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  // Load Account Information
  useEffect(() => {
    console.log(appcontext.sessionData);
    if (appcontext.sessionData) {
      reset(appcontext.sessionData.accounts[0]);
    }
  }, [appcontext.sessionData, reset]);

  // Save Account
  const submitAccount = (data: FieldValues) => {
    if (!appcontext.sessionData) {
      setError("There was an issue loading account data");
      return;
    }
    appcontext.sessionData.accounts[0].name = data.name;
    const { request } = accountService.patch(
      appcontext.sessionData.accounts[0],
    );
    request
      .then((res) => {
        setSuccess("Your account information was saved");
        reset(res.data.data.account);
        appcontext.setRefreshSession(true);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  };

  const formSubmitButton = (): string => {
    if (!isDirty) return "No Changes";
    if (!isValid) return "Not Valid Yet";
    return "Save Account Info";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-4 offset-lg-4 text-center">
          <h1>
            <i className="bi bi-briefcase"></i> Account
          </h1>
          <p>
            Use this area to update business information.
            <br />
            If you're looking to show some personality, head to the{" "}
            <Link to="/profile">Profile</Link> page.
          </p>
          {error && (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <Alert.Heading>Saved!</Alert.Heading>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit(submitAccount)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Account Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="form-control"
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
            <div className="text-center">
              {/*
              <Button disabled={!isValid}>
              {isValid ? "Save Account Info" : "Not Valid Please Fix"}
            */}
              <Button
                variant="primary"
                disabled={!isValid || !isDirty}
                type="submit"
              >
                {formSubmitButton()}
              </Button>
            </div>
          </form>
          <hr />
          <h2>Purchases</h2>
          <p>
            This is an early preview so purchases aren't available yet.
            <br />
            Enjoy the preview!
          </p>
          <hr />
          <h2>Payment Information</h2>
          <p>This is an early preview so payment information is not needed.</p>
        </div>
      </div>
    </div>
  );
};

export default PageAccount;
