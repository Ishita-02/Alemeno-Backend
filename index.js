import express from "express";
const app = express();
import cors from 'cors'
import loanRoute from './src/routes/route.js'

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("",loanRoute)

const PORT =  3000;
app.listen(PORT, () => console.log("Server is running on port", PORT));