# NNPTUD1103 - User & Role Management API

API quản lý User và Role với Node.js, Express và MongoDB.

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` với nội dung:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nnptud1103
```

## Chạy ứng dụng

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Users

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/users` | Tạo user mới |
| GET | `/users` | Lấy tất cả users |
| GET | `/users/:id` | Lấy user theo ID |
| PUT | `/users/:id` | Cập nhật user |
| DELETE | `/users/:id` | Xoá mềm user |
| POST | `/users/enable` | Kích hoạt user |
| POST | `/users/disable` | Vô hiệu hoá user |

### Roles

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/roles` | Tạo role mới |
| GET | `/roles` | Lấy tất cả roles |
| GET | `/roles/:id` | Lấy role theo ID |
| PUT | `/roles/:id` | Cập nhật role |
| DELETE | `/roles/:id` | Xoá mềm role |
| GET | `/roles/:id/users` | Lấy tất cả users theo role ID |

## Ví dụ Request

### Tạo Role
```json
POST /roles
{
    "name": "admin",
    "description": "Administrator role"
}
```

### Tạo User
```json
POST /users
{
    "username": "john_doe",
    "password": "password123",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "roleId"
}
```

### Enable User
```json
POST /users/enable
{
    "email": "john@example.com",
    "username": "john_doe"
}
```

### Disable User
```json
POST /users/disable
{
    "email": "john@example.com",
    "username": "john_doe"
}
```
