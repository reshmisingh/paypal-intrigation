import "dotenv/config.js"; // loads variables from .env file
import express from "express";
import * as paypal from "./paypal-api.js";

const app = express();

app.use(express.static("public"));

app.post("/api/orders", async (req, res) => {
  try {
    const order = await paypal.createOrder();
    console.log(order);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await paypal.capturePayment(orderID);
    console.log(captureData);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// app listens on 3000 port 
app.listen( 3000 , () => {
  console.log(' app listening on 3000 '); 
})
