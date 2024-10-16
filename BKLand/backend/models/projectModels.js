import mongoose from "mongoose";
import { ProjectType } from "./projectTypeModels";

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
        projectStatus:{
            type: String,
            required: true
        },
        province:{
            type: String,
            required: true
        },
        ProjectType:{
            type: String,
            required: true
        }
    }
);

export const Project = mongoose.model('Project', projectSchema);