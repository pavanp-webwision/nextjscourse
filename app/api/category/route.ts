import { NextResponse, NextRequest } from "next/server";
import strapiApiClient from "@/services/strapiApiClient";

export async function GET(req: NextRequest) {
  try {
    const userResponse = await strapiApiClient.get(
      "/categories"
      //  {
      //   headers: {
      //     Authorization: `Bearer ${req.cookies?.get('jwt')?.value}`,
      //   },
      // }
    );

    console.log('USER RESPONSE >>>>>>>>>>..', userResponse)

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
