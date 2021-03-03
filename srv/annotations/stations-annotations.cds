namespace com.seidor.sfc;

using {OrderService} from '../OrderService';

annotate OrderService.Stations with {
    code        @title : '{i18n>station}';
    description @title : '{i18n>stationDescription}';
}

annotate OrderService.Stations with @(UI : {LineItem : [
{Value : code},
{Value : description}
]});
