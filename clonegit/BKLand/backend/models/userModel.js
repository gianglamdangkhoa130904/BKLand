import mongoose from "mongoose";

// Model Khách hàng
const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: false
        },
        dob:{
            type: Date,
            required: false
        },
        nationality:{
            type: String,
            required: false
        },
        statusAccount:{
            type: String,
            required: false
        }

    }
);

export const User = mongoose.model('User', userSchema);