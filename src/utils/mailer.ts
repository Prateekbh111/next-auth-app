import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export async function sendEmail({ email, emailType, userId }: any) {
	try {
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 3600000,
				},
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					forgotPasswordToken: hashedToken,
					forgotPasswordExpiry: Date.now() + 3600000,
				},
			});
		}

		var transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "fe5509b1f93618",
				pass: "982d4d5c2ff53a",
			},
		});

		const mailOptions = {
			from: "prateekbh111@gmail.com",
			to: email,
			subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
			html: `<p>Click <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">here</a> to ${
				emailType === "VERIFY" ? "verify your email" : "reset your password"
			} or copy paste the link in the browser <br> ${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}</p>`,
		};

		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (err: any) {
		throw new Error(err.message);
	}
}
