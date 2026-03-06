import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signinUser = async (req: Request, res: Response) => {
  // Extract credentials from request body
  const { email, password } = req.body;

  try {
    const result = await authServices.signinUser(email, password);

    if (result === null) {
      return res.status(401).json({
        success: false,
        message: "User not found with this email",
      });
    }

    if (result === false) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signinUser,
};
