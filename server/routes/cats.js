const CatController = require("../controllers/CatController");
const { authorizeCat } = require("../middlewares/authorization");
const upload = require("../middlewares/multer");
const uploadMultiple = require("../middlewares/uploadMultiple");

const router = require("express").Router();

router.get("/", CatController.findUserCats);
router.post(
  "/",
  upload.array("images"),
  uploadMultiple,
  CatController.createCat
);
// router.post("/images", upload.array("images"), uploadMultiple);
router.put("/:id", authorizeCat, CatController.editCat);
router.patch("/:id", authorizeCat, CatController.changeCatStatus);
router.delete("/:id", authorizeCat, CatController.deleteCat);

module.exports = router;
