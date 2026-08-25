import { Router } from "express";
import upload from "../../config/upload";
import { createApplication } from "./applications.controller";

const router = Router({ mergeParams: true });

/**
 * @openapi
 * /api/jobs/{jobId}/applications:
 *   post:
 *     summary: Submit an application for a job posting (no account required)
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [full_name, email]
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               current_position:
 *                 type: string
 *               education:
 *                 type: string
 *               years_of_experience:
 *                 type: integer
 *               expected_salary:
 *                 type: string
 *               availability:
 *                 type: string
 *               linkedin_portfolio:
 *                 type: string
 *               additional_comments:
 *                 type: string
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Application received
 *       400:
 *         description: Validation error
 *       404:
 *         description: Job not found
 */
router.post("/", upload.single("resume"), createApplication);

export default router;
