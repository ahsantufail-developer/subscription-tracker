import { Router } from "express";

const userRouter = Router();
import { getUsers, getUser } from "../controllers/user.controller.js";


userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", (req, res) => res.send({ title: "POST new user" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
