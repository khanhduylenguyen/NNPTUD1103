const User = require('../models/User');

// Create - Tạo user mới
exports.createUser = async (req, res) => {
    try {
        const { username, password, email, fullName, avatarUrl, role } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { username, isDeleted: false },
                { email, isDeleted: false }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username hoặc email đã tồn tại'
            });
        }

        const user = new User({
            username,
            password,
            email,
            fullName,
            avatarUrl,
            role
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Tạo user thành công',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Read - Lấy tất cả user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false })
            .populate('role', 'name description');

        res.status(200).json({
            success: true,
            count: users.length,
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

// Read - Lấy user theo ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id,
            isDeleted: false
        }).populate('role', 'name description');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy user'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Update - Cập nhật user
exports.updateUser = async (req, res) => {
    try {
        const { username, password, email, fullName, avatarUrl, status, role, loginCount } = req.body;

        const user = await User.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { username, password, email, fullName, avatarUrl, status, role, loginCount },
            { new: true, runValidators: true }
        ).populate('role', 'name description');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy user'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật user thành công',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Delete - Xoá mềm user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy user'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Xoá user thành công (soft delete)'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Enable - Kích hoạt user (chuyển status về true)
exports.enableUser = async (req, res) => {
    try {
        const { email, username } = req.body;

        if (!email || !username) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp email và username'
            });
        }

        const user = await User.findOne({
            email,
            username,
            isDeleted: false
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Thông tin email hoặc username không đúng'
            });
        }

        user.status = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Kích hoạt user thành công',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Disable - Vô hiệu hoá user (chuyển status về false)
exports.disableUser = async (req, res) => {
    try {
        const { email, username } = req.body;

        if (!email || !username) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp email và username'
            });
        }

        const user = await User.findOne({
            email,
            username,
            isDeleted: false
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Thông tin email hoặc username không đúng'
            });
        }

        user.status = false;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Vô hiệu hoá user thành công',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};
