import express from "express";
import { createServer } from "http";
import { Path, Types } from "mongoose";
import { Server } from "socket.io";
import { connectToDb, upsertPath, upsertPoint } from "./dal";
import { IPath, IPoint } from "./models";

interface SocketData {
	userId: string;
}

const app = express();
const httpServer = createServer(app);
const io = new Server<any, any, any, SocketData>(httpServer, {
	cors: {
		origin: "http://localhost:5173",
	},
});
const connectedUsersToSocketIds: { [userId: string]: string } = {};

io.use(async (socket, next) => {
	const userId: string = socket.handshake.auth.userId;
	console.log(connectedUsersToSocketIds[userId]);

	if (!userId) {
		return next(new Error("Invalid user"));
	}

	if (connectedUsersToSocketIds[userId] !== undefined) {
		return next(new Error("User is already connected"));
	}

	connectedUsersToSocketIds[userId] = socket.id;
	console.log(`${userId} connected`);
	next();
});

io.on("connection", socket => {
	const userId = socket.handshake.auth.userId;
	socket.on("path:add", async () => {
		const now = new Date();
		const path: IPath = {
			_id: new Types.ObjectId(),
			name: "test",
			createdBy: userId,
			createdAt: now,
			updatedAt: now,
			workspaceId: "test",
		};
		const point: IPoint = {
            _id: new Types.ObjectId(),
			pathId: path._id!!,
			description: "test desc",
			createdAt: now,
			updatedAt: now,
			geography: { type: "Point", coordinates: [1, 14] },
			timestamp: now,
		};
		try {
			await upsertPath(path);
			await upsertPoint(point);
		} catch (err: any) {
			console.log("FAILED");
		}
		console.log(path);
	});
});

io.on("connect_error", (err: any) => {
	console.error(err);
});

connectToDb("mongodb://127.0.0.1:27017/dali");
httpServer.listen(3000);
console.log("Listening :)");
