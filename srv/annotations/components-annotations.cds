namespace com.seidor.sfc;

using { OrderService } from '../order-service';

annotate OrderService.Components with {
    ID              @Common : {
        Text            : position,
        TextArrangement : #TextOnly

    };
    code            @title  : '{i18n>order}';
    operation       @title  : '{i18n>operation}';
    position        @title  : '{i18n>position}';
    material        @title  : '{i18n>material}';
    batch           @title  : '{i18n>batch}';
    isNegative      @title  : '{i18n>isNegative}'  @UI.HiddenFilter;
    reserve         @title  : '{i18n>reserve}';
    reservePosition @title  : '{i18n>reservePosition}'  @UI.HiddenFilter;
    quantity        @title  : '{i18n>quantity}'  @UI.HiddenFilter;
    indBackflush    @title  : '{i18n>indBackflush}'  @UI.HiddenFilter;
}

annotate OrderService.Components with @(
    Common.SemanticKey : [
    toOrder.code,
    position
    ],
    UI                 : {
        Identification               : [{Value : position}],
        SelectionFields              : [
        material,
        batch
        ],
        LineItem                     : [
        {Value : position},
        {Value : material},
        {Value : batch},
        {Value : isNegative},
        {Value : quantity},
        {Value : toOperation.operation},
        {Value : reserve},
        {Value : reservePosition},
        {Value : indBackflush}
        ],
        HeaderInfo                   : {
            TypeName       : '{i18n>component}',
            TypeNamePlural : '{i18n>components}',
            Title          : {Value : position},
            Description    : {Value : material}
        },
        FieldGroup #ComponentDetails : {
            Label : '{i18n>details}',
            Data  : [
            {
                $Type : 'UI.DataField',
                Value : material
            },
            {
                $Type : 'UI.DataField',
                Value : batch
            },
            {
                $Type : 'UI.DataField',
                Value : isNegative
            },
            {
                $Type : 'UI.DataField',
                Value : quantity
            },
            {
                $Type : 'UI.DataField',
                Value : reserve
            },
            {
                $Type : 'UI.DataField',
                Value : reservePosition
            },
            {
                $Type : 'UI.DataField',
                Value : indBackflush
            }
            ]
        }
    }
);
