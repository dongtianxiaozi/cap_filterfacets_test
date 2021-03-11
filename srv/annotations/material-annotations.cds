namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Materials with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>materialCode}'
    @Common.IsUpperCase;

    description
    @title     : '{i18n>materialDescription}';

    toUnit
    @title     : '{i18n>unitCode}'
        @(Common : {Text : {
        $value                 : toUnit.code,
        ![@UI.TextArrangement] : #TextOnly
    }});

    type
    @title     : '{i18n>materialType}';

    isBatchManaged
    @title     : '{i18n>isBatchManaged}';

}

annotate OrderService.Materials with @(
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
            {Value : code},
            {Value : description},
            {Value : toUnit.code},
            {Value : type},
            {Value : isBatchManaged}
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>material}',
            TypeNamePlural : '{i18n>materials}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                   : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#materialsDetails'
        },
        ],
        FieldGroup #materialsDetails : {
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
                Value : toUnit_ID
            },
                        {
                $Type : 'UI.DataField',
                Value : type
            },
                        {
                $Type : 'UI.DataField',
                Value : isBatchManaged
            },
            ]
        }
    }
);

annotate OrderService.Materials with {
    toUnit @(
        Common : {            
            ValueListWithFixedValues,
            ValueList : {
                SearchSupported : true,
                CollectionPath  : 'VH_Units',
                Parameters      : [{
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : toUnit_ID,
                    ValueListProperty : '_ID'
                    },
                ]
            }
        }
    );
};