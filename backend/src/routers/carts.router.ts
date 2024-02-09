// Existing imports...
import { database } from "../server";
import { userModel } from "../models/user.model";
import { Router } from "express";
import { cartModel } from "../models/carts.model";

const router = Router();

const getUserInfo = async (id:string) => {
    try {
        const userInfo = await database.collection("users").findOne({ id: id });

        if (!userInfo) {
            return null;
        }

        return userInfo;
    } catch (error) {
        console.error("Error fetching user information:", error);
        throw error;
    }
};

router.get("/:id", async (req, res) => {
    const id=req.params.id
    try {
        const allCarts = await database.collection("carts").find({id:id}).toArray();
        res.send(allCarts);
        console.log(allCarts);
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/", async (req, res) => {
    try {
        const allCarts = await database.collection("carts").find().toArray();

        if (allCarts.length === 0) {
            console.log("No carts found");
        }

        const cartsWithUserInfo = await Promise.all(allCarts.map((cart: any) => getUserInfo(cart.userId)));


        const result = allCarts.map((cart: any, index: any) => ({
            ...cart,
            user: cartsWithUserInfo[index],
        }));

        res.send(result);
        console.log(allCarts);
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/byUser/:userId", async (req, res) => {
    const  uId =req.params.userId;
    try {
        const allCarts = await database.collection("carts").find({userId:uId}).toArray();

        if (allCarts.length === 0) {
            console.log("No carts found");
        }

        const cartsWithUserInfo = await Promise.all(allCarts.map((cart: any) => getUserInfo(cart.userId)));


        const result = allCarts.map((cart: any, index: any) => ({
            ...cart,
            user: cartsWithUserInfo[index],
        }));

        res.send(result);
        console.log(allCarts);
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    const model = req.body;
    try {
        const newCart = new cartModel(model);
        const cartObject = newCart.toObject();
        const createdCart = await database.collection("carts").insertOne(cartObject);
        res.status(201).send(createdCart.ops[0]);
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    const cartId = req.params.id;

    try {
        const deletedCart = await database.collection("carts").findOneAndDelete({id:cartId });
        res.send(deletedCart.value);
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/byFormId/:formId", async (req, res) => {
    const formId = parseInt(req.params.formId, 10);

    try {
        const cartsWithForm = await database.collection("carts").find({ "forms.fomrId": formId }).toArray();
        console.log(cartsWithForm);
        res.send(cartsWithForm);
    } catch (error) {
        console.error("Error fetching carts by formId:", error);
        res.status(500).send("Internal Server Error");
    }});

    router.put("/:id", async (req, res) => {
        const cartId = req.params.id;
    
        try {
            const updatedCart =  req.body ;
           console.log("up",updatedCart);
            // Check if the updatedCart or its forms are not defined
            if (!updatedCart || !updatedCart.forms) {
                return res.status(400).json({ error: "Invalid request body" });
            }
    
            const updateUrl = `${URL}/${cartId}`;
    
            console.log("Updated Cart:", updatedCart);
            try {
                if (updatedCart.forms.length > 0) {
                    // Exclude the _id field from the update operation
                    delete updatedCart._id;
            
                    await database.collection("carts").updateOne({ id: cartId }, { $set: updatedCart });
                    res.json({ message: "Cart updated successfully" });
                } else {
                    await database.collection("carts").deleteOne({ id: cartId });
                    res.json({ message: "Cart deleted successfully" });
                }
            } catch (error) {
                console.error("Error updating/deleting cart:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
            

        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).json({ error: "Internal Server Error", details: error });
        }
    });
    

export default router;
