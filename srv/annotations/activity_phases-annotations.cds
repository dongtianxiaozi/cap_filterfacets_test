namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.ActivityPhases with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>activityCode}'
    @Common.IsUpperCase;
    /*@(Common : {
        Text            : description,
        TextArrangement : #TextLast
    });*/
    description
    @title     : '{i18n>activity}';

}

annotate OrderService.ActivityPhases with @(
    Common.SemanticKey : [code, ],
    UI                 : {
        Identification                : [{
            $Type : 'UI.DataField',
            Value : code,
        }],
        SelectionFields               : [],
        LineItem                      : [
            {Value : code},
            {Value : description},
        ],
        HeaderInfo                    : {
            TypeName       : '{i18n>activity}',
            TypeNamePlural : '{i18n>activities}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                        : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#ActivitiesDetails'
        }],
        FieldGroup #ActivitiesDetails : {
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
