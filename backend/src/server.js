import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connected } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";
import { createServer } from "http";
import { clerkMiddleware } from "@clerk/express";

import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import songRouter from "./routes/song.route.js"
import path from "path";
dotenv.config();

const PORT = process.env.PORT ||5000;
const app = express();
const __dirname = path.resolve();

const httpServer = createServer(app);
initializeSocket(httpServer);

connected();

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/songs", songRouter)

httpServer.listen(PORT, () => {
  console.log("is connecting");
});
// app.listen(5000, () => {
//   console.log("is connecting");
// });
