"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";

export function Login() {
	const router = useRouter();
	const { data: session, status } = useSession();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const user = Object.fromEntries(formData);

		if (user.email === "" || user.password === "") {
			toast.error(<b>Empty Fields</b>, {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			return;
		}
		console.log(user);

		// const promise = axios.post("/api/users/login", user);
		const promise = await signIn("credentials", {
			email: user.email,
			password: user.password,
			redirect: false,
		});
		if (promise?.error) {
			toast.error(<b>Something went wrong</b>, {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			return;
		}

		toast.success(<b>Logged int Successfully</b>, {
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
			},
		});
		router.replace("/home");
	}

	return (
		<div className="max-w-md w-full mx-auto p-4 md:p-8 bg-transparent  z-10">
			<h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200 text-center">
				Log In
			</h2>
			<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
				Please enter your credentials to log in to your account.
			</p>

			<form className="my-8" onSubmit={handleSubmit}>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input
						id="email"
						placeholder="john.doe69@gmail.com"
						type="email"
						name="email"
					/>
				</LabelInputContainer>
				<LabelInputContainer className="mb-8">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						placeholder="••••••••"
						type="password"
						name="password"
					/>
				</LabelInputContainer>

				<button
					className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-800 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
				>
					Log In &rarr;
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};
