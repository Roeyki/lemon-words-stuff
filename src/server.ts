import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {Facade} from "./Handlers/serverFacade";
import {countRouteValidation, statisticsRouteValidation} from "./Handlers/utils";

const app = express();
const port = 5050;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(cors());

app.post('/count', countRouteValidation, Facade.parseAndCount);
app.get('/query', statisticsRouteValidation, Facade.query);
app.listen(port, Facade.boot);
