import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

type UserType = {
  user: {
    id: number;
    username: string;
  };
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || ""
  );
  console.log("hello");
  console.log(" token ", token);
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = user;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }
};
