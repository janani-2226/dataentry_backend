const express = require("express");
const app = express();
app.use(express.json());
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv").config();

const url = process.env.DB;


app.use(
    cors({
        origin:"http://localhost:3000"
    })
)

app.post("/data", async (req, res) => {
    try {
        const connection = await MongoClient.connect(url);
        const db = connection.db("dataentry");
        await db.collection("data").insertOne(req.body);
        await connection.close();
        res.json({ message: "Data Entered" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
})
app.get("/data", async (req, res) => {
    try {
        const connection = await MongoClient.connect(url);
        const db = connection.db("dataentry");
        const store = await db.collection("data").find().toArray();
        await connection.close();
        res.json(store)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })

    }
})

app.listen(3003);

//jananiselva2618
//E0QtZTQoayX84diF

//mongodb+srv://jananiselva2618:E0QtZTQoayX84diF@cluster0.zwahnva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
