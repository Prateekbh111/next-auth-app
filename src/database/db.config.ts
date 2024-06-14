import mongoose from "mongoose";

export async function connectDb() {
	try {
		await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
		const connection = mongoose.connection;
		connection.on("connected", () => {
			console.log("Connected to MongoDB");
		});

		connection.on("error", (err) => {
			console.log(
				"Mongodb connection error, please make sure db is up and running" + err
			);
			process.exit();
		});
	} catch (error) {
		console.log("Error connecting to MongoDB", error);
	}
}
