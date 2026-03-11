const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nnptud1103';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Routes
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'API User & Role Management',
        endpoints: {
            users: {
                'POST /users': 'Tạo user mới',
                'GET /users': 'Lấy tất cả users',
                'GET /users/:id': 'Lấy user theo ID',
                'PUT /users/:id': 'Cập nhật user',
                'DELETE /users/:id': 'Xoá mềm user',
                'POST /users/enable': 'Kích hoạt user (body: email, username)',
                'POST /users/disable': 'Vô hiệu hoá user (body: email, username)'
            },
            roles: {
                'POST /roles': 'Tạo role mới',
                'GET /roles': 'Lấy tất cả roles',
                'GET /roles/:id': 'Lấy role theo ID',
                'PUT /roles/:id': 'Cập nhật role',
                'DELETE /roles/:id': 'Xoá mềm role',
                'GET /roles/:id/users': 'Lấy tất cả users theo role ID'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra!',
        error: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy route'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

module.exports = app;
