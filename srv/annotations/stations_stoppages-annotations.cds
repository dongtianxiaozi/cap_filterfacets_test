namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations_Stoppages with {
    code        @title : '{i18n>stoppageCode}'
    @Common.IsUpperCase;
    description @title : '{i18n>stoppageDescription}';
}

annotate OrderService.Stations_Stoppages with @(UI : {LineItem : [
    {Value : toStoppage.code},
    {Value : toStoppage.description},
]});