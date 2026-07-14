import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomType: { type: String, required: true }, // e.g. Deluxe Suite
    description: { type: String, default: "" },
    basePricePerNight: { type: Number, required: true },
    maxOccupancy: { type: Number, default: 2 },
    totalRooms: { type: Number, default: 5 },
    amenities: [{ type: String }],
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
