"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function verifyemail() {
	const router = useRouter();
	const [token, setToken] = useState("");

	function verifyUserEmail() {
		axios
			.post("api/users/verifyemail", { token })
			.then((response) => {
				toast.success(<b>Email successfully verified!</b>, {
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
				router.push("/login");
			})
			.catch((error) => {
				toast.error(<b>Not a valid token</b>, {
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
			});
	}

	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	return (
		<div className="max-w-md w-full mx-auto p-4 md:p-8 bg-transparent z-10 space-y-8">
			<div className="space-y-2">
				<h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200 text-center">
					Verify Email
				</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
					Verify your email by pressing the button below
				</p>
			</div>

			<button
				type="button"
				className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-800 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
				onClick={verifyUserEmail}
			>
				Verify
				<BottomGradient />
			</button>
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
