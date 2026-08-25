import { Router } from "express";
import {
  getLocations,
  getDepartments,
  getModalities,
  getEmploymentTypes,
} from "./catalogs.controller";

const router = Router();

router.get("/locations", getLocations);
router.get("/departments", getDepartments);
router.get("/modalities", getModalities);
router.get("/employment-types", getEmploymentTypes);

export default router;
