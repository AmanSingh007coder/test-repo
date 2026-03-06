import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
  name?: string
  email?: string
  password?: string
  image?: string
  githubId?: string
  githubUsername: string
  githubAccessToken?: string
  connectedRepos: string[]
  isVerified: boolean           // must verify GitHub ownership before login works
  verificationCode?: string     // the code we ask them to post in a Gist
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true, sparse: true },
    password: { type: String, required: false },
    image: { type: String, required: false },
    githubId: { type: String, required: false, unique: true, sparse: true },
    githubUsername: { type: String, required: true, unique: true },
    githubAccessToken: { type: String, required: false },
    connectedRepos: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
  },
  { timestamps: true }
)

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User