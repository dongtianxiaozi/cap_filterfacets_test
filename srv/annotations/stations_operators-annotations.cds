namespace com.seidor.sfc;

using {OrderService} from '../OrderService';


/* annotate OrderService.Stations_Operators with @(Capabilities : {
    Insertable : true,
    Updatable  : false,
    Deletable  : true
}); */

annotate OrderService.Stations_Operators with {
    toOperator          @(Common : {
        Text            : toOperator.code,
        TextArrangement : #TextOnly
    });
    name           @title : '{i18n>operatorName}';
    code           @title : '{i18n>operatorCode}';
    personalNumber @title : '{i18n>personalNumber}';
    toTurn         @title : '{i18n>turnDescription}';
    currentDate    @title : '{i18n>currentDate}';
}

annotate OrderService.Stations_Operators with @(UI : {
    LineItem                            : [
        {Value : toOperator_ID},
        {Value : toOperator.code},
        {Value : toOperator.name}
    ],
    Facets                              : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>details}',
        Target : '@UI.FieldGroup#StationOperatorsDetails'
    }],
    FieldGroup #StationOperatorsDetails : {
        Label : '{i18n>details}',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : toOperator.name
            },
            {
                $Type : 'UI.DataField',
                Value : toOperator.code
            },
            {
                $Type : 'UI.DataField',
                Value : toOperator.personalNumber
            },
            {
                $Type : 'UI.DataField',
                Value : toOperator.toTurn_ID
            },
            {
                $Type : 'UI.DataField',
                Value : toOperator.currentDate
            }
        ]
    }

});
