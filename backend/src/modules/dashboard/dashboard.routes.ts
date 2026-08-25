import { Router } from "express";
import { getDashboardStats } from "./dashboard.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/admin/dashboard:
 *   get:
 *     summary: Get basic dashboard statistics
 *     tags: [Dashboard - Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 active_jobs:
 *                   type: integer
 *                 total_jobs:
 *                   type: integer
 *                 total_applications:
 *                   type: integer
 *                 applications_by_status:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status_id:
 *                         type: integer
 *                       status_name:
 *                         type: string
 *                       count:
 *                         type: integer
 *       401:
 *         description: Unauthorized
 */
router.get("/", getDashboardStats);

export default router;
