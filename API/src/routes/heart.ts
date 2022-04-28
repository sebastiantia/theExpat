import { Router } from "express";
import { Heart } from "../models/Heart";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuth";
import { Post } from "../models/Post";

export const router = Router();

router.get("/all_hearted_posts", isAuth, async (_, res) => {
  const heartedPhotos = await getConnection()
    .createQueryBuilder(Heart, "heart")
    .leftJoinAndSelect("heart.post", "post")
    .where("heart.userId = :userId", {
      userId: res.locals.user.id,
    })
    .getMany();
  res.json(heartedPhotos);
});

router.get("/is_hearted/:id", async (req, res) => {
  const { id } = req.params;

  const postId = parseInt(id);

  if (!req.session || !req.session.userId) {
    res.json({ heart: false });
    return;
  }

  let post = await Heart.findOne({ userId: req.session.userId, postId });

  if (!post) {
    res.json({ heart: false });
    return;
  }

  res.json({ heart: true });
});

router.post("/heart_post", isAuth, async (req, res) => {

  const id = req.body.id;
  const postId = id;

  const heart = await getConnection()
    .createQueryBuilder()
    .select("heart")
    .from(Heart, "heart")
    .where("heart.postId = :postId", {
      postId,
    })
    .getOne();

  console.log("TESTETETSTETST")
  console.log(heart)
  if (!heart) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Heart)
      .values({
        userId: res.locals.user.id,
        postId,
      })
      .returning("*")
      .execute();

    await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ heartcount: () => "heartcount + 1" })
      .where("id = :id", { id: postId })
      .execute();

    res.json({ heart: true });
    return;
  } else {
    await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ heartcount: () => "heartcount - 1" })
      .where("id = :id", { id: postId })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Heart)
      .where("postId = :postId and userId = :userId", {
        postId,
        userId: res.locals.user.id,
      })
      .execute();

    res.json({ heart: false });
  }
});

export { router as HeartRouter };
