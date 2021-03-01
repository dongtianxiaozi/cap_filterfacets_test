import { OrderService } from "@Shared/Contract";
import { IUser } from "@Shared/IUser";
import { BeforeCreate, Entities, Handler, User } from "cds-routing-handlers";

@Handler(OrderService.SanitizedEntity.WorkCenters)
export class WorkCentersHandler{


    @BeforeCreate()
    async name(@Entities() persons: OrderService.IWorkCenters, @User() incommingUser: Promise<IUser>) {
        console.log("test");
    }

}
