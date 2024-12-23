import express from "express";
import { getUserByID, loginUser, registerUser, validateUserByID } from "../controllers/user.controller.js";
// import { registerUser } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/:id", getUserByID);
router.get("/validate/:id", validateUserByID);

router.post("/login", loginUser);
router.post("/register", registerUser);


export default router;
