// Modules
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "title must be at least 2 characters" })
    .max(50, { message: "title must be fewer than 50 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "description must be at least 1 character" })
    .max(90, { message: "description must be fewer than 90 characters" })
    .optional()
    .or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FieldValues, reset: () => void) => void;
}
const FormTask = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // isValid
    reset,
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data: FieldValues) => {
        onSubmit(data, () => {
          reset();
        });
      })}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          {...register("title")}
          id="title"
          type="text"
          className="form-control"
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          className="form-control"
        ></textarea>
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
};

export default FormTask;
