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

  @assert.unique : {code : [code], }
  entity Turns : cuid, managed {
    code            : String(2);
    description     : String(49);
    longDescription : String(80);
    isNightShift    : Boolean not null default false;
    toStations      : Association to many Stations_Turns
                        on toStations.toTurn = $self;
  }

  @assert.unique : {unique : [
    toStation,
    toTurn
  ], }
  entity Stations_Turns : cuid {
    toStation : Association to Stations;
    toTurn    : Association to Turns;
  }

  entity Stations : cuid, managed {
    code                             : String(4);
    description                      : String(30);
    turnRequired                     : Boolean not null default false;
    turnDateIsToday                  : Boolean not null default false;
    quantityRequired                 : Boolean not null default false;
    toTurns                          : Composition of many Stations_Turns
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
  }
}