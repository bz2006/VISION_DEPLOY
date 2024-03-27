import  express  from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectdb from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors"
import categoryRoute from "./routes/categoryRoute.js"
import bodyParser from 'body-parser';
import razorpayRoutes from "./routes/rzppaymentRoute.js"
import productRoute from "./routes/productRoute.js"
import usersRoute from "./routes/usersRoute.js"
import cartRoute from "./routes/cartRoute.js"
import OrderRoutes from "./routes/orderRoute.js"
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from "./middlewares/nodemailerMiddleware.js";
import { sendwelcomemail } from "./middlewares/nodemailerMiddleware.js";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()//express
connectdb();//Database


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/razorpay", razorpayRoutes); 
app.use("/api/v1/orders", OrderRoutes); 
app.use(express.static(path.join(__dirname, "client/build")))
app.use(express.static(path.join(__dirname, 'client', 'public')));

app.post('/send-email', sendEmail);
app.post('/send-welcome-mail', sendwelcomemail);

// Serve the React frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('****Server Started on '+process.env. DEV_MODE +" Mode PORT:"+ PORT+"****")
})

 