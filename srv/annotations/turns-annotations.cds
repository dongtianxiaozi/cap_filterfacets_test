namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Turns with {
    code            @title : '{i18n>turn}';
    description     @title : '{i18n>turnDescription}';
    longDescription @title : '{i18n>turnLongDescription}';
    isNightShift    @title : '{i18n>isNightShift}';
}

annotate OrderService.Turns with @(UI : {
    Identification          : [{
        $Type : 'UI.DataField',
        Value : description,
    }],
    SelectionFields         : [],
    LineItem                : [
    {Value : code},
    {Value : description},
    {Value : longDescription},
    {Value : isNightShift},
    ],
    HeaderInfo              : {
        TypeName       : '{i18n>turn}',
        TypeNamePlural : '{i18n>turns}',
        Title          : {Value : code},
        Description    : {Value : description}
    },
    Facets                  : [
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>details}',
        Target : '@UI.FieldGroup#TurnDetails'
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>stations}',
        Target : 'toStations/@UI.LineItem'
    }
    ],
    FieldGroup #TurnDetails : {
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
            Value : longDescription
        },
        {
            $Type : 'UI.DataField',
            Value : isNightShift
        },
        ]
    }
});
