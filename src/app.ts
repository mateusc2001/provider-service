import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from "helmet";
import * as dotenv from "dotenv";
// import { provedorRouter } from './provedor/provedor.route';
import { internetProviderRoute } from './provedor/routes/internet-provider.route';
import { metricsRoute } from './provedor/routes/metrics.route';
import { userRoute } from './provedor/routes/user.route';
import { internetProviderSettingsRoute } from './provedor/routes/internet-provider-settings.route';
import { locationRoute } from './provedor/routes/location.route';
import { chatSettingsRoute } from './provedor/routes/chat-settings.route';
import { loginRoute } from './provedor/routes/login.route';
import bodyParser from 'body-parser';
import {leadsRoute} from "./provedor/routes/leads.route";
import {conversationRoute} from "./provedor/routes/conversation.route";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(bodyParser({limit: '50mb'}));
        this.middlewares();
        this.database();
        this.routes();
        this.express.use(helmet());
        dotenv.config();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private database() {
        // const url = 'mongodb://mateus:123@clusterhotel-shard-00-00-rc4kb.mongodb.net:27017,clusterhotel-shard-00-01-rc4kb.mongodb.net:27017,clusterhotel-shard-00-02-rc4kb.mongodb.net:27017/barbershop_tst?ssl=true&replicaSet=ClusterHotel-shard-0&authSource=admin&retryWrites=true&w=majority'
        const uri = `mongodb+srv://mateus:11990088@clusterhotel.rc4kb.mongodb.net/forcebot-dev?retryWrites=true&w=majority`;
        mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    }

    private routes(): void {
        const ambiente = process.env.NODE_ENV;
        let urlOrigem: string = 'dev';
        switch (ambiente) {
            case 'e2e':
                urlOrigem = 'e2e';
                break;
            case 'prod':
                urlOrigem = 'prod';
                break;
            default:
                urlOrigem = 'dev';
                break;
        }
        const origemApi = `/${urlOrigem}/forcebot`;

        this.express.use(origemApi.concat('/user'), userRoute);
        this.express.use(origemApi.concat('/leads'), leadsRoute);
        this.express.use(origemApi.concat('/login'), loginRoute);
        this.express.use(origemApi.concat('/metrics'), metricsRoute);
        this.express.use(origemApi.concat('/location'), locationRoute);
        this.express.use(origemApi.concat('/conversation'), conversationRoute);
        this.express.use(origemApi.concat('/chat-settings'), chatSettingsRoute);
        this.express.use(origemApi.concat('/internet-provider'), internetProviderRoute);
        this.express.use(origemApi.concat('/internet-provider-settings'), internetProviderSettingsRoute);
    }
}

export default new App().express