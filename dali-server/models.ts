import { Point } from "geojson";
import { Types } from "mongoose";

export interface IPath {
	_id?: Types.ObjectId;
    workspaceId: string;
	name: string;
    createdBy: string
	createdAt: Date;
	updatedAt: Date;
	isDeleted?: boolean;
}

export interface IPoint {
	_id?: Types.ObjectId;
	pathId: Types.ObjectId;
	description: string;
	geography: Point;
    timestamp: Date;
	createdAt: Date;
	updatedAt: Date;
	isDeleted?: boolean;
	isTOKSynced?: boolean;
}
