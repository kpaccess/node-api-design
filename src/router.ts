import { Router, Request, Response } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { getOneProduct, getProducts, createProduct } from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", (req: Request, res: Response) => {});

router.post("/product", createProduct);

// router.put(
//   "/product/:id",
//   body("name").isString(),
//   handleInputErrors,
//   (req: Request, res: Response) => {}
// );
router.put(
  "/product/:id",
  body("title").optional,
  body("body").optional,
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional,
  (req: Request, res: Response) => {}
);
router.delete("/product/:id", (req: Request, res: Response) => {});

/**
 * Update
 */

router.get("/update", (req: Request, res: Response) => {});

router.get("/update/:id", (req: Request, res: Response) => {});

router.post(
  "/update",
  body("title").exists(),
  body("body").exists().isString(),
  (req: Request, res: Response) => {}
);

router.put("/update/:id", (req: Request, res: Response) => {});

router.delete("/update/:id", (req: Request, res: Response) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req: Request, res: Response) => {});

router.get(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req: Request, res: Response) => {}
);

router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  (req: Request, res: Response) => {}
);

router.put("/updatepoint/:id", (req: Request, res: Response) => {});

router.delete("/updatepoint/:id", (req: Request, res: Response) => {});

export default router;
