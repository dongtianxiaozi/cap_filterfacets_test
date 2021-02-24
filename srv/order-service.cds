using {
    com.seidor.sfc.md as md,
    com.seidor.sfc.td as td,
    com.seidor.sfc.view as view
} from '../db/data-model';

service OrderService @(requires : ['user']) {

    @odata.draft.enabled
    entity Orders      as projection on td.Orders {
        * , toOperations : redirected to Operations
    }

    entity Operations  as projection on td.Operations {
        * , 
        toOrder : redirected to Orders, 
        toWorkCenter: redirected to WorkCenters,
        toOrder.code as order_, 
        toWorkCenter.code as workCenter
    }

    @readonly
    entity Stations    as projection on md.Stations {
        *,
        toWorkCenter: redirected to WorkCenters,
        toWorkCenters: redirected to WorkCenters,
    }

    entity Components  as projection on td.Components {
        * , 
        toOrder : redirected to Orders, 
        toOperation: redirected to Operations
    }    

    @odata.draft.enabled
    entity Turns as select from md.Turns{
        ID,
        code,
        description,
        longDescription,
        isNightShift,
        toStations: redirected to Stations_Turns,
    };

    entity Stations_Turns as projection on md.Stations_Turns;

    @readonly
    entity WorkCenters as
        select from md.WorkCenters {
            ID,
  //        An alias for a key field provokes an sqlite error, so workaround invalid
  //        ID as toWorkCenterID,     //Enables navigation from LR to workCenter-display semantic object            
            code,
            plant,
            description,
            responsible,
            queueType,
            isOeeRelevant,
            toStation,
            toStation.code as station
        };

    @odata.draft.enabled
    entity Queues      as projection on td.Queues {
        *,        
        toOrder: redirected to Orders,
        toWorkCenter: redirected to WorkCenters
    };

    @readonly
    entity VH_Orders as select from td.Orders{
        ID as _ID,
        code as _code,
        type,
        plant
    };

    @readonly
    entity VH_WorkCenters as select from md.WorkCenters{
        ID as _ID,
        code as _code,
        plant,
        description as _text
    };

    @odata.draft.enabled
    entity Operators as select from md.Operators{
        ID,
        code,
        name,
        personalNumber,
        pin,
        toTurn,
        currentDate
    };

    @odata.draft.enabled
    entity Roles as select from md.Roles{
        ID,
        @mandatory
        code,
        description,
        toUsers: redirected to Users
    };

    @readonly
    entity VH_Roles as select from md.Roles{
        ID as _ID,
        code as _code,
        description as _text
    };


    @odata.draft.enabled
    entity Plants as select from md.Plants{
        ID,
        code,
        description,
    };

    @odata.draft.enabled
    entity ActivityPhases as select from md.ActivityPhases{
        ID,
        code,
        description
    };

    @odata.draft.enabled
    entity GrantedTypes as select from md.GrantedTypes{
        ID,
        code,
        description
    };

    @odata.draft.enabled
    entity OeeRelevancies as select from md.OeeRelevancies{
        ID,
        code,
        description
    };

    @odata.draft.enabled
    entity Units as select from md.Units{
        ID,
        code,
        description
    };

    @readonly
    entity VH_Plants as select from md.Plants{
        ID as _ID,
        code as _code,
        description as _text
    };

    @odata.draft.enabled
    entity Users as select from md.Users{
        ID,
        code,
        toType: redirected to Roles,
        name,
        toPlant: redirected to Plants
    };

    @readonly
    @odata.draft.enabled
    entity Responsibles as select from md.Responsibles{
        ID,
        code,
        description,
        toPlant: redirected to Plants
    };

    @odata.draft.enabled
    entity OrderClasses as select from md.OrderClasses{
        ID,
        code,
        toPlant: redirected to Plants
    };

    entity Supervisors as select from md.Supervisors{
        ID,
        code,
        toType: redirected to Roles,
        name,
        toPlant: redirected to Plants
    };

}
