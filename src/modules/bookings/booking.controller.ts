import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as JwtPayload;

    const result = await bookingServices.getAllBookings(currentUser);

    res.status(200).json({
      success: true,
      message:
        currentUser.role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const { status } = req.body;
    const currentUser = req.user as JwtPayload;

    const result = await bookingServices.updateBooking(
      bookingId as string,
      status,
      currentUser,
    );

    if (status === "cancelled") {
      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking marked as returned. Vehicle is now available",
      data: {
        ...result,
        vehicle: {
          availability_status: "available",
        },
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
