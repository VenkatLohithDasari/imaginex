import { Schema, model, Document } from "mongoose";

export enum ImageStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED",
}

interface IImage extends Document {
    title: string;
    description?: string;
    imageUrl: string; // Cloudflare R2 URL
    altText?: string;
    album: Schema.Types.ObjectId; // Parent album
    uploader: Schema.Types.ObjectId; // Admin User
    status: ImageStatus;
    views: number;
    likes: Schema.Types.ObjectId[]; // Users who liked this image
    width: number;
    height: number;
    fileSize: number;
    mimeType: string;
    createdAt: Date;
    updatedAt: Date;
}

const imageSchema = new Schema<IImage>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String },
        imageUrl: { type: String, required: true },
        altText: { type: String },
        album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
        uploader: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: Object.values(ImageStatus), default: ImageStatus.ACTIVE },
        views: { type: Number, default: 0 },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        width: { type: Number }, // For image optimization
        height: { type: Number },
        fileSize: { type: Number },
        mimeType: { type: String },
    },
    { timestamps: true }
);

// Optimize queries for albums and status
imageSchema.index({ album: 1, status: 1 });
imageSchema.index({ uploader: 1 }); // Admin dashboard queries

// Text search capabilities (title/description)
imageSchema.index({ title: "text", description: "text" });

export const Image = model<IImage>("Image", imageSchema);
