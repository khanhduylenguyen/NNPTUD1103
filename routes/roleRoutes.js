const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// CRUD Routes cho Role
router.post('/', roleController.createRole);           // POST /roles - Tạo role mới
router.get('/', roleController.getAllRoles);           // GET /roles - Lấy tất cả roles
router.get('/:id', roleController.getRoleById);        // GET /roles/:id - Lấy role theo ID
router.put('/:id', roleController.updateRole);         // PUT /roles/:id - Cập nhật role
router.delete('/:id', roleController.deleteRole);      // DELETE /roles/:id - Xoá mềm role

// Lấy tất cả users theo role ID
router.get('/:id/users', roleController.getUsersByRoleId);  // GET /roles/:id/users

module.exports = router;
