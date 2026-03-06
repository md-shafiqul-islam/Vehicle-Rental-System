import { Request, Response } from "express";
import { userServices } from "./user.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.signupUser(req.body);

    const { password, ...userWithoutPassword } = result.rows[0];

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  signupUser,
};
