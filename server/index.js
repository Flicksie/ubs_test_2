import express from 'express';
import { setTimeout } from "timers/promises";
import API from './api/_endpoints.js'

const app = express();
const port = process.env.PORT || 3001;


app.use( async (req,res,next) => {
  // FAKE LOADING TIME
  //await setTimeout(3000);
  next();
})

app.use("/api", API);




app.listen(port, () => console.log(`Listening on port ${port}`));