const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { db } = require("./db/db");
const routes = require("./routes/routes");
const fileUpload = require("express-fileupload");
const uploadRouter = require("./services/Img-2-Txt");

const authRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const corsOptions = {
  credentials: true,
};

//------------MiddleWares------------//
app.use(express.json());

app.use(cors(corsOptions));

app.use(routes);

app.use(express.urlencoded({ extended: false }));

app.use(cors());

//file upload
//app.use(fileUpload())
app.use('/mp3', express.static('./output.mp3'));

//translater history
app.use("/api/translaterhistory", require("./routes/translaterHistoryRoutes"));

//pasan part
app.use('/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

//route for Img-to-txt
app.use(uploadRouter);

const server = () => {
  db();
  app.listen(process.env.PORT, () => {
    console.log("listening to port ", process.env.PORT);
  });
};

server();
