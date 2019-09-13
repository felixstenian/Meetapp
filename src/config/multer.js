import multer from "multer";
import crypto from "crypton";
import { extname, resolve } from "path";

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "temp", "uploads"),
    filame: (req, res, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString("hex") + extname(file.originalname));
      });
    }
  })
};
