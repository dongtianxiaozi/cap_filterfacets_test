namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Turns with @(
    Capabilities: { Insertable:true, Updatable:false, Deletable:true }
);

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

],
    Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#StationTurnsDetails'
        }
    ],
        FieldGroup #StationTurnsDetails : {
            Label : '{i18n>details}',
            Data  : [
            {
                $Type : 'UI.DataField',
                Value : toTurn.code
            },
            {
                $Type : 'UI.DataField',
                Value : toStation.toFixedWorkCenter.code
            },
            {
                $Type : 'UI.DataField',
                Value : toStation.toFixedWorkCenter.description
            },
            {
                $Type : 'UI.DataField',
                Value : toStation.toOperator.code
            }
            ]
        }
});
