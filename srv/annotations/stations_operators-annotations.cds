namespace com.seidor.sfc;

using {OrderService} from '../OrderService';


annotate OrderService.Stations_Operators with @(
    Capabilities: { Insertable:true, Updatable:false, Deletable:true }
);

annotate OrderService.Stations_Operators with {
    name           @title : '{i18n>operatorName}';   
    code           @title : '{i18n>operatorCode}';
    personalNumber @title : '{i18n>personalNumber}';
    toTurn         @title : '{i18n>turnDescription}';
    currentDate    @title : '{i18n>currentDate}';
}

annotate OrderService.Stations_Operators with @(UI : {LineItem : [
    {Value : toOperator.name},
    {Value : toOperator.code},
    {Value : toOperator.personalNumber},
    {Value : toOperator.toTurn.description},
    {Value : toOperator.currentDate}
]});