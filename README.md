# 🚗 Vehicle Rental System

**Live URL:** [https://your-live-app-url.com](https://your-live-app-url.com)

---

## Features

- User Registration & Authentication (Customer & Admin)
- Role-Based Access Control
- Vehicle Management (Add, Update, Delete)
- Booking Management
  - Create Booking (Automatic Price Calculation)
  - Update Booking Status (Cancel / Return)
  - View All Bookings (Admin / Customer)
- Vehicle Availability Tracking
- Auto-Return Logic for Bookings
- Deletion Constraints (Prevent deleting users/vehicles with active bookings)

---

## Technology Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Tokens)  
- **ORM / Querying:** pg (PostgreSQL client)  
- **Tools:** Postman / Insomnia for API testing, Nodemon for development

---

## Setup & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/md-shafiqul-islam/Vehicle-Rental-System.git
cd Vehicle-Rental-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/car_rental_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

### 4. Run Database Migrations / Setup Tables

```SQL
-- Example tables (users, vehicles, bookings)
-- Use your SQL scripts or pgAdmin to create the tables
```

### 5. Start the Server
```bash
npm run dev
```

### 6. API Testing
```postman
-- POST /api/v1/users → Register user
-- POST /api/v1/bookings → Create booking
-- GET /api/v1/bookings → View bookings
-- PUT /api/v1/bookings/:bookingId → Update booking status
-- DELETE /api/v1/users/:userId → Delete user (admin only)
-- DELETE /api/v1/vehicles/:vehicleId → Delete vehicle (admin only)
```
