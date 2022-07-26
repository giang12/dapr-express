import express from "express";
import { DaprClient, CommunicationProtocolEnum } from "@dapr/dapr";
import { InitRequest, SendResponse } from "./middlewares"
import { setupCors, setupAuth, setupRoutes } from "./components"
import { settings, ROUTES } from "./settings"
import { Hooks } from "./middlewares/hooks"

const client = new DaprClient(settings.daprHost, settings.daprPort, CommunicationProtocolEnum.GRPC);

const app = express();
setupCors(app, settings, ROUTES);
setupAuth(app, settings, ROUTES);
//@TODO
//setupRateLimiters(app, settings, ROUTES);

//#1 begin req
app.use(InitRequest)
//#2
if (settings.beforeHooks) {
    settings.beforeHooks.forEach((hook: string) => {
        //@ts-ignore
        app.use(Hooks[hook.toString().toLowerCase() as keyof typeof Hooks]({ serverSettings: settings, routes: ROUTES, daprClient: client }));
    })
}
//#3
setupRoutes(app, client, settings, ROUTES);
//#4
if (settings.afterHooks) {
    settings.afterHooks.forEach((hook: string) => {
        //@ts-ignore
        app.use(Hooks[hook.toString().toLowerCase() as keyof typeof Hooks]({ serverSettings: settings, routes: ROUTES, daprClient: client }));
    })
}
//#5 done
app.use(SendResponse)

app.listen(settings.port);