import { NextResponse } from "next/server";
import { client } from "@repo/db/client";

import { checkAuth }
from "@/app/utils/auth";

// GET ORDERS
export async function GET() {

  try {

    const user: any =
      await checkAuth();

    // NOT LOGIN
    if (!user) {
      return NextResponse.json([]);
    }

    // FETCH ORDERS
    const orders =
      await client.db.order.findMany({

        where: {
          userId: user.id,
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

    const user: any =
      await checkAuth();

    // NOT LOGIN
    if (!user) {

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

    const {
      cart,
      totalPrice,
    } = await req.json();

    // CREATE ORDER
    const order =
      await client.db.order.create({

        data: {

          totalPrice,

          user: {

            connect: {
              id: user.id,
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