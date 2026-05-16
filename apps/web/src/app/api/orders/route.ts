import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

import { client } from "@repo/db/client";

const JWT_SECRET =
  process.env.JWT_SECRET || "secret";

// GET ORDERS
export async function GET() {

  try {

    const token =
      (await cookies())
        .get("auth_token")
        ?.value;

    if (!token) {
      return NextResponse.json([]);
    }

    // VERIFY JWT
    const decoded: any =
      jwt.verify(
        token,
        JWT_SECRET
      );

    const orders =
      await client.db.order.findMany({

        where: {
          userId: decoded.id,
        },

        include: {
          items: {
            include: {
              product: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

      });

    return NextResponse.json(
      orders
    );

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(
      [],
      {
        status: 500,
      }
    );

  }

}

// CREATE ORDER
export async function POST(
  req: Request
) {

  try {

    const token =
      (await cookies())
        .get("auth_token")
        ?.value;

    if (!token) {

      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    // VERIFY JWT
    const decoded: any =
      jwt.verify(
        token,
        JWT_SECRET
      );

    const {
      cart,
      totalPrice,
    } = await req.json();

    const order =
      await client.db.order.create({

        data: {

          totalPrice,

          user: {
            connect: {
              id: decoded.id,
            },
          },

          items: {

            create:
              cart.map((item: any) => ({

                productId:
                  Number(item.id),

                quantity:
                  Number(item.quantity),

                size:
                  String(item.selectedSize),

                price:
                  Number(item.price),

              })),

          },

        },

      });

    return NextResponse.json({

      message:
        "Order created",

      order,

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message:
          "Server error",
      },
      {
        status: 500,
      }
    );

  }

}