# LearnHub

## Introduction 

This API provides authentication, user management, and course-related operations such as viewing, adding to cart, and managing wishlists. Below is a detailed explanation of all available routes.

## Base URL
 
All requests should be made to:

   ```bash
   http://localhost:7600
  ```

# User and Course Routes Documentation

## User Routes

### 1. Send OTP for Email Verification
**Endpoint:**
```http
POST /user/send-otp
```
**Payload:**
```json
{
  "email": "user@example.com"
}
```
**Description:**
- Sends an OTP to the provided email for verification.

---

### 2. Verify OTP for Signup
**Endpoint:**
```http
POST /user/verify-otp
```
**Payload:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
**Description:**
- Verifies the OTP sent to the user's email for signup authentication.

---

### 3. Signup User
**Endpoint:**
```http
POST /user/signup
```
**Payload:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword"
}
```
**Description:**
- Registers a new user after successful email verification.

---

### 4. User Login
**Endpoint:**
```http
POST /user/login
```
**Payload:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Description:**
- Logs in an existing user.

---

### 5. Forgot Password
**Endpoint:**
```http
POST /user/forgot-password
```
**Payload:**
```json
{
  "email": "user@example.com"
}
```
**Description:**
- Sends a password reset OTP to the user's registered email.

---

### 6. Verify Reset OTP
**Endpoint:**
```http
POST /user/verify-resetotp
```
**Payload:**
```json
{
  "otp": "123456"
}
```
**Description:**
- Verifies the OTP sent for password reset.

---

### 7. Reset Password
**Endpoint:**
```http
POST /user/reset-password
```
**Payload:**
```json
{
  "newpassword": "newsecurepassword"
}
```
**Description:**
- Allows users to reset their password after OTP verification.

---

### 8. Add Course to Cart
**Endpoint:**
```http
POST /user/cart
```
**Payload:**
```json
{
  "courseId": "12345"
}
```
**Description:**
- Adds a course to the user's cart.

---

### 9. Show Cart Items
**Endpoint:**
```http
GET /user/cart
```
**Description:**
- Retrieves all courses present in the user's cart.

---

### 10. Add Course to Wishlist
**Endpoint:**
```http
POST /user/wishlist
```
**Payload:**
```json
{
  "courseId": "12345"
}
```
**Description:**
- Adds a course to the user's wishlist.

---

### 11. Show Wishlist Items
**Endpoint:**
```http
GET /user/wishlist
```
**Description:**
- Retrieves all courses present in the user's wishlist.

---

## Course Routes

### 12. Get All Courses (Before Login)
**Endpoint:**
```http
GET /course
```
**Query Parameters:**
- `title` (optional) - Filter by course title
- `category` (optional) - Filter by category
- `subcategory` (optional) - Filter by subcategory
- `page` (optional) - Pagination page number
- `limit` (optional) - Number of courses per page

**Description:**
- Retrieves all available courses before user login with optional filtering and pagination.

---

### 13. Get Enrolled Courses (After Login)
**Endpoint:**
```http
GET /course/mycourses
```
**Query Parameters:**
- `title` (optional) - Filter by course title
- `category` (optional) - Filter by category
- `subcategory` (optional) - Filter by subcategory
- `page` (optional) - Pagination page number
- `limit` (optional) - Number of courses per page

**Description:**
- Retrieves all enrolled courses after login with optional filtering and pagination.

---

## Authentication Middleware
All private routes (e.g., accessing enrolled courses, adding items to the cart or wishlist) require authentication. This is handled by the following middleware:

```js
userRouter.use(authenticationCheck);
courseRouter.use(authenticationCheck);
```
**Usage:**
- Ensures the user is authenticated before accessing protected routes.

---

## Summary Table

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user/send-otp` | POST | Sends OTP for email verification |
| `/user/verify-otp` | POST | Verifies OTP for signup |
| `/user/signup` | POST | Registers a new user |
| `/user/login` | POST | Logs in a user |
| `/user/forgot-password` | POST | Sends OTP for password reset |
| `/user/verify-resetotp` | POST | Verifies reset OTP |
| `/user/reset-password` | POST | Resets the user's password |
| `/user/cart` | POST | Adds a course to cart |
| `/user/cart` | GET | Retrieves cart items |
| `/user/wishlist` | POST | Adds a course to wishlist |
| `/user/wishlist` | GET | Retrieves wishlist items |
| `/course` | GET | Retrieves all courses (before login) |
| `/course/mycourses` | GET | Retrieves enrolled courses (after login) |

---

## How to Use
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm run dev`.
4. Use Postman or any API testing tool to make requests to the above endpoints.

---

### 💡 Need Help?
Feel free to reach out if you need assistance with integrating the API! 
