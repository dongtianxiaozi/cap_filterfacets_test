namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

/* annotate OrderService.Stations_Turns with @(Capabilities : {
    Insertable : true,
    Updatable  : false,
    Deletable  : true
});  */

annotate OrderService.Stations_Turns with {
    ID        @Core.Computed;
    toTurn    @title     : '{i18n>turnCode}'

              @(Common : {
        Text            : toTurn.code,
        TextArrangement : #TextOnly
    });
    toStation @UI.Hidden : true;
}

annotate OrderService.Stations_Turns with
@(UI : {
    LineItem                        : [
        {Value : toTurn_ID},
        {Value : toTurn.description},
        {Value : toTurn.code}
    ],
    Facets                          : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>details}',
        Target : '@UI.FieldGroup#StationTurnsDetails'
    }],
    FieldGroup #StationTurnsDetails : {
        Label : '{i18n>details}',
        Data  : [{
            $Type                   : 'UI.DataField',
            Value                   : toTurn_ID,
            ![@Common.FieldControl] : #Mandatory
        }]
    }
});

annotate OrderService.Stations_Turns with {
    toTurn
    @(Common : {
        ValueListWithFixedValues,
        ValueList : {
            SearchSupported : true,
            CollectionPath  : 'VH_Turns',
            Parameters      : [
                {
                    $Type             : 'Common.ValueListParameterOut',
                    LocalDataProperty : toTurn_ID,
                    ValueListProperty : '_ID'
                },
                {
                    $Type             : 'Common.ValueListParameterOut',
                    LocalDataProperty : toTurn.code,
                    ValueListProperty : '_code'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : '_code'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : '_text'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : '_longText'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : '_isNightShift'
                },
            ]
        }
    });
};
