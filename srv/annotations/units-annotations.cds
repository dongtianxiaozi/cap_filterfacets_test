namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Units with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>unitCode}'
    @Common.IsUpperCase;

    description
    @title     : '{i18n>unit}';

}

annotate OrderService.Units with @(
    Common.SemanticKey : [code, ],
    UI                 : {
        Identification           : [{
            $Type : 'UI.DataField',
            Value : code
        }],
        SelectionFields          : [],
        LineItem                 : [
            {Value : description},
            {Value : code},

        ],
        HeaderInfo               : {
            TypeName       : '{i18n>unit}',
            TypeNamePlural : '{i18n>units}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                   : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#UnitsDetails'
        }],
        FieldGroup #UnitsDetails : {
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