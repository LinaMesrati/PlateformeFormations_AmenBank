import { Router } from "express";
import { database } from "../server";

const router = Router();

// New route to refuse a demand
router.put("/refuse/:id", async (req, res) => {
  const { id } = req.params;

  const updatedDemande = { etat: 'refusé' };

  try {
    // Update data in MongoDB collection
    const updatedDemand = await database.collection("demandes").findOneAndUpdate({ id: id}, { $set: updatedDemande }, { new: true });

    // You may want to handle the update in your local array if needed

    res.send(updatedDemand);
  } catch (error) {
    console.error("Error refusing demand:", error);
    res.status(500).send("Internal Server Error");
  }
});

// New route to accept a demand
router.put("/accept/:id", async (req, res) => {
  const { id } = req.params;

  const updatedDemande = { etat: 'accepté' };

  try {
    // Update data in MongoDB collection
    const updatedDemand = await database.collection("demandes").findOneAndUpdate({ id: id }, { $set: updatedDemande }, { new: true });

    // You may want to handle the update in your local array if needed

    res.send(updatedDemand);
  } catch (error) {
    console.error("Error accepting demand:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const demandes = await database.collection("demandes").find().toArray();
    res.send(demandes);
  } catch (error) {
    console.error("Error fetching demands:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get demands by formateur ID
router.get("/byFormateur/:formateurId", async (req, res) => {
  const formateurId = req.params.formateurId;

  try {
    const demandesByFormateur = await database.collection("demandes").find({ formateurId:formateurId }).toArray();
    res.send(demandesByFormateur);
  } catch (error) {
    console.error("Error fetching demands by formateur ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete demand by ID
router.delete("/:id", async (req, res) => {
  const demandeId = req.params.id;

  try {
    const deletedDemande = await database.collection("demandes").findOneAndDelete({ id: demandeId });
    res.send(deletedDemande.value);
  } catch (error) {
    console.error("Error deleting demand:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/", async (req, res) => {
  const newDemande = req.body;

  try {
    // Insérez la nouvelle demande dans la collection MongoDB
    const insertedDemande = await database.collection("demandes").insertOne(newDemande);

    // Vous pouvez gérer l'insertion dans votre tableau local si nécessaire

    res.send(insertedDemande);
  } catch (error) {
    console.error("Erreur lors de la création de la demande :", error);
    res.status(500).send("Erreur interne du serveur");
  }
});

export default router;
