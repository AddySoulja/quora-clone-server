import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import connectDb from "./databaseConfig/configDb.js";

const app = express();
const port = process.env.PORT || 5000;
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.status(200).send(`Quora Server running...`);
//   });
// }
app.get("/", (req, res) => {
  res.status(200).send(`Quora Server running...`);
});

app.use(errorHandler);
app.use(notFoundHandler);
app.listen(port, () => console.log(`Server started...: ${port}`));

export default app;
