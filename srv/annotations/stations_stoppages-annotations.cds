namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Stoppages with @(Capabilities : {
    Insertable : true,
    Updatable  : false,
    Deletable  : true
});

annotate OrderService.Stations_Stoppages with {
    code        @title : '{i18n>stoppageCode}'
                @Common.IsUpperCase;
    description @title : '{i18n>stoppageDescription}';
}

annotate OrderService.Stations_Stoppages with @(UI : {
    LineItem                            : [
        {Value : toStoppage.code},
        {Value : toStoppage.description},
    ],

    Facets                              : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>details}',
        Target : '@UI.FieldGroup#StationStoppagesDetails'
    }],
    FieldGroup #StationStoppagesDetails : {
        Label : '{i18n>details}',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : toStoppage.code
            },
            {
                $Type : 'UI.DataField',
                Value : toStoppage.description
            }
        ]
    }
});
