export namespace com.seidor.sfc {
    export type Material = string;
    export type OrderId = string;
    export type Quantity = number;
    export type Turn = string;
    export type WorkCenter = string;
    export type WorkCenterPlant = string;

    export interface IPerson extends IManaged {
        ID: number;
        title: string;
        description: string;
    }

    export interface IPlants extends ICuid {
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

    export interface IStations_Turns extends ICuid {
        toStation?: IStations;
        toStation_ID?: string;
        toTurn?: ITurns;
        toTurn_code?: Turn;
    }

    export interface ITurns extends IManaged {
        code: Turn;
        description: string;
        longDescription: string;
        isNightShift?: boolean;
        toStations?: IStations_Turns[];
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
        Person = "com.seidor.sfc.md.Person",
        Plants = "com.seidor.sfc.md.Plants",
        Roles = "com.seidor.sfc.md.Roles",
        Stations = "com.seidor.sfc.md.Stations",
        Stations_Turns = "com.seidor.sfc.md.Stations_Turns",
        Turns = "com.seidor.sfc.md.Turns",
        WorkCenters = "com.seidor.sfc.md.WorkCenters",
        Components = "com.seidor.sfc.td.Components",
        Operations = "com.seidor.sfc.td.Operations",
        Orders = "com.seidor.sfc.td.Orders",
        Queues = "com.seidor.sfc.td.Queues"
    }

    export enum SanitizedEntity {
        Person = "Person",
        Plants = "Plants",
        Roles = "Roles",
        Stations = "Stations",
        Stations_Turns = "Stations_Turns",
        Turns = "Turns",
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
