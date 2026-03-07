import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const updateUserByID = async (payload: Record<string, unknown>, id: string) => {
  const { name, email, phone, role } = payload;

  const result = await pool.query(
    `
        UPDATE users 
        SET 
            name = COALESCE($1, name), 
            email = COALESCE($2, email), 
            phone = COALESCE($3, phone), 
            role = COALESCE($4, role) 
        WHERE id = $5 
        RETURNING *
        `,
    [name, email, phone, role, id],
  );

  return result;
};

const deleteUserByID = async (userId: string) => {
  // Check if user exists
  const userRes = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    userId,
  ]);

  if (userRes.rows.length === 0) {
    throw new Error("User not found");
  }

  // Check if user has active bookings
  const bookingRes = await pool.query(
    `SELECT * FROM bookings WHERE customer_id = $1 AND status = 'active'`,
    [userId],
  );

  if (bookingRes.rows.length > 0) {
    throw new Error("Cannot delete user with active bookings");
  }

  // Delete user
  await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

  return true;
};

export const userServices = {
  getAllUsers,
  updateUserByID,
  deleteUserByID,
};
