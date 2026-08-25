import { Router } from "express";
import upload from "../../config/upload";
import { createApplication } from "./applications.controller";

const router = Router({ mergeParams: true });

router.post("/", upload.single("resume"), createApplication);

export default router;
