"use strict";
// import { Builder } from "builder-pattern";
// import express, { Request, Response } from "express";
// import { ProvedorSchemaModel } from "./model/provedor-schema.model";
// import { PaginationResponse } from "./model/response/pagination.response";
// import { internetProviderEntity } from "./schemas/internet-provider.schema";
// import { provedorEntity } from "./schemas/provedor.schema";
// import { DateUtils } from "./utils/date.utils";
// export const provedorRouter = express.Router();
// provedorRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const items: ProvedorSchemaModel[] = await provedorEntity.find();
//         const response = items.map(item => {
//             return Builder<ProvedorSchemaModel>()
//                 .id(item.id)
//                 .username(item.username)
//                 .password(item.password)
//                 .createdAt(DateUtils.getActualDateTimezone(item.createdAt))
//                 .updatedAt(DateUtils.getActualDateTimezone(item.updatedAt))
//                 .build();
//         });
//         res.status(200).send(response);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
// provedorRouter.get("/start/:start/end/:end/page/:page/count/:count", async (req: Request, res: Response) => {
//     try {
//         const page = Number(req.params.page);
//         const count = Number(req.params.count);
//         const start: Date = DateUtils.getActualDateTimezone(new Date(req.params.start), +3);
//         const end: Date = DateUtils.getActualDateTimezone(new Date(req.params.end), +3);
//         const totalItems: number = await provedorEntity.find({
//             createdAt: {
//                 $gte: start,
//                 $lt: end
//             }
//         }).count();
//         const items: ProvedorSchemaModel[] = await provedorEntity.find({
//             createdAt: {
//                 $gte: start,
//                 $lt: end
//             }
//         })
//             .limit(count)
//             .skip(count * (page - 1));
//         const response = items.map(item => {
//             return Builder<ProvedorSchemaModel>()
//                 .id(item.id)
//                 .username(item.username)
//                 .password(item.password)
//                 .createdAt(DateUtils.getActualDateTimezone(item.createdAt, -3))
//                 .updatedAt(DateUtils.getActualDateTimezone(item.updatedAt, -3))
//                 .build();
//         });
//         res.status(200).send(new PaginationResponse(page, totalItems / count, totalItems, response));
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
//     // const dt = DateUtils.getActualDateTimezone(new Date());
//     // const meiaHora = (new Date(dt.getTime() - (.5 * 60 * 60 * 1000)));
// });
// provedorRouter.get("/:id", async (req: Request, res: Response) => {
//     try {
//         const provedor = await provedorEntity.findById(req.params.id);
//         res.status(200).send(provedor);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
// provedorRouter.post("/", async (req: Request, res: Response) => {
//     try {
//         const novoProvedorRequest: ProvedorSchemaModel = Builder<ProvedorSchemaModel>()
//             .username(req.body.username)
//             .password(req.body.password)
//             .build();
//         const novoProvedor = await provedorEntity.create(novoProvedorRequest)
//         res.status(200).send(novoProvedor);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
// provedorRouter.post("/internet-provider", async (req: Request, res: Response) => {
//     try {
//         const novoProvedorRequest = {
//             users: req.body.users
//         }
//         const novoProvedor = await internetProviderEntity.create(novoProvedorRequest)
//         res.status(200).send(novoProvedor);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
// provedorRouter.get("/internet/provider", async (req: Request, res: Response) => {
//     try {
//         const response = (await internetProviderEntity.find().populate('users'));
//         res.status(200).send(response);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
