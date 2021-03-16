namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Operators with {
    code        @title : '{i18n>station}';
    description @title : '{i18n>stationDescription}';
    toWorkcenter @title : '{i18n>workcenter}';
    toOperator @title : '{i18n>operator}';
    turnRequired @title : '{i18n>turnRequired}';
}

annotate OrderService.Stations_Operators with @(UI : {LineItem : [
    {Value : toOperator.name},
    {Value : toOperator.code},
    {Value : toOperator.personalNumber},
    {Value : toOperator.toTurn.description},
    {Value : toOperator.currentDate}
            /*{Value : toStation.toOperator.name},
            {Value : toStation.toOperator.code},
            {Value : toStation.toOperator.personalNumber},
            {Value : toStation.toTurns.toTurn.description},
            {Value : toStation.toOperator.currentDate}*/
]});