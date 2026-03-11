const Role = require('../models/Role');
const User = require('../models/User');

// Create - Tạo role mới
exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingRole = await Role.findOne({ name, isDeleted: false });
        if (existingRole) {
            return res.status(400).json({
                success: false,
                message: 'Role đã tồn tại'
            });
        }

        const role = new Role({ name, description });
        await role.save();

        res.status(201).json({
            success: true,
            message: 'Tạo role thành công',
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Read - Lấy tất cả role
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isDeleted: false });

        res.status(200).json({
            success: true,
            count: roles.length,
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Read - Lấy role theo ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findOne({ 
            _id: req.params.id, 
            isDeleted: false 
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy role'
            });
        }

        res.status(200).json({
            success: true,
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Update - Cập nhật role
exports.updateRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        const role = await Role.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { name, description },
            { new: true, runValidators: true }
        );

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy role'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật role thành công',
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Delete - Xoá mềm role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy role'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Xoá role thành công (soft delete)'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Lấy tất cả users theo role ID - GET /roles/:id/users
exports.getUsersByRoleId = async (req, res) => {
    try {
        const roleId = req.params.id;

        const role = await Role.findOne({ 
            _id: roleId, 
            isDeleted: false 
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy role'
            });
        }

        const users = await User.find({ 
            role: roleId, 
            isDeleted: false 
        }).populate('role', 'name description');

        res.status(200).json({
            success: true,
            count: users.length,
            role: role.name,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};
