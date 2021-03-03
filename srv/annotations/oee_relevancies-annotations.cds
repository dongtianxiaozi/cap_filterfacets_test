namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.OeeRelevancies with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>oeeCode}';

    description
    @title     : '{i18n>oee}';

}

annotate OrderService.OeeRelevancies with @(
    Common.SemanticKey : [
        code,
    ],
    UI                 : {
        Identification  : [{
            $Type : 'UI.DataField',
            Value : code,
        }],
        LineItem        : [
            {Value : code},
            {Value : description}
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>oee}',
            TypeNamePlural : '{i18n>oees}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                  : [
        {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>details}',
        Target : '@UI.FieldGroup#OeeDetails'
        },
        ],
        FieldGroup #OeeDetails : {
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
        ]
    }
    }
);