import { connect } from "mongoose";
import { Path, Point } from "./models";
import { IPath, IPoint } from "../models";

export async function connectToDb(connnectionString: string): Promise<void> {
	try {
		await connect(connnectionString);
	} catch (err: any) {
		console.error("Could not connect to MongoDB", err);// log
		return;
	}

	console.error("Connected to DB");// log
}

export async function upsertPath(path: IPath): Promise<void> {
	const p = new Path(path);
	let isNew: boolean | undefined;

	try {
		const document = await p.save();
		isNew = document.isNew;
	} catch (err: any) {
		// log
	}

	// log
}

export async function getWorkspacePaths(workspaceId: string): Promise<IPath[]> {
	return await Path.find({ workspaceId, isDeleted: false }).sort({ updatedAt: -1 }).limit(100).exec();
}

export async function getPoints(pathId: string): Promise<IPoint[]> {
	return await Point.find({ pathId, isDeleted: false }).sort({ created: -1 }).limit(100).exec();
}

export async function upsertPoint(point: IPoint): Promise<void> {
	const p = new Point(point);
	let isNew: boolean | undefined;

	try {
		const document = await p.save();
		isNew = document.isNew;
	} catch (err: any) {
		// log
	}

	// log
}
