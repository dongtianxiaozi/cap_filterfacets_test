namespace com.seidor.sfc;

using {OrderService} from '../order-service';

annotate OrderService.OrderClasses with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>orderClassCode}';

    toPlant
    @title     : '{i18n>plant}';

}

annotate OrderService.OrderClasses with @(
    Common.SemanticKey : [
        code,
    ],
    UI                 : {
        Identification  : [{
            $Type : 'UI.DataField',
            Value : code,
        }],
        SelectionFields : [
        ],
        LineItem        : [
            {Value : code},
            {Value : toPlant.code},
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>orderClass}',
            TypeNamePlural : '{i18n>orderClasses}',
            Title          : {Value : code},
            Description    : {Value : toPlant_ID}
        },
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#OrderClassesDetails'
        }],

        FieldGroup #OrderClassesDetails : {
            Label : '{i18n>details}',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : code
                },                
                {
                    $Type : 'UI.DataField',
                    Value : toPlant_ID
                },
            ]
        },

    }
);

annotate OrderService.OrderClasses with {
    toPlant @(
        Common : {            
            ValueListWithFixedValues,
            ValueList : {
                SearchSupported : true,
                CollectionPath  : 'VH_Plants',
                Parameters      : [{
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : toPlant_ID,
                    ValueListProperty : '_text'
                    },
                ]
            }
        }
    );
};
