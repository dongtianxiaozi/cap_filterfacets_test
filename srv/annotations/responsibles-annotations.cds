namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Responsibles with {
    ID
    @UI.Hidden;

    toPlant
    @title: '{i18n>plants}'
        @(Common : {Text : {
        $value                 : toPlant.description,
        ![@UI.TextArrangement] : #TextOnly
    }});
            /*@(Common : {Text : {
        $value                 : toPlant.description,
        ![@UI.TextArrangement] : #TextOnly
    }})*/


    description
    @title : '{i18n>description}';   

    code
    @title : '{i18n>responsible}';    

};

annotate OrderService.Responsibles with @(
    Common.SemanticKey : [toPlant.code, 
                          code],
    UI                 : {
        Identification           : [{
            $Type : 'UI.DataField',
            Value : code,
        }],
        SelectionFields          : [toPlant_ID],
        LineItem                 : [
            {Value : toPlant.code},
            {Value : code},
            {Value : description},
            {Value : toPlant.description},
        ],
        HeaderInfo               : {
            TypeName       : '{i18n>responsible}',
            TypeNamePlural : '{i18n>responsibles}',
            Title          : {Value : code},
            Description    : {Value : description}
        },

        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#ResponsiblesDetails'
        }],

        FieldGroup #ResponsiblesDetails : {
            Label : '{i18n>details}',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : toPlant_ID,
                },
                {
                    $Type : 'UI.DataField',
                    Value : description

                },                
                {
                    $Type : 'UI.DataField',
                    Value : code
                },
                {
                    $Type : 'UI.DataField',
                    Value : toPlant.description
                },
            ]
        },
    }
);

annotate OrderService.Responsibles with {
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
                    /*{
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : toPlant.description,
                    ValueListProperty : '_text'
                    }*/
                ]
            }
        }
    );
};