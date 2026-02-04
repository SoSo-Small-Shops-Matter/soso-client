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
  operatingHours: z.array(SubmissionShopOperatingHourSchema).optional(),
  productMappings: z.array(SubmissionShopProductMappingSchema).optional(),
});

export const NewShopSubmissionSchema = z.object({
  id: z.number(),
  type: SubmissionTypeSchema,
  status: SubmissionStatusSchema,
  rejectMessage: z.string().nullable(),
  createdAt: z.string(),
  shop: SubmissionShopSchema.nullable(),
  user: SubmissionUserSchema,
});

export const NewProductSubmissionSchema = z.object({
  id: z.number(),
  type: SubmissionTypeSchema,
  status: SubmissionStatusSchema,
  rejectMessage: z.string().nullable(),
  createdAt: z.string(),
  shop: SubmissionShopSchema.nullable(),
  shopProducts: z.array(SubmissionShopProductMappingSchema),
  user: SubmissionUserSchema,
});

export const NewOperatingSubmissionSchema = z.object({
  id: z.number(),
  type: SubmissionTypeSchema,
  status: SubmissionStatusSchema,
  rejectMessage: z.string().nullable(),
  createdAt: z.string(),
  shop: SubmissionShopSchema.nullable(),
  shopOperatingHour: SubmissionShopOperatingHourSchema,
  user: SubmissionUserSchema,
});

export const GetAllSubmissionsResponseSchema = z.object({
  newShopSubmissions: z.array(NewShopSubmissionSchema),
  newProductSubmissions: z.array(NewProductSubmissionSchema),
  newOperatingSubmissions: z.array(NewOperatingSubmissionSchema),
});

export const RejectSubmissionRequestSchema = z.object({
  rejectMessage: z.string().optional(),
});

export type SubmissionType = z.infer<typeof SubmissionTypeSchema>;
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;
export type NewShopSubmission = z.infer<typeof NewShopSubmissionSchema>;
export type NewProductSubmission = z.infer<typeof NewProductSubmissionSchema>;
export type NewOperatingSubmission = z.infer<typeof NewOperatingSubmissionSchema>;
export type AllSubmission = NewShopSubmission | NewProductSubmission | NewOperatingSubmission;
export type GetAllSubmissionsResponse = z.infer<typeof GetAllSubmissionsResponseSchema>;
export type RejectSubmissionRequest = z.infer<typeof RejectSubmissionRequestSchema>;
