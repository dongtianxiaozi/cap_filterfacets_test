namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Operations with {
    ID            @(Common : {
        Text            : operation,
        TextArrangement : #TextOnly
    }
    //UI.HiddenFilter : true
    );
    //ID                   @Core.Computed;
    code          @title : '{i18n>order}';
    operation     @title : '{i18n>operation}'  @UI.HiddenFilter;
    controlKey    @title : '{i18n>controlKey}';
    isExternal    @title : '{i18n>isExternal}';
    isNotifiable  @title : '{i18n>isNotifiable}';
    text          @title : '{i18n>text}';
    workCenter    @title : '{i18n>workCenter}'  @UI.HiddenFilter;
    quantity      @title : '{i18n>quantity}'  @UI.HiddenFilter;
    baseQuantity  @title : '{i18n>baseQuantity}'  @UI.HiddenFilter;
    queueSequence @title : '{i18n>queueSequence}';
}

// Value Lists
annotate OrderService.Operations with {
    toOrder      @(
        title  : '{i18n>order}',
        Common : {
            Text      : {
                $value                 : order_,
                ![@UI.TextArrangement] : #TextOnly
            },
            ValueListWithFixedValues,
            ValueList : {
                SearchSupported : true,
                CollectionPath  : 'VH_Orders',
                Parameters      : [
                    {
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : toOrder_ID,
                        ValueListProperty : 'ID'
                    },
                    {
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : order_,
                        ValueListProperty : 'code'
                    }
                ]
            }
        }
    );
    toWorkCenter @(
        title  : '{i18n>workCenter}',
        Common : {
            Text      : {
                $value                 : workCenter,
                ![@UI.TextArrangement] : #TextOnly
            },
            ValueList : {
                SearchSupported : true,
                CollectionPath  : 'VH_WorkCenters',
                Parameters      : [
                    {
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : toWorkCenter_ID,
                        ValueListProperty : 'ID'
                    },
                    {
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : workCenter,
                        ValueListProperty : 'code'
                    },
                    {
                        $Type             : 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty : 'text'
                    }
                ]
            }
        }
    );
};

annotate OrderService.Operations with {
    workCenter   @Common : {
        Text            : toWorkCenter.code,
        TextArrangement : #TextOnly
    };
    isExternal   @Common : {ValueListWithFixedValues};
    isNotifiable @Common : {ValueListWithFixedValues};
}

// Navigations
annotate OrderService.Operations with {
    controlKey @Common.SemanticObject : 'order';
    toOrder_ID @Common.SemanticObject : 'order';
    order_     @Common.SemanticObject : 'order';
}

annotate OrderService.Operations with @(
    Common.SemanticKey : [
        toOrder.code,
        operation
    ],
    UI                 : {
        Identification               : [{Value : operation}],
        SelectionFields              : [
            toOrder_ID,
            controlKey,
            isExternal,
            isNotifiable,
            toWorkCenter_ID
        ],
        LineItem                     : [
            /*la navegació seguent SI funciona, veure document explicatiu, va amb el @Common.SemanticObject*/
            {Value : toOrder_ID},
            /*la navegació aquesta no funciona, veure document explicatiu
            {Value : order_},
            */
            /*la navegació aquesta no funciona, veure document explicatiu
            {
        $Type:'UI.DataFieldWithIntentBasedNavigation',
        Value: toOrder_ID,
        SemanticObject: 'order',
        Action: 'navigate',
      },
            */
            /*la navegació seguent no funciona, veure document explicatiu*/
            {
                $Type           : 'UI.DataFieldForIntentBasedNavigation',
                Label           : 'Go to order',
                SemanticObject  : 'order',
                Action          : 'navigate',
                RequiresContext : true,
                Inline          : true
            },
            /*fi*/
            {Value : operation},
            /*la navegació seguent SI funciona, veure document explicatiu*/
            {
                $Type : 'UI.DataFieldWithUrl',
                Value : order_,
                Url   : semanticURLtoOrder
            },
            /*fi*/
            /*la navegació seguent SI funciona, veure document explicatiu, va amb el @Common.SemanticObject*/
            {Value : controlKey},
            /*fi*/
            {Value : isExternal},
            {Value : isNotifiable},
            {Value : toWorkCenter.code},
            {Value : toWorkCenter.plant},
            {Value : quantity},
            {Value : baseQuantity}
        ],
        HeaderInfo                   : {
            TypeName       : '{i18n>operation}',
            TypeNamePlural : '{i18n>operations}',
            Title          : {Value : operation},
            Description    : {Value : text}
        },
        Facets                       : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#OperationDetails'
        }],
        FieldGroup #OperationDetails : {
            Label : '{i18n>details}',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : toOrder_ID
                },
                {
                    $Type : 'UI.DataField',
                    Value : controlKey
                },
                {
                    $Type : 'UI.DataField',
                    Value : isExternal
                },
                {
                    $Type : 'UI.DataField',
                    Value : isNotifiable
                },
                {
                    $Type : 'UI.DataField',
                    Value : toWorkCenter.code
                },
                {
                    $Type : 'UI.DataField',
                    Value : quantity
                },
                {
                    $Type : 'UI.DataField',
                    Value : baseQuantity
                }
            ]
        }
    }
);
