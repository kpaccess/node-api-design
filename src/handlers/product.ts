import { Request, Response } from "express";
import prisma from "../db";

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "string") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  res.json({ data: user?.products });
};

// Get one
export const getOneProduct = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "string") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "string") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req?.user.id,
    },
  });

  res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "string") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

export const deleteProduct = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "string") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: deleted });
};
