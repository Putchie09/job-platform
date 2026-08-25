import { Router } from "express";
import {
  getAdminJobs,
  createJob,
  updateJob,
  deactivateJob,
} from "./jobs.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

// protects all routes
router.use(requireAuth);

router.get("/", getAdminJobs);
router.post("/", createJob);
router.put("/:id", updateJob);
router.patch("/:id/deactivate", deactivateJob);

export default router;
