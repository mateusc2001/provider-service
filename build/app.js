"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv = __importStar(require("dotenv"));
// import { provedorRouter } from './provedor/provedor.route';
var internet_provider_route_1 = require("./provedor/routes/internet-provider.route");
var metrics_route_1 = require("./provedor/routes/metrics.route");
var user_route_1 = require("./provedor/routes/user.route");
var internet_provider_settings_route_1 = require("./provedor/routes/internet-provider-settings.route");
var location_route_1 = require("./provedor/routes/location.route");
var chat_settings_route_1 = require("./provedor/routes/chat-settings.route");
var login_route_1 = require("./provedor/routes/login.route");
var body_parser_1 = __importDefault(require("body-parser"));
var App = /** @class */ (function () {
    function App() {
        this.express = express_1.default();
        this.express.use(body_parser_1.default({ limit: '50mb' }));
        this.middlewares();
        this.database();
        this.routes();
        this.express.use(helmet_1.default());
        dotenv.config();
    }
    App.prototype.middlewares = function () {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    };
    App.prototype.database = function () {
        // const url = 'mongodb://mateus:123@clusterhotel-shard-00-00-rc4kb.mongodb.net:27017,clusterhotel-shard-00-01-rc4kb.mongodb.net:27017,clusterhotel-shard-00-02-rc4kb.mongodb.net:27017/barbershop_tst?ssl=true&replicaSet=ClusterHotel-shard-0&authSource=admin&retryWrites=true&w=majority'
        var uri = "mongodb+srv://mateus:11990088@clusterhotel.rc4kb.mongodb.net/forcebot-dev?retryWrites=true&w=majority";
        mongoose_1.default.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    };
    App.prototype.routes = function () {
        var ambiente = process.env.NODE_ENV;
        var urlOrigem = 'dev';
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
        var origemApi = "/" + urlOrigem + "/forcebot";
        // console.log(`Origem API: `, origemApi);
        this.express.use(origemApi.concat('/internet-provider'), internet_provider_route_1.internetProviderRoute);
        this.express.use(origemApi.concat('/metrics'), metrics_route_1.metricsRoute);
        this.express.use(origemApi.concat('/user'), user_route_1.userRoute);
        this.express.use(origemApi.concat('/internet-provider-settings'), internet_provider_settings_route_1.internetProviderSettingsRoute);
        this.express.use(origemApi.concat('/location'), location_route_1.locationRoute);
        this.express.use(origemApi.concat('/chat-settings'), chat_settings_route_1.chatSettingsRoute);
        this.express.use(origemApi.concat('/login'), login_route_1.loginRoute);
    };
    return App;
}());
exports.default = new App().express;
