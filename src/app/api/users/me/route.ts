import { connectDb } from "@/database/db.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/dataFromToken";

connectDb();

export async function POST(req: NextRequest) {
	const userId = await getDataFromToken(req);
	const user = await User.findOne({ _id: userId }).select("-password");

	if (!user) {
		return NextResponse.json({ message: "No user found" }, { status: 401 });
	}

	return NextResponse.json(
		{ message: "User found", data: user },
		{ status: 200 }
	);
}
