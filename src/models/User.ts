import { Schema, model, Document } from "mongoose";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

interface IUser extends Document {
    name: string;
    email: string;
    emailVerified?: Date;
    image?: string;
    role: UserRole;
    favoriteAlbums: Schema.Types.ObjectId[]; // References Album[]
    createdAt: Date;
    updatedAt: Date;
    password?: string;
    accounts?: Schema.Types.ObjectId[];
    sessions?: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        emailVerified: { type: Date },
        image: { type: String },
        role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
        favoriteAlbums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
        password: { type: String, select: false },
        accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
        sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
    },
    { timestamps: true }
);

// Indexes (for faster queries)
userSchema.index({ email: 1 }, { unique: true, collation: { locale: "en", strength: 2 } }); // Case-insensitive
userSchema.index({ role: 1 });

export const User = model<IUser>("User", userSchema);
