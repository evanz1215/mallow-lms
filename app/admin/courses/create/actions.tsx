"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemeType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: 60, // 1 minute
      max: 5, // max 5 requests per minute
    })
  );

export async function CreateCourse(
  values: CourseSchemeType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    // Access request data that Arcjet needs when you call `protect()` similarly
    // to `await headers()` and `await cookies()` in `next/headers`
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to rate limiting",
        };
      } else {
        return {
          status: "error",
          message: "You are bot! if this is a mistake, contact support.",
        };
      }
    }

    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: " Invalid form data",
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id || "",
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log("Error creating course:", error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
