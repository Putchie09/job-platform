import express from "express";
import cors from "cors";
import catalogsRoutes from "./modules/catalogs/catalogs.routes";
import authRoutes from "./modules/auth/auth.routes";
import jobsRoutes from "./modules/jobs/jobs.routes";
import jobsAdminRoutes from "./modules/jobs/jobs.admin.routes";
import applicationsRoutes from "./modules/applications/applications.routes";
import applicationsAdminRoutes from "./modules/applications/applications.admin.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use("/api/catalogs", catalogsRoutes);

app.use("/api/jobs", jobsRoutes);
app.use("/api/admin/jobs", jobsAdminRoutes);
app.use("/api/jobs/:jobId/applications", applicationsRoutes);
app.use("/api/admin/applications", applicationsAdminRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

export default app;
