annotate CatalogService.Sales with @(
    UI                 : {
        Identification           : [{
            $Type : 'UI.DataField',
            Value : units,
        }],
        SelectionFields          : [toBooks_ID], 
        LineItem                 : [
            {Value : units},
            {Value : toBook.ID}
        ],
        HeaderInfo               : {
            TypeName       : '{i18n>Sales}',
            TypeNamePlural : '{i18n>Sales}',
            Title          : {Value : units},
            Description    : {Value : units}
        },

        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>commonDetails}',
            Target : '@UI.FieldGroup#ResponsiblesDetails'
        }],

        FieldGroup #ResponsiblesDetails : {
            Label : '{i18n>commonDetails}',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : units
                },   
                {
                    $Type : 'UI.DataField',
                    Value : toBooks_ID,
                }       
            ]
        },
    }
);