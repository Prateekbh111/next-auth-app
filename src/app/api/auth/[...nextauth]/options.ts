import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { connectDb } from "@/database/db.config";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			async authorize(credentials: any): Promise<any> {
				await connectDb();
				try {
					const { email, password } = credentials;
					const user = await User.findOne({
						email,
					});
					if (!user) {
						return null;
					}
					const isPasswordCorrect = await bcrypt.compare(
						password,
						user.password,
					);

					if (isPasswordCorrect) {
						return user;
					} else {
						return null;
					}
				} catch (error: any) {
					return null;
				}
			},
			credentials: {
				email: {
					label: "Email",
					type: "text ",
					placeholder: "johndoe69@gmail.com",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id?.toString();
				token.username = user.username;
				token.isVerified = user.isVerified;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.username = token.username;
				session.user.isVerified = token.isVerified;
				session.user.isAdmin = token.isAdmin;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
