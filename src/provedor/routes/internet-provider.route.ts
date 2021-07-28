import { Builder } from "builder-pattern";
import express, { Request, Response } from "express";
import { ChatSettingsModel } from "../model/chat-settings.model";
import { InternetProviderSettingsModel } from "../model/internet-provider-settings.model";
import { InternetProviderModel } from "../model/internet-provider.model";
import { MetricsModel } from "../model/metrics.model";
import { UserModel } from "../model/user.model";
import { internetProviderEntity } from "../schemas/internet-provider.schema";
import { metricsEntity } from "../schemas/metrics.schema";
import { ChatSettingsService } from "../service/chat-settings.service";
import { InternetProviderSettingsService } from "../service/internet-provider-settings.service";
import { MetricsService } from "../service/metrics.service";
import { UserService } from "../service/user.service";

export const internetProviderRoute = express.Router();

internetProviderRoute.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const newMetrics = (await MetricsService.create(Builder<MetricsModel>()
            .conversations([])
            .impressions([])
            .build()));
        const newUser = (await UserService.create(Builder<UserModel>()
            .username(body.username)
            .password(body.password)
            .build()));

        const newProviderSettings = (await InternetProviderSettingsService.create(Builder<InternetProviderSettingsModel>()
            .build()));

        const newChatSettings = (await ChatSettingsService.create(Builder<ChatSettingsModel>()
            .build()));

        const newInternetProvider = Builder<InternetProviderModel>()
            .users([newUser.id])
            .metrics(newMetrics.id)
            .providerSettings(newProviderSettings.id)
            .chatSettings(newChatSettings.id)
            .build();

        res.send(await internetProviderEntity.create(newInternetProvider));
    } catch (err) {
        res.status(500).json(err);
    }
});

internetProviderRoute.get('/:providerId', async (req: Request, res: Response) => {
    const response = await internetProviderEntity
        .findById(req.params.providerId)
        .populate('users')
        .populate(
            {
                path: 'chatSettings',
                populate: {
                    path: 'location',
                    select: ['districts', 'fileName']
                }
            }
        )
        .populate('providerSettings')
        .populate('metrics');
    res.send(response);
});

internetProviderRoute.put('/add/user/:providerId', async (req: Request, res: Response) => {
    const newUser = await UserService.create(req.body);
    const response = await internetProviderEntity
        .updateOne(
            {
                _id: req.params.providerId
            },
            {
                $push: {
                    users: newUser.id
                }
            }
        )
    res.json(newUser);
});

internetProviderRoute.get('', async (req: Request, res: Response) => {
    res.json(await internetProviderEntity.find().populate('users'));
});

