import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const signinUser = async (email: string, password: string) => {
  // Query user by email
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  // Return null if no user exists with the given email
  if (result.rows.length === 0) {
    return null;
  }

  // Extract user record
  const user = result.rows[0];

  // Compare provided password with stored hashed password
  const matchPassword = await bcrypt.compare(password, user.password);

  // Password mismatch
  if (!matchPassword) {
    return false;
  }

  // Generate JWT for authenticated user
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    config.jwt_secret as string,
    { expiresIn: "60d" },
  );

  // Remove password before sending user data to client
  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};

export const authServices = {
  signinUser,
};
