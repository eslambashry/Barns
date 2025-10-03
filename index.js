import express from "express";
import { dbConnection } from "./src/database/dbConnection.js";
import color from "@colors/colors"
import cors from 'cors'
import morgan from "morgan";
import { config } from 'dotenv'
import path from 'path'
import { globalResponse } from "./src/utilities/errorHandeling.js";

// Import Routes
import clientRouter from "./src/modules/client/client.route.js";
import parasiteControlRouter from "./src/modules/parasiteControl/parasiteControl.route.js";
import vaccinationRouter from "./src/modules/vaccination/vaccination.route.js";
import treatmentRouter from "./src/modules/treatment/treatment.route.js";
import labRouter from "./src/modules/lab/lab.route.js";
import horseHealthRouter from "./src/modules/horseHealth/horseHealth.route.js";

config({path: path.resolve('./config/.env')})
const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
dbConnection();

// Routes
app.use('/clients', clientRouter);
app.use('/parasite-control', parasiteControlRouter);
app.use('/vaccination', vaccinationRouter);
app.use('/treatment', treatmentRouter);
app.use('/horse-health', horseHealthRouter);

app.get("/", (req, res) => res.send("Barns Management System API"));

// Global error handler - must be after all routes
app.use(globalResponse);

app.listen(port, () => console.log(`🥟 app port is `.yellow +  ` ${port} 🦅`.blue.underline)); 