import mongoose from "mongoose";

//Model Dự án
const projectSchema = mongoose.Schema(
    {
        projectName:{
            type: String,
            required: true
        },
        projectDescription:{
            type: String,
            required: true
        },
        projectImage:{
            type: String,
            required: true
        },
        projectStatus:{
            type: String,
            required: true,
            default: 'Active'
        },
        province:{
            type: String,
            required: true
        },
        projectType:{
            type: String,
            required: true
        }
    }
);

export const Project = mongoose.model('Project', projectSchema);