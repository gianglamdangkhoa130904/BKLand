import mongoose from "mongoose";

//Model Căn hộ
const apartmentSchema = mongoose.Schema(
    {
        sellingPrice:{
            type: Number,
            required: true
        },
        rentPrice:{
            type: Number,
            required: true
        },
        numberOfBedroom:{
            type: Number,
            required: true
        },
        numberOfToilet:{
            type: Number,
            required: true
        },
        direction:{
            type: String,
            required: true
        },
        floor:{
            type: String,
            required: false
        },
        apartmentImage:{
            type: String,
            required: false
        },
        buildingID:{
            type: String,
            required: false
        }
    }
);

export const Apartment = mongoose.model('Apartment', apartmentSchema);