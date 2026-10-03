import { NextRequest, NextResponse } from "next/server";
import { store, StoreConflictError } from "@repo/db/store";
import { email as emailField, password as passwordField, readJson, str, ValidationError } from "../../../../utils/validate";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await readJson(request);

    // VALIDATION
    const username = str(body.username, "Username", { max: 50 });
    const email = emailField(body.email);
    const password = passwordField(body.password);

    // CHECK EXISTING USER
    const existingUser =
      await store.users.byEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // CREATE USER (role is always BUYER — never taken from the request)
    const user =
      await store.users.create({
        username,
        email,
        password,
        role: "BUYER",
      });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof StoreConflictError) {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 409 }
      );
    }

    console.log(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
