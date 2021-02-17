namespace com.seidor.sfc;

using {
  cuid,
  managed
} from '@sap/cds/common';


type OrderId : String(12);
type Quantity : Decimal(12, 3);
type Material : String;
type WorkCenter : String(10);
type WorkCenterPlant : String(4);
type Turn : String(2);

/* Naming conventions:
   https://cap.cloud.sap/docs/guides/domain-models#naming-conventions
  -Start entity and type names with capital letters
  -Use plural form for entities - for example, Authors
  -Use singular form for types - for example, Genre
  -Start elements with a lowercase letter - for example, name
  -Prefer Concise and Comprehensible Naming, for example by adhering to:
  -Don’t repeat contexts → e.g. Author.name instead of Author.authorName
  -Prefer one-word names → e.g. address instead of addressInformation
  -Use ID for technical primary keys → see also Use Canonic Primary Keys
*/

context md {
  entity Person : managed {
    key ID          : Integer;
        title       : String(255);
        description : String(255);
  }

  entity Turns : managed {
    key code            : Turn;
        description     : String(12);
        longDescription : String(30);
        isNightShift    : Boolean not null default false;
        toStations      : Association to many Stations_Turns
                            on toStations.toTurn = $self;
  }

  entity Stations_Turns : cuid {
    toStation : Association to Stations;
    toTurn    : Association to Turns;
  }

  entity Stations : cuid, managed {
    code                             : String(4);
    description                      : String(30);
    toWorkCenter                     : Association to WorkCenters;
    operator                         : String(4);
    turnRequired                     : Boolean not null default false;
    turnDateIsToday                  : Boolean not null default false;
    quantityRequired                 : Boolean not null default false;
    toTurns                          : Association to many Stations_Turns
                                         on toTurns.toStation = $self;
    turnDate                         : Date;
    pinRequired                      : Boolean not null default false;
    eventNotificationRequired        : Boolean not null default false;
    multipleOperatorStartsAllowed    : Boolean not null default false;
    multipleStartsAllowed            : Boolean not null default false;
    activityAuthorizationRequired    : Boolean not null default false;
    goodReceiptAuthorizationRequired : Boolean not null default false;
    consumptionAuthorizationRequired : Boolean not null default false;
    ctecAuthorizationRequired        : Boolean not null default false;
    toWorkCenters                    : Association to many WorkCenters
                                         on toWorkCenters.toStation = $self;
  }

  entity WorkCenters : cuid, managed {
    code          : WorkCenter;
    plant         : WorkCenterPlant;
    description   : String(35);
    responsible   : String;
    queueType     : String(1);
    isOeeRelevant : Boolean not null default false;
    toStation     : Association to Stations;
  }


  @assert.unique: {
    code: [ code ],
  }
  entity Plants : cuid {
        @mandatory
        code        : String(4);
        description : String(35);
  }
}

context td {
  entity Orders : cuid, managed {
    code             : OrderId;
    type             : String;
    category         : String;
    description      : String;
    plant            : String;
    plannedStartDate : Date;
    plannedStartTime : Time;
    totalQuantity    : Quantity;
    unit             : String;
    material         : Material;
    supervisor       : String;
    supervisorName   : String;
    importance       : String;
    toOperations     : Composition of many Operations
                         on toOperations.toOrder = $self;
    toComponents     : Composition of many Components
                         on toComponents.toOrder = $self;
  }

  entity Operations : cuid, managed {
    toOrder                    : Association to Orders;
    operation                  : String;
    controlKey                 : String;
    isExternal                 : Boolean not null default false;
    isNotifiable               : Boolean not null default false;
    text                       : String;
    toWorkCenter               : Association to md.WorkCenters;
    quantity                   : Quantity;
    baseQuantity               : Quantity;
    toComponents               : Association to many Components
                                   on toComponents.toOperation = $self;
    //queue                : Association to Queues;
    queueSequence              : Integer;
    virtual semanticURLtoOrder : String;
  }

  entity Components : cuid, managed {
    toOrder         : Association to Orders;
    position        : String(5);
    material        : Material;
    batch           : String;
    isNegative      : Boolean not null default false;
    quantity        : Quantity;
    toOperation     : Association to Operations;
    reserve         : String;
    reservePosition : String;
    indBackflush    : Boolean not null default false;
  }

  entity Queues as
    select from td.Operations {
      key ID,
          operation,
          toOrder,
          toOrder.code             as orderIdReadable,
          toWorkCenter,
          toWorkCenter.description as workCenterDescription,
          queueSequence
    }
    order by
      queueSequence;
/*
Suprimimos dado que vamos a modelar como una vista sobre Operations
entity Queues : cuid, managed {
  operation  : Association to Operations;
  workCenter : Association to WorkCenters;
  sequence   : Integer;
*/

}

context view {

}
