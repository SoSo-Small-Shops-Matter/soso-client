import { z } from "zod";

export const SubmissionTypeSchema = z.enum(["new_shop", "new_product", "new_operating"]);
export const SubmissionStatusSchema = z.enum(["pending", "approved", "rejected"]);

export const SubmissionUserSchema = z.object({
  uuid: z.string(),
  email: z.string(),
  profileImg: z.string().nullable(),
  nickName: z.string(),
  lastActivityAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SubmissionProductSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const SubmissionShopProductMappingSchema = z.object({
  id: z.number(),
  isVerified: z.coerce.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  product: SubmissionProductSchema,
});

export const SubmissionShopOperatingHourSchema = z.object({
  id: z.number(),
  isVerified: z.coerce.boolean(),
  phoneNumber: z.string().nullable(),
  daysOfWeek: z.array(z.string()).nullable(),
  startTime: z.string(),
  endTime: z.string(),
});

export const SubmissionShopSchema = z.object({
  id: z.number(),
  name: z.string(),
  mainImage: z.string().nullable(),
  isVerified: z.coerce.boolean(),
  instagram: z.string().nullable(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  location: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const NewShopSubmissionSchema = z.object({
  id: z.number(),
  type: z.literal("new_shop"),
  status: SubmissionStatusSchema,
  rejectMessage: z.string().nullable(),
  createdAt: z.string(),
  shop: SubmissionShopSchema.nullable(),
  shopProducts: z.array(SubmissionProductSchema),
  shopOperatingHour: SubmissionShopOperatingHourSchema.nullable(),
  user: SubmissionUserSchema,
});

export const NewProductSubmissionSchema = z.object({
  id: z.number(),
  type: z.literal("new_product"),
  status: SubmissionStatusSchema,
  rejectMessage: z.string().nullable(),
  createdAt: z.string(),
  shop: SubmissionShopSchema.nullable(),
  shopProducts: z.array(SubmissionProductSchema),
  newShopProducts: z.array(SubmissionProductSchema),
  user: SubmissionUserSchema,
});

export const NewOperatingSubmissionSchema = z.object({
  id: z.number(),
  type: z.literal("new_operating"),
  status: SubmissionStatusSchema,
  rejectMessage: z.string().nullable(),
  createdAt: z.string(),
  shop: SubmissionShopSchema.nullable(),
  shopOperatingHour: SubmissionShopOperatingHourSchema,
  newShopOperatingHour: SubmissionShopOperatingHourSchema,
  user: SubmissionUserSchema,
});

export const NewShopSubmissionsResponseSchema = z.array(NewShopSubmissionSchema);
export const NewProductSubmissionsResponseSchema = z.array(NewProductSubmissionSchema);
export const NewOperatingSubmissionsResponseSchema = z.array(NewOperatingSubmissionSchema);

export const RejectSubmissionRequestSchema = z.object({
  rejectMessage: z.string().optional(),
});

export type SubmissionType = z.infer<typeof SubmissionTypeSchema>;
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;
export type NewShopSubmission = z.infer<typeof NewShopSubmissionSchema>;
export type NewProductSubmission = z.infer<typeof NewProductSubmissionSchema>;
export type NewOperatingSubmission = z.infer<typeof NewOperatingSubmissionSchema>;
export type AllSubmission = NewShopSubmission | NewProductSubmission | NewOperatingSubmission;
export type NewShopSubmissionsResponse = z.infer<typeof NewShopSubmissionsResponseSchema>;
export type NewProductSubmissionsResponse = z.infer<typeof NewProductSubmissionsResponseSchema>;
export type NewOperatingSubmissionsResponse = z.infer<typeof NewOperatingSubmissionsResponseSchema>;
export type RejectSubmissionRequest = z.infer<typeof RejectSubmissionRequestSchema>;
