import { Request, Response } from "express";
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Users not found",
        data: [],
      });
    }

    const usersWithoutPassword = result.rows.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: usersWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserByID = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const currentUser = req.user as JwtPayload;

  try {
    // customer cannot update other users
    if (currentUser.role === "customer" && currentUser.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot update other users",
      });
    }

    // customer cannot change role
    if (currentUser.role === "customer" && req.body.role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot change role",
      });
    }

    const result = await userServices.updateUserByID(req.body, id as string);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  getAllUsers,
  updateUserByID,
};
