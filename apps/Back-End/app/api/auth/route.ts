import { NextResponse } from "next/server";
import { store } from "@repo/db/store";
import { signToken } from "../../../utils/auth";
import { email as emailField, password as passwordField, readJson, ValidationError } from "../../../utils/validate";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);

    // strings only — blocks operator injection like {"password": {"not": "x"}}
    const email = emailField(body.email);
    const password = passwordField(body.password);

    const user = await store.users.login(email, password);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signToken({ id: user.id, role: user.role });

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  return NextResponse.json({ message: "Logout successful" });
}
