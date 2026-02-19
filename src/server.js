import express from "express";
import routes from "./routes.js";
import cors from "cors";
import process from "process";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    // atau origin: "*", (artinya semua)
    // atau origin: true
  }),
);

app.use("/notes", routes);

const port = 3001;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
