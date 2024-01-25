// middleware.js

import { useAuth } from "@/contexts/AuthContext";
import { NextResponse, NextRequest } from "next/server";
import authService from "./services/authService";

export default function middleware(req: NextRequest) {

  // console.log(authService)
  // console.log('JWT >>>>>>>>>>>>>>>..', req.headers.get('jwt'))
  let loggedin = req.headers.get("cookie");

  const token = loggedin?.split('=')[1]

  console.log(token)

  const auth = false
  const { pathname } = req.nextUrl;

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
