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

/**
 * @openapi
 * /api/admin/jobs:
 *   get:
 *     summary: Get all job postings (active and inactive)
 *     tags: [Jobs - Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all job postings
 *       401:
 *         description: Unauthorized
 */
router.get("/", getAdminJobs);

/**
 * @openapi
 * /api/admin/jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs - Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, responsibilities, requirements, location_id, department_id, modality_id, employment_type_id]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salary:
 *                 type: string
 *               positions_available:
 *                 type: integer
 *               additional_info:
 *                 type: string
 *               location_id:
 *                 type: integer
 *               department_id:
 *                 type: integer
 *               modality_id:
 *                 type: integer
 *               employment_type_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Job posting created
 *       401:
 *         description: Unauthorized
 */
router.post("/", createJob);

/**
 * @openapi
 * /api/admin/jobs/{id}:
 *   put:
 *     summary: Update a job posting
 *     tags: [Jobs - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salary:
 *                 type: string
 *               positions_available:
 *                 type: integer
 *               additional_info:
 *                 type: string
 *               location_id:
 *                 type: integer
 *               department_id:
 *                 type: integer
 *               modality_id:
 *                 type: integer
 *               employment_type_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Job posting updated
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", updateJob);

/**
 * @openapi
 * /api/admin/jobs/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a job posting
 *     tags: [Jobs - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job posting deactivated
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/deactivate", deactivateJob);

export default router;
