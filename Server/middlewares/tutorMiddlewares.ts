import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import Tutor from '../model/tutor'
import * as dotenv from "dotenv";
import { Document } from "mongoose";
dotenv.config();

interface CustomUser {
  _id: string;
  username: string;
  tutor: any | null;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      tutor?: CustomUser;
    }
  }
}

const tutorLoggedin =  (
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Use optional chaining to handle potential undefined headers
    const JWT_SECRET = process.env.JWT_SECRET as string; // Assuming JWT_SECRET is a string in your .env file

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        const tutorId: string = decoded?.userId;

        const tutor: Document | null = await Tutor.findById(tutorId).select(
          "-password"
        );

        if (tutor) {
          req.tutor = tutor as unknown as CustomUser;
          next();
        } else {
          res.status(404);
          throw new Error("User not found");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    }

    if (!token) {
      res.status(401);
    }
  }
);

export { tutorLoggedin };


