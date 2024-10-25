import mongoose from "mongoose";

//Model Tòa nhà
const buildingSchema = mongoose.Schema(
    {
        buildingName:{
            type: String,
            required: true
        },
        buildingDescription:{
            type: String,
            required: true
        },
        buildingStatus:{
            type: String,
            required: false,
            default: 'Active'
        },
        subdivision:{
            type: String,
            required: true
        }
    }
);

export const Building = mongoose.model('Building', buildingSchema);