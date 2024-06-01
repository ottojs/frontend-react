// Modules
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import useAppContext from "../services/AppContext";
import { userService } from "../services/apiClient";
import AvatarEditor from "../components/AvatarEditor";

const schema = z.object({
  name_first: z
    .string()
    .trim()
    .min(1, { message: "first name cannot be blank" })
    .max(40, { message: "first name must be fewer than 40 characters" }),
  name_last: z
    .string()
    .trim()
    .min(1, { message: "last name cannot be blank" })
    .max(40, { message: "last name must be fewer than 40 characters" }),
  color: z.string().min(1).max(7),
  picture: z.string().min(4).max(80).or(z.literal(null)),
});
type FormData = z.infer<typeof schema>;

const PageProfile = () => {
  const appcontext = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    reset,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const onImage = (url: string | null) => {
    setValue("picture", url, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (appcontext.sessionData) {
      reset(appcontext.sessionData.user);
    }
  }, [appcontext.sessionData, reset]);
  useEffect(() => {
    if (appcontext.sessionData) {
      console.log("RESET");
      reset(appcontext.sessionData.user);
    }
  }, [appcontext.sessionData, reset]);

  const submitProfile = (data: FieldValues) => {
    const { request } = userService.patch({ ...data, id: "me" });
    request
      .then((res) => {
        console.log("OK, REFRESH Session", res.data.data);
        appcontext.setRefreshSession(true);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  };
  const formSubmitButton = (): string => {
    if (!isDirty) return "No Changes";
    if (!isValid) return "Not Valid Yet";
    return "Save Profile";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-4 offset-lg-4 text-center">
          <h1>
            <i className="bi bi-person-circle"></i> Profile
          </h1>
          <h2>Avatar</h2>

          <AvatarEditor user={watch()} onImage={onImage} />
          <hr />
          <h2>Information</h2>
          <form onSubmit={handleSubmit(submitProfile)}>
            <div className="mb-3">
              <label htmlFor="name_first" className="form-label">
                First Name
              </label>
              <input
                {...register("name_first")}
                id="name_first"
                type="text"
                className="form-control"
              />
              {errors.name_first && (
                <p className="text-danger">{errors.name_first.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name_last" className="form-label">
                Last Name
              </label>
              <input
                // { valueAsNumber: true }
                {...register("name_last")}
                id="name_last"
                type="text"
                className="form-control"
              />
              {errors.name_last && (
                <p className="text-danger">{errors.name_last.message}</p>
              )}
              <input {...register("color")} id="color" type="hidden" />
              <input {...register("picture")} id="picture" type="hidden" />
            </div>
            <div className="text-center">
              <Button
                variant="primary"
                disabled={!isValid || !isDirty}
                type="submit"
              >
                {formSubmitButton()}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageProfile;
