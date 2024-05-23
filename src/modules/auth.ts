import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

type UserType = {
  id: number;
  username: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export const createJWT = (user: UserType): string => {
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
    res.json({ message: "Not authorized" });
    return;
  }

  const [, token] = (bearer as string).split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "") as UserType;
    req.user = user;
    next();
    return;
  } catch (e) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }
};
