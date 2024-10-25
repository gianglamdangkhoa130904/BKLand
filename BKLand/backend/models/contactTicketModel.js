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
        projectID:{
            type: String,
            required: true,
        }
    }
);

export const ContactTicket = mongoose.model('ContactTicket', contactTicketSchema);