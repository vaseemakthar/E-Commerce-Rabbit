const express = require("express")
const cors =require("cors")
const dotenv =require("dotenv")
const connectDB =require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoutes = require("./routes/subscriberRoutes")
const adminRoutes=require("./routes/adminRoutes")
const productAdminRoutes=require("./routes/productAdminRoutes")
const adminOrderRoutes=require("./routes/adminOrderRoutes")

const app=express()
app.use(express.json())
const corsOptions = {
  origin: [
    "https://ecommerce-vaseem-akthars-projects.vercel.app/", // your frontend URL
    "http://localhost:5173" // local dev
  ],
  credentials: true
};

app.use(cors(corsOptions));
// app.use(cors({ origin: "*" }));

// Serve static files from uploads folder
app.use("/uploads", express.static("uploads"))

dotenv.config()

const dns=require("dns")
dns.setServers(["8.8.8.8"])

const PORT = process.env.PORT || 3000

connectDB()

app.get("/", (req, res)=>{
    res.send("WELCOME TO MY API!")
})

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout",checkoutRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api",subscribeRoutes)

//admin routes
app.use("/api/admin/users/",adminRoutes)
app.use("/api/admin/products/",productAdminRoutes)
app.use("/api/admin/orders",adminOrderRoutes)

app.listen(PORT, ()=>{
    console.log(`server is runnning on: http://localhost:${PORT}`)
})

