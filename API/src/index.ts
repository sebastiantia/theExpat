import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import "dotenv-safe/config";
import { User } from "./models/User";
import cors from "cors";
import Redis from "ioredis";
import { PostRouter } from "./routes/post";
import { Post } from "./models/Post";

const main = async () => {
  const app = express();

  await createConnection({
    type: "postgres",
    database: "proj",
    username: "postgres",
    password: "sebastian88",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });
  app.set("trust proxy", 1);

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(express.json());

  app.use(
    //middle ware
    cors({
      origin: process.env.CORS_ORIGIN, //only requests coming from this browser can talk to our backend
      credentials: true,
    })
  );

  app.use(
    session({
      name: "cookkie",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
        domain: __prod__ ? ".seby.me" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  app.use("/api", PostRouter);

  app.get("/", (_, res) => {
    res.json({
      message: "Hello World!",
    });
  });

  // app.use((req, res, next) => {
  //   const error = new Error(`Not Found - ${req.originalUrl}`);
  //   res.status(404);
  //   next(error);
  // });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
