// Modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const appcontext = useAppContext();
  const [error, setError] = useState("");

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
        navigate("/");
      })
      .catch(() => {
        setError("Incorrect username or password");
        appcontext.setSessionData(false);
      });
  };

  return (
    //onSubmit={outside}
    <div className="row">
      <div className="col col-12 col-lg-4 offset-lg-4">
        <h1 className="mt-3 mb-3 text-center">
          <i className="bi bi-key-fill"></i> Login
        </h1>
        {error && error.length > 0 ? (
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            {error}
          </Alert>
        ) : (
          ""
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
          <div className="text-center">
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
  );
};

export default PageLogin;
