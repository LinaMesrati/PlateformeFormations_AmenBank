import { Router } from "express";
import { users } from "../data";
import { userModel } from "../models/user.model";
import { database } from "../server";
const jwt = require('jsonwebtoken');

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await database.collection("users").find().toArray();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/formateur/:id", async (req, res) => {
  const { id } = req.params;

  const updatedDemande = { type: 'formateur' };

  try {
    // Update data in MongoDB collection
    const updatedDemand = await database.collection("users").findOneAndUpdate({ id: id }, { $set: updatedDemande }, { new: true });

    // You may want to handle the update in your local array if needed

    res.send(updatedDemand);
  } catch (error) {
    console.error("Error accepting demand:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/resp/:id", async (req, res) => {
  const { id } = req.params;

  const updatedDemande = { type: 'admin' };

  try {
    // Update data in MongoDB collection
    const updatedDemand = await database.collection("users").findOneAndUpdate({ id: id }, { $set: updatedDemande }, { new: true });

    // You may want to handle the update in your local array if needed

    res.send(updatedDemand);
  } catch (error) {
    console.error("Error accepting demand:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/formateurs', async (req, res) => {
  try {
    const formateurs = await database.collection("users").find({ type: 'formateur' }).toArray();
    res.send(formateurs);
  } catch (error) {
    console.error("Error fetching formateurs:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/responsable', async (req, res) => {
  try {
    const formateurs = await database.collection("users").find({ type: 'admin' }).toArray();
    res.send(formateurs);
  } catch (error) {
    console.error("Error fetching formateurs:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/formresp', async (req, res) => {
  try {
    const formateurs = await database.collection("users").find({ type: { $in: ['formateur', 'admin'] } }).toArray();

    res.send(formateurs);
  } catch (error) {
    console.error("Error fetching formateurs:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/:id', async (req, res) => {
  const formId =req.params.id;
  try {
    const formateurs = await database.collection("users").find({ id:formId}).toArray();
    res.send(formateurs);
  } catch (error) {
    console.error("Error fetching formateurs:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/motdepasse/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Recherchez l'utilisateur par ID dans la collection MongoDB
    const user = await database.collection("users").findOne({ email: email });

    if (user) {
      // Si l'utilisateur est trouvé, renvoyez le mot de passe (assurez-vous que le mot de passe n'est pas renvoyé dans un scénario de production réel, c'est généralement une mauvaise pratique)
      res.send({ id: user.id, password: user.password }); // À adapter selon la structure réelle de vos données utilisateur
    } else {
      // Si l'utilisateur n'est pas trouvé, renvoyez un statut 404 (non trouvé)
      res.status(404).send("Utilisateur non trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du mot de passe:", error);
    res.status(500).send("Erreur interne du serveur");
  }
});





router.post("/", async (req, res) => {

    const newUser = req.body; // Assuming your request body contains user data

    // Validate the user data as needed

    // Insert the new user into the "users" collection
    const result = await database.collection("users").insertOne(newUser);
    res.send(result)
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete user from MongoDB collection
    const deletedUser = await database.collection("users").findOneAndDelete({ id: id });

    if (deletedUser.value) {
      res.send(deletedUser.value);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});





export default router;
