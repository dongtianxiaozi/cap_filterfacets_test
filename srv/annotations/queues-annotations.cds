namespace com.seidor.sfc;

using { OrderService } from '../OrderService';

/* les anotacions d'aquesta entitat estan a la propia app */

/* annotate com.seidor.sfc.Queues with {
    operation       @title : '{i18n>operation}';
    orderId         @title : '{i18n>orderId}';
    orderIdReadable @title : '{i18n>orderIdReadable}';
    workCenter      @title : '{i18n>workCenter}';
    queueSequence   @title : '{i18n>queueSequence}';
} */

/* annotate OrderService.Queues with @(UI : {
    SelectionFields : [
    orderId,
    workCenter
    ],
    LineItem        : [
    {Value : operation},
    {Value : orderId},
    {Value : orderIdReadable},
    {Value : workCenter},
    {Value : queueSequence}
    ],
    HeaderInfo      : {
        TypeName       : '{i18n>queue}',
        TypeNamePlural : '{i18n>queues}'
    }
}); */
