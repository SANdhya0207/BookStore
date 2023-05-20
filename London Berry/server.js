const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./config/db");
const stripe = require('stripe')('sk_test_51N7bYASGkJ6I2OuuKAqw61eGL3FBlse3TRQmcSdmLEonaoGH87Dzaua7ynUAiWDm0e0Eb6Jz7FTxskEfwaxElVv500Pfkyxg2G');
const path = require('path');

// configuring file
dotenv.config();

const userRoutes = require("./routes/userRoute.js")

connectDB();

const app = express();
//middlesware
app.use(express.json()); 
// pehle body parser ka use krte the but ab express me json ka use krte hai
app.use(morgan('dev'));
app.use(cors());


// Stripe Payment
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to create a payment intent

app.post('/create-payment-intent', async (req, res) => {
  let DOMAIN = process.env.DOMAIN;
  try {
      const { amount } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Books Bill',
              },
              unit_amount: amount*100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${DOMAIN}/index.html`,
        cancel_url: `${DOMAIN}/checkout.html`,
      });
  
      res.json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// route
app.use("/api/v1/auth",userRoutes)

// port listen
const Port = process.env.Port || 7000;
app.listen(Port,()=>{
      console.log(`Server is running on the port ${Port}`.bgMagenta);
})
