import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, default: "" },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, default: "" },
    photos: [{ type: String }],
    facilities: [{ type: String }], // e.g. Banquet, Complimentary Breakfast, Front Desk, Internet, Laundry, Travel Desk
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
