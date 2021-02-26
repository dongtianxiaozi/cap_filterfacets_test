namespace com.seidor.sfc;

using {OrderService} from '../order-service';

//@title: 'PEPE'
annotate OrderService.Plants with {
    code @title: '{i18n>plant}';
    description @title: '{i18n>description}';
    ID 
    @title: '{i18n>ID}'
    @(Common : {
        Text            : description,
        TextArrangement : #TextOnly
    }); 
};