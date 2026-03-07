import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // get vehicle info
  const vehicleRes = await pool.query(
    `SELECT id, vehicle_name, daily_rent_price, availability_status 
        FROM vehicles
        WHERE id = $1`,
    [vehicle_id],
  );

  if (vehicleRes.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleRes.rows[0];

  // check availability
  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available for booking");
  }

  // calculate number of days
  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  const number_of_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (number_of_days <= 0) {
    throw new Error("Invalid rental dates");
  }

  // calculate price
  const total_price = vehicle.daily_rent_price * number_of_days;

  // create booking
  const bookingRes = await pool.query(
    `INSERT INTO bookings
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1,$2,$3,$4,$5,'active')
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price],
  );

  // update vehicle status
  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
    [vehicle_id],
  );

  return {
    ...bookingRes.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

export const bookingServices = {
  createBooking,
};
