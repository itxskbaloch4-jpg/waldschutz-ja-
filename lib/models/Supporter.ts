import { Schema, model, models } from "mongoose";

export interface ISupporter {
  name: string;
  firstName: string;
  role?: string;
  organisation?: string;
  email: string;
  address: string;
  zip: string;
  city: string;
  canton: string;
  remarks?: string;
  wantsPaymentSlip?: boolean;
  wantsCommittee?: boolean;
  wantsNewsletter?: boolean;
}

const SupporterSchema = new Schema<ISupporter>(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    role: String,
    organisation: String,
    email: { type: String, required: true, lowercase: true, trim: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    canton: { type: String, required: true },
    remarks: String,
    wantsPaymentSlip: { type: Boolean, default: false },
    wantsCommittee: { type: Boolean, default: false },
    wantsNewsletter: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Supporter || model<ISupporter>("Supporter", SupporterSchema);
