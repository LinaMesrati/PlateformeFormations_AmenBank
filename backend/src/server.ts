import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import formationsRouter from "./routers/formations.router";
import categoriesRouter from './routers/categories.router';
import usersRouter from './routers/users.router';
import cartsRouter from './routers/carts.router';
import demandesRouter from './routers/demandes.router';
import { MongoClient } from 'mongodb';
import cors from 'cors';


const app=express();
app.use(express.json(),cors(),(req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use("/formations",formationsRouter)
app.use("/categories",categoriesRouter)
app.use("/signup",usersRouter)
app.use("/carts",cartsRouter)
app.use("/demandes",demandesRouter)

export var database:any;
const CONNECTION_STRING ="mongodb+srv://linamesrati:WaBItAtSU1mx9JjH@cluster0.odhcu8t.mongodb.net?retryWrites=true&w=majority";
app.listen(3000, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
      if (error) {
          console.error("MongoDB Connection Error:", error);
          return;
      }

      database = client?.db("gestionFormations")
      console.log("MongoDB Connection Successful");
  });
});