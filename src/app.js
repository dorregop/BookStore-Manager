import express from "express";
import categoryRoutes from "./routes/category.routes.js"
import roleRoutes from "./routes/role.routes.js"
import bookRoutes from "./routes/books.routes.js"
import copyRoutes from "./routes/copies.routes.js"
import copyStateRoutes from "./routes/copystate.routes.js"
import usersRoutes from "./routes/users.routes.js"

const app = express();

app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/copies", copyRoutes)
app.use("/api/copyState", copyStateRoutes);
app.use("/api/users", usersRoutes);

export default app;