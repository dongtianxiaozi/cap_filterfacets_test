namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Turns with @(Capabilities : {
    Insertable : true,
    Updatable  : false,
    Deletable  : true
});

annotate OrderService.Stations_Turns with {
    ID         @Core.Computed;
    code       @title : '{i18n>turnCode}';
    /*toWorkcenter @title : '{i18n>workcenterCode}';
    toWorkcenter @title : '{i18n>workcenterDescription}';*/
    toOperator @title : '{i18n>operatorCode}';
    toTurn     @title : '{i18n>turnCode}'
               @(Common : {Text : {
        $value                 : toTurn.code,
        ![@UI.TextArrangement] : #TextOnly
    }})
}

annotate OrderService.Stations_Turns with @(UI : {
    LineItem                        : [
        {Value : toTurn.code},
        {Value : toTurn.description}
    ],
    Facets                          : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>details}',
        Target : '@UI.FieldGroup#StationTurnsDetails'
    }],
    FieldGroup #StationTurnsDetails : {
        Label : '{i18n>details}',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : toTurn_ID
            },
            {
                $Type : 'UI.DataField',
                Value : toTurn.code,
                ![@UI.Hidden]
            },
            {
                $Type                   : 'UI.DataField',
                Value                   : toTurn.description,
                ![@Common.FieldControl] : #ReadOnly,
            },
            {
                $Type                   : 'UI.DataField',
                Value                   : toTurn.longDescription,
                ![@Common.FieldControl] : #ReadOnly,
            },
            {
                $Type                   : 'UI.DataField',
                Value                   : toTurn.isNightShift,
                ![@Common.FieldControl] : #ReadOnly,
            }
        ]
    }
});

annotate OrderService.Stations_Turns with {
    toTurn
    @(Common : {
                //ValueListWithFixedValues,
               ValueList : {
        SearchSupported : true,
        CollectionPath  : 'VH_Turns',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : toTurn_ID,
                ValueListProperty : '_ID'
            },
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : toTurn.description,
                ValueListProperty : '_text'
            },
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : toTurn.longDescription,
                ValueListProperty : '_longText'
            },
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : toTurn.isNightShift,
                ValueListProperty : '_isNightShift'
            },
        ]
    }});
};
