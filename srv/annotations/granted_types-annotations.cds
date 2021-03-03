namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.GrantedTypes with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>grantedTypeCode}';

    description
    @title     : '{i18n>grantedType}';

}

annotate OrderService.GrantedTypes with @(
    Common.SemanticKey : [
        code
    ],
    UI                 : {
        Identification  : [{
            $Type : 'UI.DataField',
            Value : code,
        }],

        LineItem        : [
            {Value : ID},
            {Value : description},
            {Value : code}
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>grantedType}',
            TypeNamePlural : '{i18n>grantedTypes}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                   : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#GrantedTypesDetails'
        },
        ],
        FieldGroup #GrantedTypesDetails : {
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