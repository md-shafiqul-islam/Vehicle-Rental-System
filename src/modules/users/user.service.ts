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

export const userServices = {
  getAllUsers,
  updateUserByID,
};
