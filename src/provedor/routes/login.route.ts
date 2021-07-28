import express, { Request, Response } from "express";
import { internetProviderEntity } from "../schemas/internet-provider.schema";
import { userEntity } from "../schemas/user.schema";

export const loginRoute = express.Router();

loginRoute.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const username = body.username;
        const password = body.password;
        const query = { 'username': username, 'password': password };
        const userId = await userEntity.findOne(query).select('_id');
        const response: any = (await internetProviderEntity
            .find()
            .populate('providerSettings')
            .populate(
                {
                    path: 'chatSettings',
                    populate: {
                        path: 'location',
                        select: ['districts', 'fileName']
                    }
                }
            )
            .populate({
                path: 'users',
                match: { _id: userId?.id }
            }))
            .find(provider => {
                return provider.users.some(user => user?._id == userId?.id);
            });
        if (!!response) {
            res.json(
                {
                    id: response.id,
                    createdAt: response.createdAt,
                    updatedAt: response.updatedAt,
                    metrics: response.metrics,
                    providerSettings: response.providerSettings,
                    chatSettings: response.chatSettings,
                    user: response.users[0]
                }
            );
        } else {
            res.status(404).json({ erro: 'Usuario ou senha inválida.' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});