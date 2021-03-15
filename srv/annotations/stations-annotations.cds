namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations with {
    code        @title : '{i18n>station}';
    description @title : '{i18n>stationDescription}';
    toWorkcenter @title : '{i18n>workcenter}';
    toOperator @title : '{i18n>operator}';
    turnRequired @title : '{i18n>turnRequired}';
}

annotate OrderService.Stations with @(
    /*Common.SemanticKey : [
    ],*/
    UI                 : {
        Identification               : [{Value : position}],
        /*SelectionFields              : [
        material,
        batch
        ],*/
        LineItem                     : [
        {Value : description},
        {Value : code},
        {Value : toWorkCenter.code},
        {Value : toOperator.code},
        {Value : turnRequired},
        ],
        HeaderInfo                   : {
            TypeName       : '{i18n>station}',
            TypeNamePlural : '{i18n>stations}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
                Facets                   : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#StationsDetails'
        },
        ],
        FieldGroup #StationsDetails : {
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
                Value : createdAt
            },
            {
                $Type : 'UI.DataField',
                Value : createdBy
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedAt
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedBy
            },
            {
                $Type : 'UI.DataField',
                Value : toWorkCenter_ID
            },
            {
                $Type : 'UI.DataField',
                Value : toOperator_ID
            },
            {
                $Type : 'UI.DataField',
                Value : turnRequired
            },
            {
                $Type : 'UI.DataField',
                Value : turnDateIsToday
            },
            {
                $Type : 'UI.DataField',
                Value : quantityRequired
            },
            {
                $Type : 'UI.DataField',
                Value : turnDate
            },
            {
                $Type : 'UI.DataField',
                Value : pinRequired
            },
            {
                $Type : 'UI.DataField',
                Value : eventNotificationRequired
            },
            {
                $Type : 'UI.DataField',
                Value : multipleOperatorStartsAllowed
            },
            {
                $Type : 'UI.DataField',
                Value : multipleStartsAllowed
            },
            {
                $Type : 'UI.DataField',
                Value : activityAuthorizationRequired
            },
            {
                $Type : 'UI.DataField',
                Value : goodReceiptAuthorizationRequired
            },
            {
                $Type : 'UI.DataField',
                Value : consumptionAuthorizationRequired
            },
            {
                $Type : 'UI.DataField',
                Value : ctecAuthorizationRequired
            }
            ]
        }
    }
);

/*annotate OrderService.Stations with @(
    UI : {LineItem : [
{Value : code},
{Value : description}
]});*/
