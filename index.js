import express from "express";
import { dbConnection } from "./src/database/dbConnection.js";
import color from "@colors/colors"
import cors from 'cors'
import morgan from "morgan";
import { config } from 'dotenv'
import path from 'path'
import { globalResponse } from "./src/utilities/errorHandeling.js";
// import userRouter from "./src/modules/auth/auth.route.js";
config({path: path.resolve('./config/.env')})

const app = express();
const port = process.env.PORT

app.use(cors());

app.use(morgan('dev'));



// 'combined' - Standard Apache combined log output
// 'common' - Standard Apache common log output
// 'dev' - Colored by response status for development
// 'short' - Shorter than default, includes response time
// 'tiny' - Minimal output

app.use(express.json());
dbConnection

// Global error handler - must be after all routes
app.use(globalResponse);
// app.use('/auth',userRouter)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`🥟 app port is `.yellow +  ` ${port} 🦅`.blue.underline)); 





