<div align="center">

<img src="https://img.shields.io/badge/🔒-Locify-5e81f4?style=for-the-badge&labelColor=0d1117" alt="Locify" height="60"/>

# Locify — A Secure Password Manager

**Your digital life, locked down.**

One master password is all you need. Locify remembers everything else — securely, privately, and only for you.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![AES-256](https://img.shields.io/badge/Encryption-AES--256--CBC-red?style=flat-square)](#)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#)

</div>

---

## 📖 About

**Locify** is a full-stack secure password manager web application that allows users to store, manage, and retrieve passwords for multiple accounts and services in an encrypted, user-friendly environment.

All stored passwords are encrypted using **AES-256-CBC** encryption before being saved to the database — meaning even if the database is compromised, your passwords remain unreadable. The app features **two-factor authentication (2FA)** via OTP email on every login, **JWT-based session management**, and a clean dashboard with password strength scoring, categories, favorites, and search.

> Built as a full-stack project to demonstrate secure web application development using the MERN stack.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **OTP Email Verification** | Account registration requires email OTP verification |
| 🔑 **2FA on Every Login** | A 6-digit OTP is sent to your email on each login |
| 🔒 **AES-256-CBC Encryption** | All vault passwords encrypted before saving to MongoDB |
| 🧂 **bcrypt Hashing** | User account passwords hashed with salt round of 12 |
| 🪙 **JWT Authentication** | Stateless auth with 7-day token expiry |
| 📂 **Password Vault** | Full CRUD — add, view, edit, delete passwords |
| 🏷️ **Categories & Tags** | Organize passwords by Work, Personal, Finance, etc. |
| ⭐ **Quick Access (Favorites)** | Pin important passwords for one-click copy |
| 💪 **Password Strength Meter** | Real-time scoring — Critical / Weak / Good / Strong |
| 🔍 **Search & Filter** | Search by name, username, email, URL, or tags |
| 📊 **Dashboard Stats** | Security score, total/weak/strong password counts |
| 🌙 **Dark / Light Theme** | Smooth theme toggle across the entire app |
| 🔄 **Forgot Password** | Reset password via OTP email flow |
| 🛡️ **Rate Limiting** | Brute force protection on all auth routes |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| React Router DOM | 7 | Client-side routing |
| Vite | 7 | Build tool & dev server |
| Context API | — | Global state (Vault, Theme) |
| CSS | — | Styling & theming |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime environment |
| Express.js | 4 | REST API framework |
| MongoDB + Mongoose | 8 | Database & ODM |
| jsonwebtoken | 9 | JWT authentication |
| bcryptjs | 2 | Password hashing |
| Node.js `crypto` | built-in | AES-256-CBC encryption |
| Nodemailer | 6 | OTP email sending |
| Helmet | 7 | Secure HTTP headers |
| express-rate-limit | 7 | Rate limiting |
| express-validator | 7 | Input validation |
| dotenv | 16 | Environment variables |
| Morgan | — | HTTP request logging |

---

## 📁 Project Structure

```
Locify/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, OTP, Reset Password
│   │   └── vaultController.js    # Vault CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── models/
│   │   ├── User.js               # User schema (bcrypt + OTP methods)
│   │   └── VaultItem.js          # Vault schema (AES encryption hooks)
│   ├── routes/
│   │   ├── auth.js               # /api/auth routes
│   │   └── vault.js              # /api/vault routes
│   ├── utils/
│   │   ├── email.js              # Nodemailer OTP sender
│   │   └── encryption.js         # AES-256-CBC encrypt/decrypt
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express app entry point
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── Icons.jsx
    │   ├── context/
    │   │   ├── ThemeContext.jsx   # Dark/Light global state
    │   │   └── VaultContext.jsx   # Vault data global state
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── VerifyOtp.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── AddPassword.jsx
    │   │   ├── EditPassword.jsx
    │   │   ├── ViewPassword.jsx
    │   │   └── Settings.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://cloud.mongodb.com/))
- A Gmail account with [App Password](https://support.google.com/accounts/answer/185833) enabled (for OTP emails)

---

### 1. Clone the Repository

```bash
git clone https://github.com/harshpatel0000/Lockify-project
cd locify
```

---

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/locify

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# AES Encryption — must be exactly 32 characters
ENCRYPTION_KEY=your_32_character_encryption_key_

# Email (Gmail + App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

> ⚠️ `ENCRYPTION_KEY` must be **exactly 32 characters** for AES-256 to work correctly.

Start the backend server:

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

Backend runs at → `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 📡 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/register` | Register & send verification OTP | ❌ |
| `POST` | `/verify-otp` | Verify OTP (email verify or 2FA) | ❌ |
| `POST` | `/resend-otp` | Resend OTP to email | ❌ |
| `POST` | `/login` | Login & send 2FA OTP | ❌ |
| `POST` | `/forgot-password` | Send password reset OTP | ❌ |
| `POST` | `/reset-password` | Reset password using OTP | ❌ |
| `GET` | `/me` | Get current user info | ✅ |
| `PUT` | `/update-profile` | Update display name | ✅ |
| `PUT` | `/change-password` | Change account password | ✅ |
| `DELETE` | `/delete-account` | Delete account and all vault data | ✅ |

### Vault — `/api/vault`

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/` | Get all passwords (search, filter, sort) | ✅ |
| `POST` | `/` | Add a new password | ✅ |
| `GET` | `/stats` | Dashboard statistics | ✅ |
| `GET` | `/favorites` | Get starred passwords | ✅ |
| `GET` | `/:id` | Get a single password (decrypted) | ✅ |
| `PUT` | `/:id` | Update a password | ✅ |
| `PATCH` | `/:id/favorite` | Toggle favorite/pin | ✅ |
| `DELETE` | `/:id` | Delete a single password | ✅ |
| `DELETE` | `/` | Delete all passwords in vault | ✅ |

---

## 🔐 Security Architecture

### AES-256-CBC Encryption
All vault passwords are encrypted using Node.js's built-in `crypto` module before saving to MongoDB. A random **IV (Initialization Vector)** is generated on every encryption operation, ensuring that identical passwords always produce different ciphertext. Data is stored as `iv:encryptedData` in the database.

```
Plain Password → encrypt(AES-256-CBC, random IV) → iv:encryptedHex → MongoDB
MongoDB → iv:encryptedHex → decrypt(AES-256-CBC, iv) → Plain Password
```

### bcrypt Password Hashing
User account passwords are hashed using bcrypt with a **salt round of 12** via a Mongoose `pre-save` hook. Passwords are never stored in plain text, and comparison is done using `bcrypt.compare()`.

### JWT Authentication Flow
```
Login → OTP Email → Verify OTP → Server signs JWT (7d expiry)
→ Client stores token → Sent as "Authorization: Bearer <token>"
→ auth middleware verifies on every protected route
```

### Two-Factor Authentication (2FA)
Every login triggers a **6-digit OTP** sent to the user's registered email. The OTP has a **10-minute expiry** and is cleared from the database immediately after use.

### Rate Limiting
| Scope | Limit |
|---|---|
| Global API (`/api/`) | 100 requests / 15 min |
| Auth routes (`/api/auth/`) | 10 attempts / 5 min |

### Additional Security
- **Helmet.js** — Secure HTTP response headers (XSS, clickjacking, MIME sniffing protection)
- **CORS** — Restricted to the configured frontend URL only
- **Input Validation** — All inputs validated with `express-validator`
- **Request Size Limit** — JSON body limited to `10kb`

---

## 🗺️ Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing / Home | ❌ |
| `/register` | Register | ❌ |
| `/login` | Login | ❌ |
| `/verify-otp` | OTP Verification | ❌ |
| `/forgot-password` | Forgot Password | ❌ |
| `/dashboard` | Dashboard | ✅ |
| `/add-password` | Add Password | ✅ |
| `/edit-password/:id` | Edit Password | ✅ |
| `/passwords` | All Passwords | ✅ |
| `/settings` | Account Settings | ✅ |

---

## 👨‍💻 Author

**Harsh Patel**

- 📧 [harshpketanbhai@gmail.com](mailto:harshpketanbhai@gmail.com)
- 📱 +91 7433065770
- 🎓 B.E. Computer Science — New LJ Institute of Engineering and Technology, Ahmedabad
- 🔗 [LinkedIn](https://www.linkedin.com/in/harsh-patel-a7387537b/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

Made with ❤️ by [Harsh Patel](https://github.com/harshpatel0000)

</div>