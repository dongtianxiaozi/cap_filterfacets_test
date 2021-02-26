"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("reflect-metadata");
const cds_1 = __importDefault(require("@sap/cds"));
const cds_odata_v2_adapter_proxy_1 = __importDefault(require("@sap/cds-odata-v2-adapter-proxy"));
const helmet_1 = __importDefault(require("helmet"));
const uuid_1 = require("uuid");
const ContextManager_1 = require("@Application/ContextManager");
const DIContainer_1 = require("@Application/DIContainer");
const contextManager = DIContainer_1.DIContainer.get(ContextManager_1.ContextManager);
contextManager.initContext();
cds_1.default.on('bootstrap', (app) => {
    app.use(helmet_1.default());
    app.use(function (req, res, next) {
        contextManager.startContext(function () {
            const environment = {
                __UUID: uuid_1.v4(),
                __REQUEST: req,
            };
            res.setHeader('UUID', environment.__UUID);
            contextManager.setEnvironment(environment);
            next();
        });
    });
});
cds_1.default.on('bootstrap', (app) => app.use(cds_odata_v2_adapter_proxy_1.default()));
// @ts-ignore
module.exports = cds_1.default.server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlDQUErQjtBQUMvQiw0QkFBMEI7QUFDMUIsbURBQTJCO0FBQzNCLGlHQUFvRDtBQUNwRCxvREFBNEI7QUFDNUIsK0JBQW9DO0FBR3BDLGdFQUE2RDtBQUM3RCwwREFBdUQ7QUFFdkQsTUFBTSxjQUFjLEdBQW1CLHlCQUFXLENBQUMsR0FBRyxDQUFDLCtCQUFjLENBQUMsQ0FBQztBQUN2RSxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUE7QUFFNUIsYUFBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUNsQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQy9ELGNBQWMsQ0FBQyxZQUFZLENBQUM7WUFDMUIsTUFBTSxXQUFXLEdBQWlCO2dCQUNoQyxNQUFNLEVBQUUsU0FBTSxFQUFFO2dCQUNoQixTQUFTLEVBQUUsR0FBRzthQUNmLENBQUM7WUFDRixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUNILGFBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG9DQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEQsYUFBYTtBQUNiLE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnbW9kdWxlLWFsaWFzL3JlZ2lzdGVyJztcclxuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcclxuaW1wb3J0IGNkcyBmcm9tICdAc2FwL2Nkcyc7XHJcbmltcG9ydCBwcm94eSBmcm9tICdAc2FwL2Nkcy1vZGF0YS12Mi1hZGFwdGVyLXByb3h5JztcclxuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnO1xyXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcclxuaW1wb3J0IHsgUm91dGVyLCBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IElFbnZpcm9ubWVudCB9IGZyb20gJ0BTaGFyZWQvSUVudmlyb25tZW50JztcclxuaW1wb3J0IHsgQ29udGV4dE1hbmFnZXIgfSBmcm9tICdAQXBwbGljYXRpb24vQ29udGV4dE1hbmFnZXInO1xyXG5pbXBvcnQgeyBESUNvbnRhaW5lciB9IGZyb20gJ0BBcHBsaWNhdGlvbi9ESUNvbnRhaW5lcic7XHJcblxyXG5jb25zdCBjb250ZXh0TWFuYWdlcjogQ29udGV4dE1hbmFnZXIgPSBESUNvbnRhaW5lci5nZXQoQ29udGV4dE1hbmFnZXIpO1xyXG5jb250ZXh0TWFuYWdlci5pbml0Q29udGV4dCgpXHJcblxyXG5jZHMub24oJ2Jvb3RzdHJhcCcsIChhcHA6IFJvdXRlcikgPT4ge1xyXG4gIGFwcC51c2UoaGVsbWV0KCkpO1xyXG4gIGFwcC51c2UoZnVuY3Rpb24gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICBjb250ZXh0TWFuYWdlci5zdGFydENvbnRleHQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBlbnZpcm9ubWVudDogSUVudmlyb25tZW50ID0ge1xyXG4gICAgICAgIF9fVVVJRDogdXVpZHY0KCksXHJcbiAgICAgICAgX19SRVFVRVNUOiByZXEsXHJcbiAgICAgIH07XHJcbiAgICAgIHJlcy5zZXRIZWFkZXIoJ1VVSUQnLCBlbnZpcm9ubWVudC5fX1VVSUQpO1xyXG4gICAgICBjb250ZXh0TWFuYWdlci5zZXRFbnZpcm9ubWVudChlbnZpcm9ubWVudCk7XHJcbiAgICAgIG5leHQoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuY2RzLm9uKCdib290c3RyYXAnLCAoYXBwOiBhbnkpID0+IGFwcC51c2UocHJveHkoKSkpO1xyXG4vLyBAdHMtaWdub3JlXHJcbm1vZHVsZS5leHBvcnRzID0gY2RzLnNlcnZlcjtcclxuIl19