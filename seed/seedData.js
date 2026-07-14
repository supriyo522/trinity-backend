import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Promo from "../models/Promo.js";
import Admin from "../models/Admin.js";

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await Hotel.deleteMany();
    await Room.deleteMany();
    await Promo.deleteMany();
    await Admin.deleteMany();

    const hotel = await Hotel.create({
      name: "Trinity Suites Bangalore",
      slug: "trinity-suites-bangalore",
      tagline: "Boutique Serviced Suites",
      address: "1/3, Bangalore, Karnataka, India",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      description:
        "A boutique serviced suites property in the heart of Bangalore offering comfort, convenience and warm hospitality for business and leisure travelers.",
      photos: [],
      facilities: [
        "Banquet",
        "Complimentary Breakfast",
        "Front Desk",
        "Internet",
        "Laundry",
        "Travel Desk",
      ],
      location: { lat: 12.9716, lng: 77.5946 },
    });

    await Room.create([
      {
        hotel: hotel._id,
        roomType: "Deluxe Suite",
        description: "Spacious suite with city view, king bed and kitchenette.",
        basePricePerNight: 4500,
        maxOccupancy: 2,
        totalRooms: 8,
        amenities: ["Free WiFi", "Air Conditioning", "Kitchenette", "Flat-screen TV"],
      },
      {
        hotel: hotel._id,
        roomType: "Executive Suite",
        description: "Premium suite with separate living area, ideal for extended stays.",
        basePricePerNight: 6500,
        maxOccupancy: 3,
        totalRooms: 5,
        amenities: ["Free WiFi", "Air Conditioning", "Living Area", "Work Desk"],
      },
    ]);

    await Promo.create([
      { code: "WELCOME10", discountType: "percentage", discountValue: 10, active: true },
      { code: "FLAT500", discountType: "flat", discountValue: 500, active: true },
    ]);

    await Admin.create({
      name: "Super Admin",
      email: "admin@trinitysuites.com",
      password: "Admin@123",
    });

    console.log("Seed data inserted successfully.");
    console.log("Admin login -> email: admin@trinitysuites.com | password: Admin@123");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
