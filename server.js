const express = require("express");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const requestRoutes = require("./src/routes/requestRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "public")));

app.use(
  session({
    secret: "vku-care-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.message = req.session.message || null;
  res.locals.currentPath = req.path;
  res.locals.initials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(-2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "VK";
  res.locals.statusClass = (status = "") => {
    const mapping = {
      "Chờ tiếp nhận": "pending",
      "Đang xử lý": "processing",
      "Cần bổ sung": "warning",
      "Hoàn thành": "done"
    };
    return mapping[status] || "neutral";
  };
  delete req.session.message;
  next();
});

app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/requests", requestRoutes);
app.use("/ai", aiRoutes);
app.use("/admin", adminRoutes);
app.use("/", profileRoutes);

app.use((req, res) => {
  res.status(404).send("Không tìm thấy trang");
});

app.listen(3000, () => {
  console.log("VKU Care đang chạy tại http://localhost:3000");
});
