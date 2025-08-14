import z from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatuses = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { error: "Description must be at least 3 characters long" }),
  fileKey: z
    .string()
    .min(1, { error: "File key must be at least 1 character long" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1" })
    .max(500, { message: "Duration must be at most 500" }),
  level: z.enum(courseLevels, { error: "level is required" }),
  category: z.enum(courseCategories, { error: "category is required" }),
  smallDescription: z
    .string()
    .min(3, { error: "Small description must be at least 3 characters long" })
    .max(200, {
      error: "Small description must be at most 200 characters long",
    }),
  slug: z.string().min(3, { error: "Slug must be at least 3 characters long" }),
  status: z.enum(courseStatuses, { error: "status is required" }),
});

export type CourseSchemeType = z.infer<typeof courseSchema>;
