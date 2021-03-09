namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.MaterialsToSync with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>materialCode}'
    @Common.IsUpperCase;

    toPlant
    @title     : '{i18n>plant}';

}

annotate OrderService.MaterialsToSync with @(
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
            {Value : ID},
            {Value : code},
            {Value : toPlant.code},
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>material}',
            TypeNamePlural : '{i18n>materials}',
            Title          : {Value : code},
            Description    : {Value : toPlant.code}
        },
        Facets                   : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#MaterialsDetails'
        },
        ],
        FieldGroup #MaterialsDetails : {
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
        }
    }
);
annotate OrderService.MaterialsToSync with {
    toPlant @(
        Common : {            
            ValueListWithFixedValues,
            ValueList : {
                SearchSupported : true,
                CollectionPath  : 'VH_Plants',
                Parameters      : [{
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : toPlant_ID,
                    ValueListProperty : '_ID'
                    },
                ]
            }
        }
    );
};