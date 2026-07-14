import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import Hotel from "../models/Hotel.js";


export const getDashboardStats = async (req, res) => {
  const totalBookings = await Booking.countDocuments({});
  const totalCustomers = await Customer.countDocuments({});
  const totalHotels = await Hotel.countDocuments({});

  const paidBookings = await Booking.find({ paymentStatus: "paid" });
  const totalRevenue = paidBookings.reduce((sum, b) => sum + b.grandTotal, 0);

  const recentBookings = await Booking.find({})
    .populate("hotel", "name")
    .populate("customer", "firstName lastName email")
    .sort({ createdAt: -1 })
    .limit(5);

  const statusBreakdown = await Booking.aggregate([
    { $group: { _id: "$bookingStatus", count: { $sum: 1 } } },
  ]);

  res.json({
    totalBookings,
    totalCustomers,
    totalHotels,
    totalRevenue,
    recentBookings,
    statusBreakdown,
  });
};


export const getAllCustomers = async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.json(customers);
};


export const getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  const bookings = await Booking.find({ customer: customer._id })
    .populate("hotel", "name")
    .populate("room", "roomType");
  res.json({ customer, bookings });
};


export const deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json({ message: "Customer removed" });
};
