import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import AppointmentController from "./app/controllers/AppointmentController";
import SubscriptionController from "./app/controllers/SubscriptionController";

import authMiddleware from "./app/middlewares/auth";
import Subscription from "./app/models/Subscription";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/appointments", AppointmentController.index);
routes.post("/appointments", AppointmentController.store);
routes.put("/appointments/:id", AppointmentController.update);
routes.delete("/appointments/:id", AppointmentController.delete);

routes.get("/subscriptions", SubscriptionController.index);
routes.post(
  "/appointments/:appointmentId/subscriptions",
  SubscriptionController.store
);

export default routes;
