// Modules
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { userService } from "../services/apiClient";
import { DataUserReq } from "../types";

// Form Schema with zod
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
  code: z
    .string()
    .trim()
    .min(1, { message: "code must be at least 1 character" })
    .max(16, { message: "code must be fewer than 16 characters" }),
});
type FormData = z.infer<typeof schema>;

const PageRegister = () => {
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }, // isValid
    reset,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  const submitRegister = (data: FieldValues) => {
    setError("");
    const { request } = userService.create<DataUserReq>({
      username: data.username,
      password: data.password,
      code: data.code,
    });
    request
      .then(() => {
        setRegisterSuccess(true);
        reset();
      })
      .catch(() => {
        setError("Invalid email, password, or code");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-4 offset-lg-4 text-center">
          <h1 className="mt-3 mb-3">
            <i className="bi bi-person-plus-fill"></i> Register
          </h1>
          {error && error.length > 0 ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {error}
            </Alert>
          ) : (
            ""
          )}
          {registerSuccess ? (
            <Alert variant="success">
              <Alert.Heading>All Good!</Alert.Heading>
              You are successfully registered. Head on over to the Login page.
            </Alert>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmit(submitRegister)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                {...register("username")}
                id="email"
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
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <input
                {...register("code")}
                id="code"
                type="text"
                className="form-control"
              />
              {errors.code && (
                <p className="text-danger">{errors.code.message}</p>
              )}
            </div>
            <div>
              {/*
              <Button disabled={!isValid}>
              {isValid ? "Register" : "Not Valid Please Fix"}
            */}
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
