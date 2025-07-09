import { z } from "zod"

export const createRewardValidation = z
  .object({
    label: z
      .string({
        required_error: "Reward name is required",
        invalid_type_error: "Reward name  must be a string",
      })
      .min(2, "Reward name is too short")
      .max(50, "Reward name max. length is 50"),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .min(10, "Price must be at least 10"),
    imageUrl: z
      .string({
        required_error: "Image URL is required",
        invalid_type_error: "Image URL must be a string",
      })
      .url("Image URL must be a valid URL"),
    tab: z.union(
      [z.literal("cheap"), z.literal("expensive"), z.literal("luxury")],
      { required_error: "Tab is required" },
    ),
  })
  .strict({
    message: "Object contains incorrect keys",
  })

export const updateRewardValidation = createRewardValidation.extend({
  location: z.enum(["store", "purchased"], {
    required_error: "Location is required",
  }),
})
