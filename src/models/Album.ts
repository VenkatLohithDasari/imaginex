import { Schema, model, Document } from "mongoose";

export interface IAlbum extends Document {
    title: string;
    description?: string;
    coverImage?: string;
    images: Schema.Types.ObjectId[];
    createdBy: Schema.Types.ObjectId;
    slug: string;
    isPublic: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    // Soft delete support
    isDeleted: boolean;
}

const albumSchema = new Schema<IAlbum>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String },
        coverImage: { type: String },
        images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        slug: { type: String, required: true, unique: true },
        isPublic: { type: Boolean, default: true },
        views: { type: Number, default: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Indexes
albumSchema.index({ slug: 1 }); // For /album/[slug] queries
albumSchema.index({ createdBy: 1, isPublic: 1, isDeleted: 1 });

export const Album = model<IAlbum>("Album", albumSchema);
