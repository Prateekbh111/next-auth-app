import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		_id?: String;
		username?: String;
		isVerified?: Boolean;
		isAdmin?: Boolean;
	}
	interface Session {
		user: {
			_id?: String;
			username?: String;
			isVerified?: Boolean;
			isAdmin?: Boolean;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		_id?: String;
		username?: String;
		isVerified?: Boolean;
		isAdmin?: Boolean;
	}
}
