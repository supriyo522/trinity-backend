import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


export const getHotels = async (req, res) => {
  const hotels = await Hotel.find({});
  res.json(hotels);
};


export const getHotelBySlug = async (req, res) => {
  const hotel = await Hotel.findOne({ slug: req.params.slug });
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  const rooms = await Room.find({ hotel: hotel._id });
  res.json({ hotel, rooms });
};


export const createHotel = async (req, res) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json(hotel);
};


export const updateHotel = async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json(hotel);
};


export const deleteHotel = async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json({ message: "Hotel removed" });
};


export const createRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
};

export const updateRoom = async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
};

export const deleteRoom = async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json({ message: "Room removed" });
};
