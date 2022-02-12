import { Router } from "express";
import { Post } from "../models/Post";
import { getConnection } from "typeorm";
import {getRepository} from "typeorm";


export const router = Router();

// const postRepo = getRepository(Post);

router.get("/", async (_, res) => {
  const result = await getConnection()
    .createQueryBuilder()
    .select("post")
    .from(Post, "post")
    .getMany();

  res.json(result);
  // res.json("get request for posts")

});

router.post('/add', async (req, res, next) => {

  const post = await getConnection()
  .createQueryBuilder()
  .insert()
  .into(Post)
  .values( {
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    visitDate: req.body.visitDate,

  })
  .returning("*")
  .execute()

  res.json(post)
})

router.post('/delete', async (req, res, next) => {
  const { id }: { id: number } = req.body;
  try {
  const post = await getConnection()
  .createQueryBuilder()
  .delete()
  .from(Post)
  .where("post.id = :id", { id})
  .execute();
  res.json(post)
  }catch(e) {
    res.json(e);
  }
})


export { router as PostRouter };
