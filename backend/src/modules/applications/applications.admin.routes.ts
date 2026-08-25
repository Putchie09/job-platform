import { Router } from "express";
import {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  downloadResume,
} from "./applications.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.patch("/:id/status", updateApplicationStatus);
router.get("/:id/resume", downloadResume);

export default router;
