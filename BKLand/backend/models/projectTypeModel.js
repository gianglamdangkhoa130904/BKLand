import mongoose from "mongoose";

// Model Loại dự án
const projectTypeSchema = mongoose.Schema(
    {
        projectTypeName:{
            type: String,
            required: true
        },
        projectTypeStatus:{
            type: String,
            required: true,
            default: 'Active'
        }
    }
);

export const ProjectType = mongoose.model('ProjectType', projectTypeSchema);