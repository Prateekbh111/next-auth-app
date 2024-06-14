import { connectDb } from "@/database/db.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token } = reqBody;
		console.log(token);

		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json({ error: "Invalid token details" }, { status: 400 });
		}
		console.log(user);

		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
		await user.save();

		return NextResponse.json(
			{ message: "Email verified successfully", success: true },
			{ status: 200 }
		);
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
