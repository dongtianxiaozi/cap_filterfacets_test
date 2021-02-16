namespace com.seidor.sfc;

using {OrderService} from '../order-service';

annotate OrderService.Orders with {
    ID               @Common : {
        Text            : code,
        TextArrangement : #TextOnly

    };
    ID               @Core.Computed
                     @UI.Hidden
                     @UI.HiddenFilter;
    code             @title  : '{i18n>order}';
    type             @title  : '{i18n>type}';
    category         @title  : '{i18n>category}';
    text             @title  : '{i18n>text}'
                     @UI.HiddenFilter;
    plant            @title  : '{i18n>plant}';
    plannedStartDate @title  : '{i18n>plannedStartDate}'
                     @UI.HiddenFilter;
    plannedStartTime @title  : '{i18n>plannedStartTime}';
    totalQuantity    @title  : '{i18n>totalQuantity}'  @UI.HiddenFilter;
    unit             @title  : '{i18n>unit}'  @UI.HiddenFilter;
    material         @title  : '{i18n>material}'  @UI.HiddenFilter;
    supervisor       @title  : '{i18n>supervisor}';
    supervisorName   @title  : '{i18n>superviorName}'  @UI.HiddenFilter;
    importance       @title  : '{i18n>importance}'  @UI.HiddenFilter;
}

annotate OrderService.Orders with @(
    Common.SemanticKey : [code],
    UI                 : {
        Identification           : [{Value : code}],
        SelectionFields          : [
        ID,
        type,
        category,
        plant,
        plannedStartDate,
        supervisor
        ],
        LineItem                 : [
        {Value : code},
        {Value : type},
        {Value : category},
        {Value : plannedStartDate},
        {Value : plannedStartTime},
        {Value : totalQuantity},
        {Value : material}
        ],
        HeaderInfo               : {
            TypeName       : '{i18n>order}',
            TypeNamePlural : '{i18n>orders}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                   : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#OrderDetails'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>operations}',
            Target : 'toOperations/@UI.LineItem'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>components}',
            Target : 'toComponents/@UI.LineItem'
        }
        ],
        FieldGroup #OrderDetails : {
            Label : '{i18n>details}',
            Data  : [
            {
                $Type : 'UI.DataField',
                Value : code
            },
            {
                $Type : 'UI.DataField',
                Value : type
            },
            {
                $Type : 'UI.DataField',
                Value : category
            },
            {
                $Type : 'UI.DataField',
                Value : plant
            },
            {
                $Type : 'UI.DataField',
                Value : plannedStartDate
            },
            {
                $Type : 'UI.DataField',
                Value : plannedStartTime
            }
            ]
        }
    }
);
