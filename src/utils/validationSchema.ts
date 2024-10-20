import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 character long" })
    .max(200, { message: "title should be less than 200 character" }),

  description: z
    .string({
      required_error: "Description  is required",
      invalid_type_error: "Description should be of type string",
    })
    .min(7, { message: "Description should be at least 7 character long" })
});
