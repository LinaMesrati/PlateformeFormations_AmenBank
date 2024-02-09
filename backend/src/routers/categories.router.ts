import { Router } from "express";
import { catModel } from "../models/categories.model";
import {database} from "../server";
const router=Router();

router.get("/",(req,res)=>{
    database.collection("categories").find({}).toArray((error: any,result: any)=>
    {
        res.send(result);
    })
})

export default router;