import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      username,
      email,
      password,
    } = body;

    // VALIDATION
    if (
      !username ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    // CHECK EXISTING USER
    const existingUser =
      await client.db.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Email already exists",
        },
        {
          status: 409,
        }
      );
    }

    // CREATE USER
    const user =
      await client.db.user.create({
        data: {
          username,
          email,
          password,
          role: "BUYER",
        },
      });

    return NextResponse.json(
      {
        message:
          "User created successfully",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}