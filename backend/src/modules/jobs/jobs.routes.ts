import { Router } from "express";
import { getJobs, getJobById } from "./jobs.controller";

const router = Router();

/**
 * @openapi
 * /api/jobs:
 *   get:
 *     summary: Get all active job postings
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: location_id
 *         schema:
 *           type: integer
 *         description: Filter by location id
 *       - in: query
 *         name: department_id
 *         schema:
 *           type: integer
 *         description: Filter by department id
 *     responses:
 *       200:
 *         description: List of active job postings
 */
router.get("/", getJobs);

/**
 * @openapi
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a single active job posting by id
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job posting details
 *       404:
 *         description: Job not found
 */
router.get("/:id", getJobById);

export default router;
