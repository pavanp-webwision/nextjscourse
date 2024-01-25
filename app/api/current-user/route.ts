// /pages/api/current-user.ts
import { NextResponse, NextRequest } from "next/server";
import strapiApiClient from "@/services/strapiApiClient";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();

  const token = cookieStore.get("jwt");

  // console.log("Cookie store", cookieStore);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  // console.log('COOOKIESSSSSSSSSSSs', req.cookies?.get('jwt'))

  try {
    const userResponse = await strapiApiClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${req.cookies?.get('jwt')?.value}`,
      },
    });

    // console.log('USER RESPONSE >>>>>>>>>>..', userResponse)

    if (userResponse.data) {
      return new Response(JSON.stringify(userResponse?.data), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
      }
    );
  }
}
