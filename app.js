var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();
var authenticateToken = require("./routes/jwt/utils/authenticateToken");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user/userRoute");
var farmersRouter = require("./routes/farmer/farmerRoute");
var dbTempRouter = require("./routes/db/dbRoute");
var jwtRouter = require("./routes/jwt/jwtRoute");
var cropRouter = require("./routes/crop/cropRoute");
var issueRouter = require("./routes/issue/issueRoute");
var commentRouter = require("./routes/comment/commentRoute");
var labelRouter = require("./routes/label/labelRoute");
var productRouter = require("./routes/product/productRoute");
var dashboardRouter = require("./routes/dashboard/dashboardRoute");
var imageRouter = require("./routes/image/imageRoute");

var app = express();
const PORT = process.env.PORT || 5000;

//connect to db
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//Routes
app.use("/", indexRouter);
app.use("/api/user", authenticateToken, usersRouter);
app.use("/db", authenticateToken, dbTempRouter);
app.use("/api/farmer", authenticateToken, farmersRouter);
app.use("/api/crop", authenticateToken, cropRouter);
app.use("/api/issue", authenticateToken, issueRouter);
app.use("/api/comment", authenticateToken, commentRouter);
app.use("/api/label", authenticateToken, labelRouter);
app.use("/api/product", authenticateToken, productRouter);
app.use("/api/dashboard", authenticateToken, dashboardRouter);
app.use("/api/image", authenticateToken, imageRouter);

//used to generate token
app.use("/api/jwt", jwtRouter);

//For prod use
// if(process.env.NODE_ENV = "production"){
//     app.use(express.static("client/build"));
//     const path = require("path")
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

module.exports = app;
