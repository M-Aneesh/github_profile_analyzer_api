import express from "express";
import { createProfileAnalysis , deleteProfile, getAllProfiles, getProfileByUsername } from "../controllers/profileController.js";

const router = express.Router();

router.post("/", createProfileAnalysis);
router.get("/", getAllProfiles);
router.get("/:username",getProfileByUsername)
router.delete("/:username",deleteProfile)

export default router;