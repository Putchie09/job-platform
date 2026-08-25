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

/**
 * @openapi
 * /api/admin/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: job_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status_id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of applications
 *       401:
 *         description: Unauthorized
 */
router.get("/", getApplications);

/**
 * @openapi
 * /api/admin/applications/{id}:
 *   get:
 *     summary: Get application details, including status history
 *     tags: [Applications - Admin]
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
 *         description: Application details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.get("/:id", getApplicationById);

/**
 * @openapi
 * /api/admin/applications/{id}/status:
 *   patch:
 *     summary: Update application status (also logs to status history and queues a notification email)
 *     tags: [Applications - Admin]
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
 *             required: [status_id]
 *             properties:
 *               status_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Status updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.patch("/:id/status", updateApplicationStatus);

/**
 * @openapi
 * /api/admin/applications/{id}/resume:
 *   get:
 *     summary: Download the candidate's resume file
 *     tags: [Applications - Admin]
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
 *         description: Resume file
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Resume or application not found
 */
router.get("/:id/resume", downloadResume);

export default router;
