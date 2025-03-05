// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import planRoutes from "./routes/plan.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import imageKitRoute from "./routes/imageKit.js";
import challengeRoutes from "./routes/challenge.routes.js";
import { PayData } from "./config/payu.config.js";
import crypto from "crypto";

// Database connection
import { connectionToDb } from "./config/user.dbConfig.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

// Middleware setup
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to the coding club");
});

app.use("/api/challenges", challengeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/image", imageKitRoute);

app.post("/api/get-payment", async (req, res) => {
  try {
    const txn_id = "PAYU_MONEY_" + Math.floor(Math.random() * 8888888);
    const { amount, product, firstname, email, mobile } = req.body;

    let udf1 = "";
    let udf2 = "";
    let udf3 = "";
    let udf4 = "";
    let udf5 = "";

    const hashString = `${
      PayData.payu_key
    }|${txn_id}|${amount}|${JSON.stringify(
      product
    )}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${
      PayData.payu_salt
    }`;
    // console.log(hashString);

    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const data = await PayData.payuClient.paymentInitiate({
      isAmountFilledByCustomer: false,
      txnid: txn_id,
      amount: amount,
      currency: "INR",
      productinfo: JSON.stringify(product),
      firstname: firstname,
      email: email,
      phone: mobile,
      surl: `${process.env.BACKEND_URL}/api/verify/${txn_id}`,
      furl: `${process.env.BACKEND_URL}/api/verify/${txn_id}`,
      hash,
    });
    res.send(data);
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      stack: error.stack,
    });
  }
});

app.post("/api/verify/:txnid", async (req, res) => {
  // res.send("Done")
  const verified_Data = await PayData.payuClient.verifyPayment(
    req.params.txnid
  );
  const data = verified_Data.transaction_details[req.params.txnid];

  res.redirect(
    `${process.env.FRONTEND_URL}/payment/status?status=${data.status}&txnid=${data.txnid}`
  );
  // res.send({
  //     status:data.status,
  //     amt:data.amt,
  //     txnid:data.txnid,
  //     method:data.mode,
  //     error:data.error_Message,
  //     created_at:new Date(data.addedon).toLocaleString()
  // })
  // PAYU_MONEY_4996538
});

// Start the server and connect to the database
app.listen(port, async () => {
  try {
    await connectionToDb();
    console.log(`Server is running on port ${port}`);
    // bgCyan.white ccolor
  } catch (error) {
    console.error("Unable to connect to the database", error);
    process.exit(1); // Exit with failure if DB connection fails
  }
});
