export namespace com.seidor.sfc {
    export type Material = string;
    export type OrderId = string;
    export type Quantity = number;
    export type Turn = string;
    export type WorkCenter = string;
    export type WorkCenterPlant = string;

    export interface IActivityPhases extends ICuid {
        code: string;
        description: string;
    }

    export interface IGrantedTypes extends ICuid {
        code: string;
        description: string;
    }

    export interface IOeeRelevancies extends ICuid {
        code: string;
        description: string;
    }

    export interface IOrderClasses extends ICuid, IManaged {
        code: string;
        toPlant?: IPlants;
        toPlant_ID?: string;
    }

    export interface IPerson extends IManaged {
        ID: number;
        title: string;
        description: string;
    }

    export interface IPlants extends ICuid {
        code: string;
        description: string;
    }

    export interface IResponsibles extends ICuid {
        toPlant?: IPlants;
        toPlant_ID?: string;
        code: string;
        description: string;
    }

    export interface IRoles extends ICuid {
        code: string;
        description: string;
    }

    export interface IStations extends ICuid, IManaged {
        code: string;
        description: string;
        toWorkCenter?: IWorkCenters;
        toWorkCenter_ID?: string;
        operator: string;
        turnRequired?: boolean;
        turnDateIsToday?: boolean;
        quantityRequired?: boolean;
        toTurns?: IStations_Turns[];
        turnDate: Date;
        pinRequired?: boolean;
        eventNotificationRequired?: boolean;
        multipleOperatorStartsAllowed?: boolean;
        multipleStartsAllowed?: boolean;
        activityAuthorizationRequired?: boolean;
        goodReceiptAuthorizationRequired?: boolean;
        consumptionAuthorizationRequired?: boolean;
        ctecAuthorizationRequired?: boolean;
        toWorkCenters?: IWorkCenters[];
    }

    export interface IStations_Operators extends ICuid {
    }

    export interface IStations_Turns extends ICuid {
        toStation?: IStations;
        toStation_ID?: string;
        toTurn?: ITurns;
        toTurn_ID?: string;
    }

    export interface IStations_WorkCenters extends ICuid {
    }

    export interface ITurns extends ICuid, IManaged {
        code: string;
        description: string;
        longDescription: string;
        isNightShift?: boolean;
        toStations?: IStations_Turns[];
    }

    export interface IUnits extends ICuid {
        code: string;
        description: string;
    }

    export interface IUsers extends ICuid, IManaged {
        code: string;
        toType?: IRoles;
        toType_ID?: string;
        name: string;
        toPlant?: IPlants;
        toPlant_ID?: string;
    }

    export interface IWorkCenters extends ICuid, IManaged {
        code: WorkCenter;
        plant: WorkCenterPlant;
        description: string;
        responsible: string;
        queueType: string;
        isOeeRelevant?: boolean;
        toStation?: IStations;
        toStation_ID?: string;
    }

    export interface IComponents extends ICuid, IManaged {
        toOrder?: IOrders;
        toOrder_ID?: string;
        position: string;
        material: Material;
        batch: string;
        isNegative?: boolean;
        quantity: Quantity;
        toOperation?: IOperations;
        toOperation_ID?: string;
        reserve: string;
        reservePosition: string;
        indBackflush?: boolean;
    }

    export interface IOperations extends ICuid, IManaged {
        toOrder?: IOrders;
        toOrder_ID?: string;
        operation: string;
        controlKey: string;
        isExternal?: boolean;
        isNotifiable?: boolean;
        text: string;
        toWorkCenter?: IWorkCenters;
        toWorkCenter_ID?: string;
        quantity: Quantity;
        baseQuantity: Quantity;
        toComponents?: IComponents[];
        queueSequence: number;
        semanticURLtoOrder?: string;
    }

    export interface IOrders extends ICuid, IManaged {
        code: OrderId;
        type: string;
        category: string;
        description: string;
        plant: string;
        plannedStartDate: Date;
        plannedStartTime: Date;
        totalQuantity: Quantity;
        unit: string;
        material: Material;
        supervisor: string;
        supervisorName: string;
        importance: string;
        toOperations: IOperations[];
        toComponents: IComponents[];
    }

