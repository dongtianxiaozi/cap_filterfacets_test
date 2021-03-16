namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Operators with {
    code        @title : '{i18n>station}';
    description @title : '{i18n>stationDescription}';
    toWorkcenter @title : '{i18n>workcenter}';
    toOperator @title : '{i18n>operator}';
    turnRequired @title : '{i18n>turnRequired}';
}

annotate OrderService.Stations_Operators with @(
    LineItem                     : [
        {Value : description},
        {Value : code},
        {Value : toWorkCenter.code},
        {Value : toOperator.code},
        {Value : turnRequired},
        ],
);

annotate OrderService.Stations_Turns with {
    ID          @Core.Computed;
    code        @title : '{i18n>station}';
    description @title : '{i18n>stationDescription}';
}

annotate OrderService.Stations_Turns with @(UI : {LineItem : [
{Value : toStation.code},
{Value : toStation.toWorkCenter.code},
{Value : toStation.toWorkCenter.description},
{Value : toStation.toOperator.code}
]});