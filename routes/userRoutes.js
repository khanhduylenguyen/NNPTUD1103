const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD Routes cho User
router.post('/', userController.createUser);           // POST /users - Tạo user mới
router.get('/', userController.getAllUsers);           // GET /users - Lấy tất cả users
router.get('/:id', userController.getUserById);        // GET /users/:id - Lấy user theo ID
router.put('/:id', userController.updateUser);         // PUT /users/:id - Cập nhật user
router.delete('/:id', userController.deleteUser);      // DELETE /users/:id - Xoá mềm user

// Enable/Disable user
router.post('/enable', userController.enableUser);     // POST /users/enable - Kích hoạt user
router.post('/disable', userController.disableUser);   // POST /users/disable - Vô hiệu hoá user

module.exports = router;
