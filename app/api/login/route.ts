// import { AxiosError } from "@/global-interfaces";
import strapiApiClient from "@/services/strapiApiClient";
// import cookie from "cookie";
// import { NextApiRequest, NextApiResponse } from "next";

// export async function POST(req, res) {
//   if (req.method !== "POST") {
//     return Response.json({ status: 405 });
//   }

//   const { identifier, password } = await req.json();

//   try {
//     const strapiRes = await strapiApiClient.post(`/auth/local`, {
//       identifier,
//       password,
//     });

//     const jwt: string = strapiRes.data.jwt;

//     // Fetch the full user object with the profile image
//     const userResponse = await strapiApiClient.get("/users/me?populate=*", {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });

//     res.setHeader(
//       "Set-Cookie",
//       cookie.serialize("jwt", jwt, {
//         httpOnly: true,
//         // secure: process.env.NODE_ENV !== "development",
//         maxAge: 60 * 60, // 1 year
//         sameSite: "strict",
//         path: "/",
//       })
//     );

//     // Return the full user object
//     res.status(200).json({ user: userResponse.data });
//   } catch (err) {
//     console.error("Error>>>>>>>>>>>>>>>>", err);

//     const error = err as AxiosError;

//     // Check if the error response has the expected format
//     if (error.response?.data?.error?.message) {
//       const errorMessage = error.response.data.error.message;
//       const statusCode = error.response.data.error.status;

//       return Response.json({
//         error: errorMessage,
//       });
//     }

//     return Response.json({
//       error: "An unexpected error occurred.",
//     });
//   }
// }

import { serialize } from "cookie";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60; // hours;

export async function POST(request: Request) {
  const body = await request.json();

  const { identifier, password } = body;

  // if (identifier !== "admin" || password !== "admin") {
  //   return NextResponse.json(
  //     {
  //       message: "Unauthorized",
  //     },
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  // Always check this
  // const secret = process.env.JWT_SECRET || "";

  // const token = sign(
  //   {
  //     identifier,
  //   },
  //   secret,
  //   {
  //     expiresIn: MAX_AGE,
  //   }
  // );

  try {
    const strapiRes = await strapiApiClient.post(`/auth/local`, {
      identifier,
      password,
    });

    const jwt: string = strapiRes.data.jwt;

    const userResponse = await strapiApiClient.get("/users/me?", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const seralized = serialize("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    const response = {
      message: "Authenticated!",
      user: userResponse?.data,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": seralized },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
      }
    );
  }
}
