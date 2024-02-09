import { Schema, model } from "mongoose";

export interface Cart {
    userId: string;
    date: string; 
    forms: { fomrId: number }[];
    id: string;
    sessions: { date: string, duration: number, location: string }[];
  }

  export const cartSchema = new Schema<Cart>(
    {   id : {type : String , required : true},
        userId : {type : String , required : true},
        date: {type : String , required : true},
        forms: [{
            fomrId:{type:Number ,required:  true }
        }],
        sessions: [{
            date: { type: String, required: true },
            duration: { type: Number, required: true },
            location: { type: String, required: true }
        }],
    },
    {
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
  );
  
  export const cartModel =model<Cart>('cart',cartSchema);
  
      