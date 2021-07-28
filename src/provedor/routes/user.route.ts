import express, { Request, Response } from "express";
import { userEntity } from "../schemas/user.schema";
import { UserService } from "../service/user.service";

export const userRoute = express.Router();

userRoute.get('/', async (req: Request, res: Response) => {
    res.json(await UserService.findAll());
});

userRoute.post('/', async (req: Request, res: Response) => {
    res.json(await UserService.create(req.body));
});

userRoute.get('/:userId', async (req: Request, res: Response) => {
    res.json(await UserService.findById(req.params.userId));
});