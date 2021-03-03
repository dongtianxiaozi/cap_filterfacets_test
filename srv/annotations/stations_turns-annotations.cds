namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Turns with {
    ID          @Core.Computed;
    code        @title : '{i18n>station}';
    description @title : '{i18n>stationDescription}';
}

annotate OrderService.Stations_Turns with @(UI : {LineItem : [
{Value : toStation.code},
// {Value : toStation.toWorkCenter.code},
// {Value : toStation.toWorkCenter.description},
// {Value : toStation.operator}
]});
