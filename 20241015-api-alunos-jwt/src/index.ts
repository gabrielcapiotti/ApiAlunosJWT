import express from "express";
import * as dotenv from "dotenv";
import studentsRoutes from "./routes/students.routes";
import classroomsRoutes from "./routes/classrooms.routes";
import registrationsRoutes from "./routes/registrations.routes";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";
import avaliationsRoutes from "./routes/avaliations.routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/students", studentsRoutes());
app.use("/classrooms", classroomsRoutes());
app.use("/registrations", registrationsRoutes());
app.use("/users", usersRoutes());
app.use("/auth", authRoutes());
app.use("/avaliations", avaliationsRoutes());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}...`);
});
