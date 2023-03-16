import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads", // destination folder
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

app.route("/").post(upload.single("file"), (req: Request, res: Response) => {
  console.log(req.file);

  res.send("test");
});

app.route("/:file").get((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/uploads/", req.params.file));
});

// @ts-expect-error
app.listen(5000, console.log(`Server started on ${5000}`));
