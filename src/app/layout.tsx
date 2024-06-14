import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { IconHome, IconUser } from "@tabler/icons-react";
import { Toaster } from "react-hot-toast";
import { WavyBackground } from "@/components/ui/wavy-background";
import AuthProvider from "@/context/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Auth App",
	description: "Auth App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const navItems = [
		{
			name: "Home",
			link: "/home",
			icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
		{
			name: "Sign Up",
			link: "/signup",
			icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
	];

	return (
		<html lang="en" className="dark">
			<AuthProvider>
				<body className={inter.className}>
					<Toaster position="bottom-right" reverseOrder={false} />
					<div className="min-h-screen w-full rounded-md bg-black relative flex flex-col items-center justify-center antialiased">
						<WavyBackground blur={10}>
							<FloatingNav navItems={navItems} className="fixed top-2" />
							{children}
							{/* <BackgroundBeams className="bg-neutral-600 dark:bg-black/5" /> */}
						</WavyBackground>
					</div>
				</body>
			</AuthProvider>
		</html>
	);
}
