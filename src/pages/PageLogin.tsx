// Modules
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import useAppContext from "../services/AppContext";
import { sessionService } from "../services/apiClient";
import { DataSessionReq } from "../types";

const schema = z.object({
  username: z
    .string()
    .trim()
    .email()
    .min(5, { message: "email must be at least 5 characters" })
    .max(80, { message: "email must be fewer than 80 characters" }),
  password: z
    .string()
    // No Trim
    .min(8, { message: "password must be at least 8 characters" })
    .max(80, { message: "password must be fewer than 80 characters" }),
});
type FormData = z.infer<typeof schema>;

const PageLogin = () => {
  const appcontext = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Redirect on Login, if "next" is specified
  const readNextDestination = () => {
    let destination = "/";
    const paramNext = searchParams.get("next");
    const paramQuery = searchParams.get("query");
    if (paramNext && paramNext !== "") {
      destination = decodeURIComponent(paramNext);
    }
    if (paramQuery && paramQuery !== "") {
      destination += "?" + decodeURIComponent(paramQuery);
    }
    return destination;
  };

  const {
    register,
    handleSubmit,
    formState: { errors }, // isValid
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submitLogin = (data: FieldValues) => {
    setError("");
    const { request } = sessionService.create<DataSessionReq>({
      username: data.username,
      password: data.password,
    });
    request
      .then((res) => {
        appcontext.setSessionData(res.data.data);
        navigate(readNextDestination());
      })
      .catch(() => {
        setError("Incorrect username or password");
        appcontext.setSessionData(false);
      });
  };

  return (
    //onSubmit={outside}
    <div className="container">
      <div className="row">
        <div className="col col-lg-4 offset-lg-4 text-center">
          <h1 className="mt-3 mb-3">
            <i className="bi bi-key-fill"></i> Login
          </h1>
          {error && error.length > 0 && (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit(submitLogin)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                {...register("username")}
                id="username"
                type="email"
                className="form-control"
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className="form-control"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div>
              {/*
              <Button disabled={!isValid}>
              {isValid ? "Login" : "Not Valid Please Fix"}
            */}
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
