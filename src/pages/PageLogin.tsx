// Modules
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import useAppContext from "../services/AppContext";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submitLogin = (data: FieldValues) => {
    console.log("FORM SUBMITTED", data);
    appcontext.setSessionData({ user: { name_first: "User" } });
  };

  return (
    //onSubmit={outside}
    <div className="row">
      <div className="col col-12 col-lg-4 offset-lg-4">
        <h1 className="mt-3 mb-3 text-center">
          <i className="bi bi-key-fill"></i> Login
        </h1>
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
            <Button variant="primary" disabled={!isValid} type="submit">
              {isValid ? "Login" : "Not Valid Please Fix"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageLogin;
