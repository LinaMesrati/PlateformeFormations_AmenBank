import { Schema, model } from "mongoose";

export interface Formation
{
    title:string,
    price:string
    categ:string,
    description:string,
    image:string
    sessions: { date: string, duration: number, location: string }[];
    formateurId:string
    niveau:string
    
}

export const FormSchema = new Schema<Formation>(
    {
      
        title: { type: String, required: true },
        price: { type: String, required: true },
        categ: { type: String,  required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        sessions: [{
            date: { type: String, required: true },
            duration: { type: Number, required: true },
            location: { type: String, required: true }
        }],
        formateurId: { type: String, required: true },
        niveau: { type: String, required: true }
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

export const FormModel =model<Formation>('form',FormSchema);