namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations with {
    code        @title : '{i18n>stationCode}';
    description @title : '{i18n>stationDescription}';
    toWorkCenter @title : '{i18n>workcenterCode}';
        /*@(Common : {Text : {
        $value                 : toWorkCenter.code,
        ![@UI.TextArrangement] : #TextOnly
    }});*/

    toOperator @title : '{i18n>operatorCode}'
    @(Common : {Text : {
        $value                 : toOperator.code,
        ![@UI.TextArrangement] : #TextOnly
    }});

    turnRequired @title : '{i18n>turnRequired}';
}

annotate OrderService.Stations with @(
    /*Common.SemanticKey : [
    ],*/
    UI                 : {
        Identification               : [{Value : code}],
        /*SelectionFields              : [
        material,
        batch
        ],*/
        LineItem                     : [
        {Value : description},
        {Value : code},
        /*{Value : toWorkCenter.code},*/
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
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>operators}',
            Target : 'toOperators/@UI.LineItem'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>turns}',
            Target : 'toTurns/@UI.LineItem'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>workcenters}',
            Target : 'toWorkCenters/@UI.LineItem'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>stoppage}',
            Target : 'toStoppages/@UI.LineItem'
        }
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
            /*{
                $Type : 'UI.DataField',
                Value : toWorkCenter_ID
            },*/
            {
                $Type : 'UI.DataField',
                Value : toOperator_ID
            },
            {
                $Type : 'UI.DataField',
                Value : turnRequired
            },
            ]
        }
    }
);

annotate OrderService.Stations with {
    toOperator @(
        Common : {            
            ValueListWithFixedValues,
            ValueList : {
                SearchSupported : true,
                CollectionPath  : 'VH_Operators',
                Parameters      : [{
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : toOperator_ID,
                    ValueListProperty : '_ID'
                    },
                ]
            }
        }
    );
};
