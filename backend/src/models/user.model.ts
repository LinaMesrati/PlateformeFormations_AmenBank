import { Schema, model } from "mongoose";

export interface user {
    id:string;
    fullname: string;
    email: string; 
    password: string
    mobile: number;
    type: string
  }
 

  export const userSchema = new Schema<user>(
    {  
        id:{type : String , required : true},
         fullname : {type : String , required : true},
        email: {type : String , required : true},
        password: {type : String , required : true},
        mobile: {type : Number , required : true},
        type:{type : String , required : true},
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
  
  export const userModel =model<user>('user',userSchema);
  
      