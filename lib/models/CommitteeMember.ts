import { Schema, model, models } from "mongoose";

export interface ICommitteeMember {
  name: string;
  role: string;
  image: string;
  order: number;
}

const CommitteeMemberSchema = new Schema<ICommitteeMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.CommitteeMember || model<ICommitteeMember>("CommitteeMember", CommitteeMemberSchema);
