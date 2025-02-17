// models/Comment.ts
import { Schema, model, Document } from "mongoose";

interface IComment extends Document {
    content: string;
    image: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    parentComment?: Schema.Types.ObjectId; // For nested replies
    likes: number; // Simple count (optional)
    createdAt: Date;
    updatedAt: Date;
    // Soft delete
    isDeleted: boolean;
}

const commentSchema = new Schema<IComment>(
    {
        content: { type: String, required: true, trim: true, maxlength: 500 },
        image: { type: Schema.Types.ObjectId, ref: "Image", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
        likes: { type: Number, default: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// For fetching comments on an image efficiently
commentSchema.index({ image: 1, createdAt: -1 });

// For nested comment threading
commentSchema.index({ parentComment: 1 });

export const Comment = model<IComment>("Comment", commentSchema);
