import { Schema, model } from "mongoose";

export interface categories {
    name: string;
  }

export const catSchema = new Schema<categories>(
  {  name : {type : String , required : true}},
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

export const catModel =model<categories>('categorie',catSchema);

  