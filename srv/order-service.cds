using {
    com.seidor.sfc.md as md,
    com.seidor.sfc.td as td,
    com.seidor.sfc.view as view
} from '../db/data-model';

service OrderService @(requires : ['user']) {

    @odata.draft.enabled
    entity Orders                   as projection on td.Orders {
        * , toOperations : redirected to Operations
    }

    entity Operations               as projection on td.Operations {
        * , toOrder : redirected to Orders, toWorkCenter : redirected to WorkCenters, toOrder.code as order_, toWorkCenter.code as workCenter
    }

    @readonly
    entity Stations                 as projection on md.Stations {
        * ,
    // toWorkCenter: redirected to WorkCenters,
    // toWorkCenters : redirected to WorkCenters,
    }

    entity Components               as projection on td.Components {
        * , toOrder : redirected to Orders, toOperation : redirected to Operations
    }

    @odata.draft.enabled
    entity Turns                    as
        select from md.Turns {
            *,
            toStations    : redirected to Stations_Turns,
            toSupervisors : redirected to Supervisors_Turns,
        };

    @readonly
    entity VH_Turns                 as
        select from md.Turns {
            ID          as _ID,
            code        as _code,
            description as _text,
            isNightShift
        };

    entity Stations_Turns           as
        select from md.Stations_Turns {
            ID,
            toStation : redirected to Stations,
            toTurn    : redirected to Turns
        };

    @odata.draft.enabled
    entity WorkCenters              as
        select from md.WorkCenters {
            *,
            toPlant       : redirected to Plants,
            toResponsible : redirected to Responsibles
        };

    @odata.draft.enabled
    entity Queues                   as projection on td.Queues {
        * , toOrder : redirected to Orders, toWorkCenter : redirected to WorkCenters
    };

    @readonly
    entity VH_Orders                as
        select from td.Orders {
            ID   as _ID,
            code as _code,
            type,
            plant
        };

    @readonly
    entity VH_WorkCenters           as
        select from md.WorkCenters {
            ID          as _ID,
            code        as _code,
            plant,
            description as _text
        };

    @odata.draft.enabled
    entity Operators                as
        select from md.Operators {
            ID,
            code,
            name,
            personalNumber,
            pin,
            toTurn : redirected to Turns,
            currentDate
        };

    @odata.draft.enabled
    entity Roles                    as
        select from md.Roles {
            ID,
            @mandatory
            code,
            description,
            toUsers : redirected to Users
        };

    @readonly
    entity VH_Roles                 as
        select from md.Roles {
            ID          as _ID,
            code        as _code,
            description as _text
        };


    @odata.draft.enabled
    entity Plants                   as
        select from md.Plants {
            ID,
            code,
            description,
        };

    @odata.draft.enabled
    entity ActivityPhases           as
        select from md.ActivityPhases {
            ID,
            code,
            description
        };

    @odata.draft.enabled
    entity GrantedTypes             as
        select from md.GrantedTypes {
            ID,
            code,
            description
        };

    @odata.draft.enabled
    entity OeeRelevancies           as
        select from md.OeeRelevancies {
            ID,
            code,
            description
        };

    @odata.draft.enabled
    entity Units                    as
        select from md.Units {
            ID,
            code,
            description
        };

    @readonly
    entity VH_Plants                as
        select from md.Plants {
            ID          as _ID,
            code        as _code,
            description as _text
        };

    @odata.draft.enabled
    entity Users                    as
        select from md.Users {
            *,
            toType  : redirected to Roles,
            toPlant : redirected to Plants,
            toTurns : redirected to Supervisors_Turns,
        };

    @readonly
    @odata.draft.enabled
    entity Responsibles             as
        select from md.Responsibles {
            ID,
            code,
            description,
            toPlant : redirected to Plants
        };

    @readonly
    entity VH_Responsibles          as
        select from md.Responsibles {
            ID          as _ID,
            code        as _code,
            description as _text,
            toPlant : redirected to Plants
        };

    @odata.draft.enabled
    entity OrderClasses             as
        select from md.OrderClasses {
            ID,
            code,
            toPlant : redirected to Plants
        };

    @odata.draft.enabled
    entity Supervisors_Responsibles as
        select from md.Supervisors_Responsibles {
            ID,
            toUser        : redirected to Supervisors,
            toPlant       : redirected to Plants,
            toResponsible : redirected to Responsibles
        };

    @readonly
    entity VH_OrderClasses          as
        select from md.OrderClasses {
            ID           as _ID,
            code         as _code,
            toPlant.code as plant
        };

    @odata.draft.enabled
    entity Supervisors              as
        select from md.Supervisors {
            ID,
            code,
            toType  : redirected to Roles,
            name,
            toPlant : redirected to Plants,
            toTurns : redirected to Supervisors_Turns
        };

    @odata.draft.enabled
    entity Supervisors_Turns        as
        select from md.Supervisors_Turns {
            ID,
            toSupervisor : redirected to Users,
            toTurn       : redirected to Turns
        };

    @odata.draft.enabled
    entity MaterialsToSync          as
        select from md.MaterialsToSync {
            ID,
            code,
            toPlant : redirected to Plants
        };

    @odata.draft.enabled
    entity Stoppages_Types          as
        select from md.Stoppages_Types {
            ID,
            code,
            description
        };

    @odata.draft.enabled
    entity Incidents                as
        select from md.Incidents {
            ID,
            code,
            description
        };


    @odata.draft.enabled
    entity Stoppages                as
        select from md.Stoppages {
            *,
            type : redirected to Stoppages_Types
        };

}
