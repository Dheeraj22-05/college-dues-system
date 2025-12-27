require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");

const app = express();
app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/dues", require("./routes/duesRoutes"));
app.use("/api/register", require("./routes/registrationRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
