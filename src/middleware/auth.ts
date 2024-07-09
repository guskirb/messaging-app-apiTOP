import { Request, Response, NextFunction } from "express";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.id === req.params.id) {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }
};
