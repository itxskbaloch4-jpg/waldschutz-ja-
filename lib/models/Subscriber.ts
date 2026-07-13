import { Schema, model, models } from "mongoose";

export interface ISubscriber {
  firstName: string;
  lastName: string;
  email: string;
  locale: string;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    locale: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Subscriber || model<ISubscriber>("Subscriber", SubscriberSchema);
