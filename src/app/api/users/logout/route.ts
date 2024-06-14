import { connectDb } from "@/database/db.config";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(req: NextRequest) {
	try {
		const response = NextResponse.json({
			message: "User logged out",
			success: true,
		});

		response.cookies.set("token", "", {
			httpOnly: true,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 400 }
		);
	}
}
