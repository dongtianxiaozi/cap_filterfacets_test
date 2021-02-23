"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const cds_1 = __importDefault(require("@sap/cds"));
const cds_routing_handlers_1 = require("cds-routing-handlers");
const path_1 = __importDefault(require("path"));
const GlobalMiddleware_1 = require("@Application/GlobalMiddleware");
const SFCUserChecker_1 = require("@Application/SFCUserChecker");
class TestService extends cds_1.default.ApplicationService {
    async init() {
        TestService.configRoutes(this);
        await super.init();
    }
    static configRoutes(service, baseDir = 'gen/srv/srv') {
        const options = {
            handler: [
                path_1.default.join(__dirname, '..', baseDir, 'features', 'tests', '/handlers/entities/**/*.js'),
                path_1.default.join(__dirname, '..', baseDir, 'features', 'tests', '/handlers/functions/**/*.js'),
                path_1.default.join(__dirname, '..', baseDir, 'features', 'tests', '/handlers/actions/**/*.js'),
            ],
            middlewares: [GlobalMiddleware_1.EnvironmentMiddleware],
            userChecker: SFCUserChecker_1.SFCUserChecker,
        };
        const hdl = cds_routing_handlers_1.createCombinedHandler(options);
        hdl(service);
    }
}
exports.TestService = TestService;
module.exports.TestService = TestService;
module.exports.TestService.configRoutes = TestService.configRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvVGVzdFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQTJCO0FBQzNCLCtEQUE2RDtBQUM3RCxnREFBd0I7QUFFeEIsb0VBQXNFO0FBQ3RFLGdFQUE2RDtBQUU3RCxNQUFhLFdBQVksU0FBUSxhQUFHLENBQUMsa0JBQWtCO0lBQ3JELEtBQUssQ0FBQyxJQUFJO1FBQ1IsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFnQixFQUFFLFVBQWtCLGFBQWE7UUFDbkUsTUFBTSxPQUFPLEdBQUc7WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixDQUFDO2dCQUN0RixjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLENBQUM7Z0JBQ3ZGLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQzthQUN0RjtZQUNELFdBQVcsRUFBRSxDQUFDLHdDQUFxQixDQUFDO1lBQ3BDLFdBQVcsRUFBRSwrQkFBYztTQUM1QixDQUFDO1FBQ0YsTUFBTSxHQUFHLEdBQUcsNENBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBbkJELGtDQW1CQztBQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZHMgZnJvbSAnQHNhcC9jZHMnO1xyXG5pbXBvcnQgeyBjcmVhdGVDb21iaW5lZEhhbmRsZXIgfSBmcm9tICdjZHMtcm91dGluZy1oYW5kbGVycyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnQHNhcC9jZHMvYXBpcy9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IEVudmlyb25tZW50TWlkZGxld2FyZSB9IGZyb20gJ0BBcHBsaWNhdGlvbi9HbG9iYWxNaWRkbGV3YXJlJztcclxuaW1wb3J0IHsgU0ZDVXNlckNoZWNrZXIgfSBmcm9tICdAQXBwbGljYXRpb24vU0ZDVXNlckNoZWNrZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRlc3RTZXJ2aWNlIGV4dGVuZHMgY2RzLkFwcGxpY2F0aW9uU2VydmljZSB7XHJcbiAgYXN5bmMgaW5pdCgpIHtcclxuICAgIFRlc3RTZXJ2aWNlLmNvbmZpZ1JvdXRlcyh0aGlzKTtcclxuICAgIGF3YWl0IHN1cGVyLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb25maWdSb3V0ZXMoc2VydmljZTogU2VydmljZSwgYmFzZURpcjogc3RyaW5nID0gJ2dlbi9zcnYvc3J2Jykge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgaGFuZGxlcjogW1xyXG4gICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsIGJhc2VEaXIsICdmZWF0dXJlcycsICd0ZXN0cycsICcvaGFuZGxlcnMvZW50aXRpZXMvKiovKi5qcycpLFxyXG4gICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsIGJhc2VEaXIsICdmZWF0dXJlcycsICd0ZXN0cycsICcvaGFuZGxlcnMvZnVuY3Rpb25zLyoqLyouanMnKSxcclxuICAgICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCBiYXNlRGlyLCAnZmVhdHVyZXMnLCAndGVzdHMnLCAnL2hhbmRsZXJzL2FjdGlvbnMvKiovKi5qcycpLFxyXG4gICAgICBdLFxyXG4gICAgICBtaWRkbGV3YXJlczogW0Vudmlyb25tZW50TWlkZGxld2FyZV0sXHJcbiAgICAgIHVzZXJDaGVja2VyOiBTRkNVc2VyQ2hlY2tlcixcclxuICAgIH07XHJcbiAgICBjb25zdCBoZGwgPSBjcmVhdGVDb21iaW5lZEhhbmRsZXIob3B0aW9ucyk7XHJcbiAgICBoZGwoc2VydmljZSk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5UZXN0U2VydmljZSA9IFRlc3RTZXJ2aWNlO1xyXG5tb2R1bGUuZXhwb3J0cy5UZXN0U2VydmljZS5jb25maWdSb3V0ZXMgPSBUZXN0U2VydmljZS5jb25maWdSb3V0ZXM7XHJcbiJdfQ==