namespace com.seidor.sfc;

using {OrderService} from '../order-service';

annotate OrderService.OrderClasses with {
    ID
    @UI.Hidden : true;

    code
    @title     : '{i18n>orderClassCode}';

    description
    @title     : '{i18n>orderClass}';

    toPlant
    @title     : '{i18n>Plant}';

}

annotate OrderService.OrderClasses with @(
    /*Common.SemanticKey : [
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
            {Value : toPlant_ID},
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>workCenter}',
            TypeNamePlural : '{i18n>workCenters}',
            Title          : {Value : code},
            Description    : {Value : toPlant_ID}
        }
    }*/
);