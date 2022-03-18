import argon2 from "argon2";
import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { User } from "../models/User";

export const router = Router();

router.get("/me", async (req, res): Promise<void> => {
  if (!req.session.userId) {
    res.json(null);
    return;
  }
  const user = await User.findOne({ id: req.session.userId });
  res.json(user);
});

router.post("/register", async (req, res) => {
  console.log(req.body)
  const homie = await User.findOne({ username: req.body.username });

  if (homie) {
    res.json({ usererror: "Username is already taken" });
    return;
  }

  if (req.body.username.length < 3) {
    res.json({ usererror: "Username is too short :(" });
    return;
  }
  if (req.body.password.length < 3) {
    res.json({ passworderror: "Password is too short :( " });
    return;
  }
  const hashed = await argon2.hash(req.body.password);
  let user;
  try {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: req.body.username,
        password: hashed,
      })
      .returning("*")
      .execute();
    user = result.raw[0];
  } catch (e) {
    console.log("error. ", e);
  }
  console.log(user);

  req.session!.userId = user.id;

  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.json({ usererror: "No user found :(" });
    return;
  }
  const valid = await argon2.verify(user!.password, req.body.password);
  if (!valid) {
    res.json({ passworderror: "Wrong password :(" });
    return;
  }
  req.session!.userId = user.id;

  res.json({ user });
});

router.post("/logout", isAuth, async (req, res) => {
  req.session.destroy(async (e) => {
    if (e) {
      console.log(e);
    }

    res.clearCookie("cookkie");

    res.json(null);
  });
});

export { router as UserRouter };
