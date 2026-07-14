import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
