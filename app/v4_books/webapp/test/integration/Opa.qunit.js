sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'v4books/test/integration/pages/MainListReport' ,
        'v4books/test/integration/pages/MainObjectPage',
        'v4books/test/integration/OpaJourney'
    ],
    function(JourneyRunner, MainListReport, MainObjectPage, Journey) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('v4books') + '/index.html'
        });

        
        JourneyRunner.run(
            {
                pages: { onTheMainPage: MainListReport, onTheDetailPage: MainObjectPage }
            },
            Journey.run
        );
        
    }
);