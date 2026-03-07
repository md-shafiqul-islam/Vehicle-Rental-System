import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const signupUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    [name, email, hashedPassword, phone, role],
  );

  return result;
};

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
  signupUser,
  signinUser,
};
