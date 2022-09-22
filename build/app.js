"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Added the below to ensure our DB has access to the app (or vice versa) - KT
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001'
};
app.use(cors(corsOptions));
// routes
app.use('/api/users', userRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).end();
});
//  Katie please look at this section is this correct?
// Looks good to me - the true test will be if it works :D -KT
models_1.db.sync({ alter: true }).then(() => {
    console.info('you are soo connected right now!');
});
app.listen(3000);
