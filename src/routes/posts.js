import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  getPostsBySearch,
  getAll,
  createOne,
  updateOne,
  deleteOne,
  likePost,
  commentPost
} from "../controllers/posts";

const router = express.Router();

router.get("/search", getPostsBySearch);

router.route("/").get(getAll).post(verifyToken, createOne);

router
  .route("/:postId")
  .put(verifyToken, updateOne)
  .delete(verifyToken, deleteOne);

router.route("/:postId/like").put(verifyToken, likePost);
router.post("/:postId/comment", verifyToken, commentPost);

export default router;
