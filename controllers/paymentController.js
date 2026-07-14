import Booking from "../models/Booking.js";


export const mockCharge = async (req, res) => {
  const { bookingId, cardNumberLast4 } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: "Booking not found" });


  await new Promise((resolve) => setTimeout(resolve, 800));

  const isFailure = cardNumberLast4 === "0000"; 
  const txnId = "MOCKPAY-" + Date.now();

  if (isFailure) {
    booking.paymentStatus = "failed";
    await booking.save();
    return res.status(402).json({ message: "Payment declined by mock gateway", booking });
  }

  booking.paymentStatus = "paid";
  booking.paymentTxnId = txnId;
  await booking.save();

  res.json({ message: "Payment successful", txnId, booking });
};
