# ASKR Clothing — Backend API

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Setup & Run

### 1. Install dependencies
```
cd backend
npm install
```

### 2. Configure environment
Edit `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/askr_clothing
JWT_SECRET=askr_super_secret_key_2025
JWT_EXPIRE=7d
```

### 3. Start server
```
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server runs at: http://localhost:5000

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create product |
| POST | /api/products/:id/review | Add review |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Create order |
| GET | /api/orders/myorders | Get my orders |
| GET | /api/orders/:id | Get order by ID |
| PUT | /api/orders/:id/status | Update order status |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/profile | Get profile |
| PUT | /api/users/profile | Update profile |
| POST | /api/users/address | Add address |
| DELETE | /api/users/address/:addrId | Delete address |
| PUT | /api/users/wishlist/:productId | Toggle wishlist |
