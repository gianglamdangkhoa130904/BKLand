import mongoose from "mongoose";

//Model phiếu thông tin liên hệ
const contactTicketSchema = mongoose.Schema(
    {
        customerName:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        dateVisit:{
            type: Date,
            required: true
        },
        projectID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        }
    }
);

export const ContactTicket = mongoose.model('ContactTicket', contactTicketSchema);