namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Turns with {
    ID           @Core.Computed;
    code         @title : '{i18n>turnCode}';
    /*toWorkcenter @title : '{i18n>workcenterCode}';
    toWorkcenter @title : '{i18n>workcenterDescription}';*/
    toOperator   @title : '{i18n>operatorCode}';
}

annotate OrderService.Stations_Turns with @(UI : {LineItem : [
{Value : toTurn.code},
{Value : toStation.toFixedWorkCenter.code},
{Value : toStation.toFixedWorkCenter.description},
{Value : toStation.toOperator.code}

/*{Value : toStation.code},
{Value : toStation.toWorkCenter.code},
{Value : toStation.toWorkCenter.description},
{Value : toStation.toOperator.code}*/
]});
