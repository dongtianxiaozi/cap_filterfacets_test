namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_WorkCenters with @(Capabilities : {
    Insertable : true,
    Updatable  : false,
    Deletable  : true
});

annotate OrderService.Stations_WorkCenters with {
    code          @title : '{i18n>workcenterCode}';
    description   @title : '{i18n>workcenterDescription}';
    toPlant       @title : '{i18n>workcenter}';
    toResponsible @title : '{i18n>responsibleCode}';
    queueType     @title : '{i18n>queueType}';
    isOeeRelevant @title : '{i18n>isOeeRelevant}';
}

annotate OrderService.Stations_WorkCenters with @(UI : {
    LineItem                              : [
        {Value : toWorkCenter.code},
        {Value : toWorkCenter.description}
    ],

    Facets                                : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>details}',
        Target : '@UI.FieldGroup#StationWorkcentersDetails'
    }],
    FieldGroup #StationWorkcentersDetails : {
        Label : '{i18n>details}',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : toWorkCenter.code
            },
            {
                $Type : 'UI.DataField',
                Value : toWorkCenter.description
            },
            {
                $Type : 'UI.DataField',
                Value : toWorkCenter.toPlant_ID
            },
            {
                $Type : 'UI.DataField',
                Value : toWorkCenter.toResponsible_ID
            },
            {
                $Type : 'UI.DataField',
                Value : toWorkCenter.queueType
            },
            {
                $Type : 'UI.DataField',
                Value : toWorkCenter.isOeeRelevant
            }
        ]
    }
});
