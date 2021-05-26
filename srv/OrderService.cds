using {com.seidor.sfc.md as md} from '../db/data-model';

service OrderService @(requires : ['user']) {

    entity Stations       as projection on md.Stations {
        * , toTurns : redirected to Stations_Turns
    }

    @odata.draft.enabled
    entity Turns          as
        select from md.Turns {
            *,
            toStations : redirected to Stations_Turns
        };

    @readonly
    entity VH_Turns       as
        select from md.Turns {
            ID              as ID,
            code            as code,
            description     as text,
            longDescription as longText,
            isNightShift    as isNightShift
        };

    entity Stations_Turns as projection on md.Stations_Turns {
        * , toStation : redirected to Stations, toTurn : redirected to Turns
    };
}
