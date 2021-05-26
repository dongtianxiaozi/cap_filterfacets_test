namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations with {
    code              @title : '{i18n>stationCode}';
    description       @title : '{i18n>stationDescription}';

    toOperator        @title : '{i18n>operatorCode}'
                      @(Common : {Text : {
        $value                 : toOperator.code,
        ![@UI.TextArrangement] : #TextOnly
    }});

    turnRequired      @title : '{i18n>turnRequired}';
}

annotate OrderService.Stations with @(
                                    UI : {
    Identification              : [{Value : code}],

    LineItem                    : [
        {Value : description},
        {Value : code},
        {Value : turnRequired},
    ],
    HeaderInfo                  : {
        TypeName       : '{i18n>station}',
        TypeNamePlural : '{i18n>stations}',
        Title          : {Value : code},
        Description    : {Value : description}
    },
    Facets                      : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#StationsDetails'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>turns}',
            Target : 'toTurns/@UI.LineItem'
        }
    ],
    FieldGroup #StationsDetails : {
        Label : '{i18n>details}',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : code
            },
            {
                $Type : 'UI.DataField',
                Value : description
            },
            {
                $Type : 'UI.DataField',
                Value : turnRequired
            },
        ]
    }
});


