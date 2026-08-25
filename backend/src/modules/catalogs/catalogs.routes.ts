import { Router } from "express";
import {
  getLocations,
  getDepartments,
  getModalities,
  getEmploymentTypes,
} from "./catalogs.controller";

const router = Router();

/**
 * @openapi
 * /api/catalogs/locations:
 *   get:
 *     summary: Get all active locations
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: List of active locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   is_active:
 *                     type: boolean
 */
router.get("/locations", getLocations);

/**
 * @openapi
 * /api/catalogs/departments:
 *   get:
 *     summary: Get all active departments
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: List of active departments
 */
router.get("/departments", getDepartments);

/**
 * @openapi
 * /api/catalogs/modalities:
 *   get:
 *     summary: Get all active work modalities
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: List of active modalities
 */
router.get("/modalities", getModalities);

/**
 * @openapi
 * /api/catalogs/employment-types:
 *   get:
 *     summary: Get all active employment types
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: List of active employment types
 */
router.get("/employment-types", getEmploymentTypes);

export default router;
