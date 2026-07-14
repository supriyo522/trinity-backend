import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import Room from "../models/Room.js";
import Promo from "../models/Promo.js";

const TAX_RATE = 0.12; 

const generateBookingRef = () =>
  "BKG-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();


export const getQuote = async (req, res) => {
  const { roomId, checkIn, checkOut, promoCode } = req.body;
  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: "Room not found" });

  const nights = Math.max(
    1,
    Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
  );

  let totalCharges = room.basePricePerNight * nights;
  let discount = 0;

  if (promoCode) {
    const promo = await Promo.findOne({ code: promoCode.toUpperCase(), active: true });
    if (promo && (!promo.expiresAt || promo.expiresAt > new Date())) {
      discount =
        promo.discountType === "percentage"
          ? (totalCharges * promo.discountValue) / 100
          : promo.discountValue;
    }
  }

  const taxableAmount = totalCharges - discount;
  const totalTaxes = Math.round(taxableAmount * TAX_RATE * 100) / 100;
  const grandTotal = Math.round((taxableAmount + totalTaxes) * 100) / 100;

  res.json({ nights, totalCharges, discount, totalTaxes, grandTotal });
};


export const createBooking = async (req, res) => {
  const {
    hotelId,
    roomId,
    checkIn,
    checkOut,
    guests,
    promoCode,
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
  } = req.body;

  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: "Room not found" });

  const nights = Math.max(
    1,
    Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
  );

  let totalCharges = room.basePricePerNight * nights;
  let discount = 0;

  if (promoCode) {
    const promo = await Promo.findOne({ code: promoCode.toUpperCase(), active: true });
    if (promo && (!promo.expiresAt || promo.expiresAt > new Date())) {
      discount =
        promo.discountType === "percentage"
          ? (totalCharges * promo.discountValue) / 100
          : promo.discountValue;
    }
  }

  const taxableAmount = totalCharges - discount;
  const totalTaxes = Math.round(taxableAmount * TAX_RATE * 100) / 100;
  const grandTotal = Math.round((taxableAmount + totalTaxes) * 100) / 100;

  let customer = await Customer.findOne({ email });
  if (!customer) {
    customer = await Customer.create({ firstName, lastName, email, phone, city, country });
  } else {
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.phone = phone;
    customer.city = city;
    customer.country = country;
    await customer.save();
  }

  const booking = await Booking.create({
    bookingRef: generateBookingRef(),
    hotel: hotelId,
    room: roomId,
    customer: customer._id,
    checkIn,
    checkOut,
    nights,
    guests: guests || 1,
    promoCode: promoCode || null,
    totalCharges,
    totalTaxes,
    discount,
    grandTotal,
    paymentStatus: "pending",
  });

  res.status(201).json(booking);
};


export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("hotel")
    .populate("room")
    .populate("customer");
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
};

export const getBookingByRef = async (req, res) => {
  const booking = await Booking.findOne({ bookingRef: req.params.bookingRef })
    .populate("hotel")
    .populate("room")
    .populate("customer");
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
};


export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({})
    .populate("hotel", "name city")
    .populate("room", "roomType")
    .populate("customer", "firstName lastName email phone")
    .sort({ createdAt: -1 });
  res.json(bookings);
};


export const updateBookingStatus = async (req, res) => {
  const { bookingStatus, paymentStatus } = req.body;
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (bookingStatus) booking.bookingStatus = bookingStatus;
  if (paymentStatus) booking.paymentStatus = paymentStatus;
  await booking.save();
  res.json(booking);
};


export const deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ message: "Booking removed" });
};
