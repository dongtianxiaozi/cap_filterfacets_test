namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.DocumentClasses with {
    ID
    @UI.Hidden : true;

    objectClass
    @title     : '{i18n>objectClass}';

    documentClass
    @title     : '{i18n>documentClass}';

    application
    @title     : '{i18n>application}';

}

annotate OrderService.DocumentClasses with @(
    Common.SemanticKey : [objectClass],
    UI                 : {
        Identification                : [{
            $Type : 'UI.DataField',
            Value : objectClass,
        }],
        SelectionFields               : [],
        LineItem                      : [
            {Value : objectClass},
            {Value : documentClass},
            {Value : application},
        ],
        HeaderInfo                    : {
            TypeName       : '{i18n>documentClass}',
            TypeNamePlural : '{i18n>documentClasses}',
            Title          : {Value : objectClass},
            Description    : {Value : documentClass}
        },
        Facets                        : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#DocumentClassDetails'
        }],
        FieldGroup #DocumentClassDetails : {
            Label : '{i18n>details}',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : objectClass
                },
                {
                    $Type : 'UI.DataField',
                    Value : documentClass
                },
                                {
                    $Type : 'UI.DataField',
                    Value : application
                },
            ]
        }
    }
);