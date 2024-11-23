import mongoose from "mongoose";

//Model Căn hộ
const adminSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true,
            default: 'employee'
        },
    }
);

export const Admin = mongoose.model('Admin', adminSchema);