    export interface IQueues {
        ID: string;
        operation: string;
        toOrder?: IOrders;
        toOrder_ID?: string;
        orderIdReadable: OrderId;
        toWorkCenter?: IWorkCenters;
        toWorkCenter_ID?: string;
        workCenterDescription: string;
        queueSequence: number;
    }

    export enum Entity {
        ActivityPhases = "com.seidor.sfc.md.ActivityPhases",
        GrantedTypes = "com.seidor.sfc.md.GrantedTypes",
        OeeRelevancies = "com.seidor.sfc.md.OeeRelevancies",
        OrderClasses = "com.seidor.sfc.md.OrderClasses",
        Person = "com.seidor.sfc.md.Person",
        Plants = "com.seidor.sfc.md.Plants",
        Responsibles = "com.seidor.sfc.md.Responsibles",
        Roles = "com.seidor.sfc.md.Roles",
        Stations = "com.seidor.sfc.md.Stations",
        Stations_Operators = "com.seidor.sfc.md.Stations_Operators",
        Stations_Turns = "com.seidor.sfc.md.Stations_Turns",
        Stations_WorkCenters = "com.seidor.sfc.md.Stations_WorkCenters",
        Turns = "com.seidor.sfc.md.Turns",
        Units = "com.seidor.sfc.md.Units",
        Users = "com.seidor.sfc.md.Users",
        WorkCenters = "com.seidor.sfc.md.WorkCenters",
        Components = "com.seidor.sfc.td.Components",
        Operations = "com.seidor.sfc.td.Operations",
        Orders = "com.seidor.sfc.td.Orders",
        Queues = "com.seidor.sfc.td.Queues"
    }

    export enum SanitizedEntity {
        ActivityPhases = "ActivityPhases",
        GrantedTypes = "GrantedTypes",
        OeeRelevancies = "OeeRelevancies",
        OrderClasses = "OrderClasses",
        Person = "Person",
        Plants = "Plants",
        Responsibles = "Responsibles",
        Roles = "Roles",
        Stations = "Stations",
        Stations_Operators = "Stations_Operators",
        Stations_Turns = "Stations_Turns",
        Stations_WorkCenters = "Stations_WorkCenters",
        Turns = "Turns",
        Units = "Units",
        Users = "Users",
        WorkCenters = "WorkCenters",
        Components = "Components",
        Operations = "Operations",
        Orders = "Orders",
        Queues = "Queues"
    }
}

export namespace sap.common {
    export interface ICodeList {
        name: string;
        descr: string;
    }

    export interface ICountries extends sap.common.ICodeList {
        code: string;
    }

    export interface ICurrencies extends sap.common.ICodeList {
        code: string;
        symbol: string;
    }

    export interface ILanguages extends sap.common.ICodeList {
        code: string;
    }

    export enum Entity {
        CodeList = "sap.common.CodeList",
        Countries = "sap.common.Countries",
        Currencies = "sap.common.Currencies",
        Languages = "sap.common.Languages"
    }

    export enum SanitizedEntity {
        CodeList = "CodeList",
        Countries = "Countries",
        Currencies = "Currencies",
        Languages = "Languages"
    }
}

export namespace TestService {
    export interface IPerson {
        createdAt?: Date;
        createdBy?: string;
        modifiedAt?: Date;
        modifiedBy?: string;
        ID: number;
        title: string;
        description: string;
    }

    export enum FuncHello {
        name = "hello",
        paramTo = "to"
    }

    export interface IFuncHelloParams {
        to: string;
    }

    export type FuncHelloReturn = string;

    export enum ActionHello2 {
        name = "hello2",
        paramTo = "to"
    }

    export interface IActionHello2Params {
        to: string;
    }

    export type ActionHello2Return = string;

    export enum Entity {
        Person = "TestService.Person"
    }

    export enum SanitizedEntity {
        Person = "Person"
    }
}

export type User = string;

export interface ICuid {
    ID: string;
}

export interface IManaged {
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
}

export interface ITemporal {
    validFrom: Date;
    validTo: Date;
}

export enum Entity {
    Cuid = "cuid",
    Managed = "managed",
    Temporal = "temporal"
}

export enum SanitizedEntity {
    Cuid = "Cuid",
    Managed = "Managed",
    Temporal = "Temporal"
}
