import { Schema, model } from "mongoose";

export interface FormationRequest {
    id:string
    formateurId: number, 
    formationName: string,
    startDate: Date,
    category: string,
    duration:string,
    description: string,
    etat:string
}

const RequestSchema = new Schema<FormationRequest>({
    id: { type: String, required: true },
    formateurId: { type: Number, required: true },
    formationName: { type: String, required: true },
    startDate: { type: Date, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    etat: { type: String, required: true },
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

export const requModel =model<FormationRequest>('demande',RequestSchema);