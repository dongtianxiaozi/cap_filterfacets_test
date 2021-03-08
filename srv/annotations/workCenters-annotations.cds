namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.WorkCenters with {
    ID
    @title     : '{i18n>ID}'
    //@UI.Hidden : true
    @(Common : {
        Text            : code,
        TextArrangement : #TextFirst        
    });
    code
    @title     : '{i18n>workCenter}'
    @(Common : {
        Text            : description,
        TextArrangement : #TextLast
    });
    description
    @title     : '{i18n>workCenterDescription}';
    plant

    @title     : '{i18n>workCenterPlant}';
    responsible
    @title     : '{i18n>responsible}';
    queueType

    @title     : '{i18n>queueType}';
    isOeeRelevant

    @title     : '{i18n>isOeeRelevant}';

}

annotate OrderService.WorkCenters with @(
    Common.SemanticKey : [
        code,
        plant
    ],
    UI                 : {
        Identification  : [{
            $Type : 'UI.DataField',
            Value : code,
        }],
        SelectionFields : [
            ID,
            code,
            plant,
            responsible,
            queueType
        ],
        LineItem        : [
            {Value : ID},
            {Value : code},
            {Value : plant},
            {Value : responsible},
            {Value : queueType},
            {Value : isOeeRelevant},
        ],
        HeaderInfo      : {
            TypeName       : '{i18n>workCenter}',
            TypeNamePlural : '{i18n>workCenters}',
            Title          : {Value : code},
            Description    : {Value : description}
        }
    }
);
