import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  upload.array("images")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    console.log("uploaded");
    console.log(req.files);
    next();
  });
};

export default uploadMiddleware;
