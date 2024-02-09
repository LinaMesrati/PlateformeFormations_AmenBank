import { Router } from "express";
import { database } from "../server";
import asyncHandler from "express-async-handler";
import { FormModel } from "../models/formation.model";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/", asyncHandler(async (req, res) => {
    try {
        const forms = await database.collection("forms").find().toArray();
        res.send(forms);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).send("Internal Server Error");
    }
}));

router.get("/byCateg", asyncHandler(async (req, res) => {
    const cat = req.query.categ;
    try {
        const formsCat = await database.collection("forms").find({ categ: cat }).toArray();
        res.send(formsCat);
    } catch (error) {
        console.error("Error fetching forms by category:", error);
        res.status(500).send("Internal Server Error");
    }
}));



router.get("/:id", asyncHandler(async (req, res) => {
  const formationId = req.params.id;
  try {
      const form = await database.collection("forms").findOne({ id:formationId});
      res.send(form);
  } catch (error) {
      console.error("Error fetching formation by ID:", error);
      res.status(500).send("Internal Server Error");
  }
}));


router.post("/", asyncHandler(async (req, res) => {
    const formData = req.body;
    console.log(formData);
    try {
        // Create a new FormModel instance with the received data
        const newForm = new FormModel(formData);

        // Convert Mongoose model instance to a plain JavaScript object
        const formObject = newForm.toObject();

        console.log("Form Object Before Inserting into MongoDB:", formObject);

        // Save the form to the MongoDB collection
        const result = await database.collection("forms").insertOne(formObject);

        console.log("Insert Result:", result);

        // Respond with the created form data and status 201 (Created)
        res.status(201).json(result.ops && result.ops.length > 0 ? result.ops[0] : {});
  // <-- Error occurs here
    } catch (error) {
        console.error("Error creating form:", error);
        res.status(500).send("Internal Server Error");
    }
}));


// Update formation by ID
router.put("/:id", asyncHandler(async (req, res) => {
    const formationId = req.params.id;
    const updatedModel = req.body;
    try {
        const updatedForm = await database.collection("forms").findOneAndUpdate(
            { id:formationId },
            { $set: updatedModel },
            { returnDocument: 'after' }
        );
        res.send(updatedForm.value);
    } catch (error) {
        console.error("Error updating formation by ID:", error);
        res.status(500).send("Internal Server Error");
    }
}));

// Delete formation by ID
router.delete("/:id", asyncHandler(async (req, res) => {
    const formationId = req.params.id;
    try {
        const deletedForm = await database.collection("forms").findOneAndDelete({id:formationId  });
        res.send(deletedForm.value);
    } catch (error) {
        console.error("Error deleting formation by ID:", error);
        res.status(500).send("Internal Server Error");
    }
}));

router.get('/byFormateur/:formateurId', async (req, res) => {
    const formateurId = req.params.formateurId;
    try {
        const formsByFormateur = await database.collection("forms").find({ formateurId: formateurId }).toArray();
        res.send(formsByFormateur);
    } catch (error) {
        console.error("Error fetching forms by formateur ID:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
