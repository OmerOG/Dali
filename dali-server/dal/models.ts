import { model, Schema } from "mongoose";
import { IPath, IPoint } from "../models";

const pathSchema = new Schema<IPath>({
    _id: { type: Schema.Types.ObjectId },
    workspaceId: { type: String, required: true}, // should be an array?
	name: { type: String, required: true },
    createdBy: { type: String, required: true },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false }
});

const pointSchema = new Schema<IPoint>({
    _id: { type: Schema.Types.ObjectId },
    pathId: { type: Schema.Types.ObjectId },
	description: { type: String, required: true },
	geography: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: Date, required: true },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
	isDeleted: { type: Boolean, default: false },
	isTOKSynced: { type: Boolean, default: false },
});

export const Path = model<IPath>("Path", pathSchema);
export const Point = model<IPoint>("Point", pointSchema);