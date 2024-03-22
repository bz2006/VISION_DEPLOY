import  express  from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectdb from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors"
import categoryRoute from "./routes/categoryRoute.js"
import razorpayRoutes from "./routes/rzppaymentRoute.js"
import productRoute from "./routes/productRoute.js"
import usersRoute from "./routes/usersRoute.js"
import cartRoute from "./routes/cartRoute.js"
import OrderRoutes from "./routes/orderRoute.js"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = path.join(__dirname  , "./client/build");

const app = express()//express
connectdb();//Database


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category", categoryRoute);
app.use(express.static('public'));
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/razorpay", razorpayRoutes); 
app.use("/api/v1/orders", OrderRoutes); 

app.get("/*", function(req, res){

  res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('****Server Started on '+process.env. DEV_MODE +" Mode PORT:"+ PORT+"****")
})

 