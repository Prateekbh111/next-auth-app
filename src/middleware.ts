import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const url = request.nextUrl;
	const isPublicPath =
		url.pathname.startsWith("/login") ||
		url.pathname.startsWith("/signup") ||
		url.pathname.startsWith("/verifyemail");

	if (token && isPublicPath) {
		return NextResponse.redirect(new URL("/home", request.url));
	}
	if (!token && !isPublicPath) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/", "/home", "/login", "/signup", "/verifyemail"],
};
