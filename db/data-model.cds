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

  @assert.unique : {code : [code], }
  entity Turns : cuid, managed {
    code            : String(2);
    description     : String(49);
    longDescription : String(80);
    isNightShift    : Boolean not null default false;
    toStations      : Association to many Stations_Turns
                        on toStations.toTurn = $self;
    toSupervisors   : Association to many Supervisors_Turns
                        on toSupervisors.toTurn = $self;
  }

  entity Stations_Turns : cuid {
    toStation : Association to Stations;
    toTurn    : Association to Turns;
  }

  entity Stations : cuid, managed {
    code                             : String(4);
    description                      : String(30);
    toWorkCenter                     : Association to WorkCenters;
    toOperator                       : Association to Operators;
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
    toOperators                      : Association to many Stations_Operators
                                         on toOperators.toStation = $self;
    toStoppages                      : Association to many Stations_Stoppages
                                         on toStoppages.toStation = $self;
    toWorkCenters                    : Association to many Stations_WorkCenters
                                         on toWorkCenters.toStation = $self;
  }

  @assert.unique : {code : [
    code,
    toPlant,
    toResponsible
  ], }
  entity WorkCenters : cuid, managed {
    code          : WorkCenter;
    plant         : WorkCenterPlant;
    description   : String(35);
    responsible   : String;
    queueType     : String(1);
    isOeeRelevant : Boolean not null default false;
    toPlant       : Association to Plants;
    toResponsible : Association to Responsibles;
    toStations    : Association to many Stations_WorkCenters
                      on toStations.toWorkCenter = $self;
  }

  @assert.unique : {toWorkCenter : [
    toWorkCenter,
    number
  ], }
  entity WorkCenters_Activities : cuid {
    toWorkCenter   : Association to WorkCenters;
    toActivity     : Association to Activities;
    number         : String(1)@assert.range : [
      1,
      6
    ];
    toPhase        : Association to ActivityPhases;
    toGrantedType  : Association to GrantedTypes;
    toOeeRelevancy : Association to OeeRelevancies;
  }

  @assert.unique : {code : [code], }
  entity Operators : cuid, managed {
    code           : String(4);
    name           : String(100);
    personalNumber : String(8);
    pin            : String(4);
    toTurn         : Association to Turns;
    currentDate    : Date;
    toStations     : Association to many Stations_Operators
                       on toStations.toOperator = $self;
  }

  @assert.unique : {code : [code], }
  entity Roles : cuid {
    code        : String(1);
    description : localized String(35);
    toUsers     : Association to many Users
                    on toUsers.toType = $self;
  }

  @assert.unique : {code : [code], }
  entity Plants : cuid, managed {
    @mandatory
    code        : String(4);
    description : String(35);
  }

  @assert.unique : {code : [code], }
  entity ActivityPhases : cuid {
    code        : String(1);
    description : localized String(35);
  }

  @assert.unique : {code : [code], }
  entity GrantedTypes : cuid {
    code        : String(3);
    description : localized String(80);
  }

  @assert.unique : {code : [code], }
  entity OeeRelevancies : cuid {
    code        : String(1);
    description : localized String(150);
  }

  @assert.unique : {code : [code], }
  entity Units : cuid {
    code        : String(3);
    description : localized String(80);
  }

  @assert.unique : {code : [code], }
  entity Users : cuid {
    code           : String(8);
    toType         : Association to Roles;
    name           : String(150);
    toPlant        : Association to Plants;
    toTurns        : Association to many Supervisors_Turns
                       on toTurns.toSupervisor = $self;
    toStation      : Association to Stations;
    toResponsibles : Association to many Supervisors_Responsibles
                       on toResponsibles.toUser = $self;
  }

  @assert.unique : {code : [code], }
  entity Supervisors as
    select from md.Roles[code = 'S'
  ] : toUsers {
    key ID,
        code,
        toType,
        name,
        toPlant,
        toTurns,
        toResponsibles
  };

  @assert.unique : {toUser : [
    toUser,
    toPlant,
    toResponsible
  ], }
  entity Supervisors_Responsibles : cuid {
    toUser        : Association to Users;
    toPlant       : Association to Plants;
    toResponsible : Association to Responsibles;
  }

  @assert.unique : {toStation : [
    toStation,
    toOperator
  ], }
  entity Stations_Operators : cuid {
    toStation  : Association to Stations;
    toOperator : Association to Operators;
  }

  @assert.unique : {toStation : [
    toStation,
    toWorkCenter
  ]}
  entity Stations_WorkCenters : cuid {
    toStation    : Association to Stations;
    toWorkCenter : Association to WorkCenters;
  }

  @assert.unique : {code : [
    code,
    toPlant
  ], }
  entity Responsibles : cuid {
    toPlant     : Association to Plants;
    code        : String(3);
    description : localized String(80);
  }

  @assert.unique : {code : [
    code,
    toPlant
  ], }
  entity OrderClasses : cuid, managed {
    code    : String(4);
    toPlant : Association to Plants;
  }

  @assert.unique : {code : [code], }
  entity MaterialsToSync : cuid, managed {
    code    : String(4);
    toPlant : Association to Plants;
  }

  @assert.unique : {code : [code], }
  entity Stoppages_Types : cuid {
    code        : String(1);
    description : String(80);
  }

  entity Stations_Stoppages : cuid {
    toStation  : Association to Stations;
    toStoppage : Association to Stoppages;
  }

  @assert.unique : {code : [code], }
  entity Incidents : cuid {
    code        : String(4);
    description : String(80);
  }

  @assert.unique : {toSupervisor : [
    toSupervisor,
    toTurn
  ], }
  entity Supervisors_Turns : cuid {
    toSupervisor : Association to Users;
    toTurn       : Association to Turns;
  }

  @assert.unique : {code : [code], }
  entity Stoppages : cuid {
    code          : String(4);
    description   : String(25);
    type          : Association to Stoppages_Types;
    isOverlapping : Boolean not null default false;
    toStations    : Association to many Stations_Stoppages
                      on toStations.toStoppage = $self;
  }

  @assert.unique : {code : [code], }
  entity Activities : cuid {
    code        : String(6);
    description : localized String(20);
    toUnit      : Association to Units;
  }

  @assert.unique : {objectClass : [
    objectClass,
    documentClass,
    application
  ], }
  entity DocumentClasses : cuid {
    objectClass   : String(10);
    documentClass : String(3);
    application   : String(3);
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
