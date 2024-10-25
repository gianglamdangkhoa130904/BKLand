import mongoose from "mongoose";

//Model phiếu sỡ hữu căn hộ
const employeeSchema = mongoose.Schema(
    {
        ticketType:{
            type: String,
            required: true
        },
        validityPeriod:{
            type: Date,
            required: false
        },
        publishDate:{
            type: Date,
            required: true,
            default: Date.now
        },
        statusTicket:{
            type: String,
            required: true,
            default: 'Active'
        },
        customerID:{
            type: String,
            required: true
        },
        apartmentID:{
            type: String,
            required: true
        }
    }
);

export const Employee = mongoose.model('Employee', employeeSchema);