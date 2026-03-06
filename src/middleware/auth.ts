import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract token from Authorization header
      const authToken = req?.headers?.authorization?.split(" ")[1];

      // Reject request if token is missing
      if (!authToken) {
        return res.status(401).json({
          message: "Access denied. No token provided.",
        });
      }

      // Verify and decode JWT
      const decoded = Jwt.verify(
        authToken,
        config.jwt_secret as string,
      ) as JwtPayload;

      // Attach decoded payload to request object
      req.user = decoded;

      // Role-based access control
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "You are not allowed to access this resource.",
        });
      }

      // Allow request to proceed
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
