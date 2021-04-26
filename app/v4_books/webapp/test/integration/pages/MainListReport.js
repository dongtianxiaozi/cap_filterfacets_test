sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var AdditionalCustomListReportDefinition = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'v4books',
            componentId: 'BooksList',
            entitySet: 'Books'
        },
        AdditionalCustomListReportDefinition
    );
});