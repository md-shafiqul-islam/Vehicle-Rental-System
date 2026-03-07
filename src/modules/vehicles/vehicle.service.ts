import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );

  return result;
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  return result;
};

const getVehicleByID = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);

  return result;
};

const updateVehicleByID = async (
  payload: Record<string, unknown>,
  id: string,
) => {
  const { vehicle_name, daily_rent_price, availability_status } = payload;

  const result = await pool.query(
    `
      UPDATE vehicles 
      SET 
        vehicle_name = COALESCE($1, vehicle_name), 
        daily_rent_price = COALESCE($2, daily_rent_price), 
        availability_status = COALESCE($3, availability_status) 
      WHERE id = $4 
      RETURNING *
      `,
    [vehicle_name, daily_rent_price, availability_status, id],
  );

  return result;
};

const deleteVehicleByID = async (vehicleId: string) => {
  // Check if vehicle exists
  const vehicleRes = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);

  if (vehicleRes.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  // Check for active bookings
  const bookingRes = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id = $1 AND status = 'active'`,
    [vehicleId],
  );

  if (bookingRes.rows.length > 0) {
    throw new Error("Cannot delete vehicle with active bookings");
  }

  // Delete vehicle
  await pool.query(`DELETE FROM vehicles WHERE id = $1`, [vehicleId]);

  return true;
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getVehicleByID,
  updateVehicleByID,
  deleteVehicleByID,
};
