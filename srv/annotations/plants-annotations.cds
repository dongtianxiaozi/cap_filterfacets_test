namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Plants with {
    ID
    @UI.Hidden;
    code
    @title     : '{i18n>plantsCode}'
    /*@(Common : {
        Text            : description,
        TextArrangement : #TextLast
    })*/;
    description
    @title     : '{i18n>plantsDescription}';
}

annotate OrderService.Plants with @(
    Common.SemanticKey : [code, ],
    UI                 : {
        Identification  : [{
            $Type : 'UI.DataField',
            Value : code,
        }],
        SelectionFields : [],
        LineItem        : [
            {Value : code},
            {Value : description},
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>plant}',
            TypeNamePlural : '{i18n>plants}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                   : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#PlantsDetails'
        }],
        FieldGroup #PlantsDetails : {
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