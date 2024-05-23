import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

type UserType = {
  user: {
    id: number;
    username: string;
  };
};

export const createJWT = ({ user }: UserType) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || ""
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("here");
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};
