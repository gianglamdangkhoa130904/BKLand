import mongoose from "mongoose";

// Model Tỉnh thành
const provinceSchema = mongoose.Schema(
    {
        provinceName:{
            type: String,
            required: true
        },
        provinceStatus:{
            type: String,
            required: true
        }
    }
);

export const Province = mongoose.model('Province', provinceSchema);