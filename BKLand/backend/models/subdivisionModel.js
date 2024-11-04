import mongoose from "mongoose";

//Model Phân khu
const subdivisionSchema = mongoose.Schema(
    {
        subdivisionName:{
            type: String,
            required: true
        },
        subdivisionDescription:{
            type: String,
            required: true
        },
        subdivisionStatus:{
            type: String,
            required: false,
            default: 'Active'
        },
        project:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        }
    }
);

export const Subdivision = mongoose.model('Subdivision', subdivisionSchema);