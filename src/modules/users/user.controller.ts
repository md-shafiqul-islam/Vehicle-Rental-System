import { Request, Response } from "express";
import { userServices } from "./user.service";

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

export const userControllers = {
  getAllUsers,
};
