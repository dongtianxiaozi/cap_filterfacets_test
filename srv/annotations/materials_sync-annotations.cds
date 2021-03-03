namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.MaterialsToSync with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>materialCode}';

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
            {Value : toPlant_ID},
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>material}',
            TypeNamePlural : '{i18n>materials}',
            Title          : {Value : code},
            Description    : {Value : toPlant_ID}
        }
    }
);