import mongoose from "mongoose";

//Model phiếu sỡ hữu căn hộ
const orderSchema = mongoose.Schema(
    {
        orderType:{
            type: String,
            required: true
        },
        orderDescription:{
            type: String,
            required: true
        },
        orderAmount:{
            type: Number,
            required: false
        },
        orderDate:{
            type: Date,
            required: true,
            default: Date.now
        },
        orderStatus:{
            type: String,
            required: true
        },
        customerID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }
);

export const Order = mongoose.model('Order', orderSchema);