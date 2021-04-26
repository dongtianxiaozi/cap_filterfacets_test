sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'booksv2/test/integration/pages/MainListReport' ,
        'booksv2/test/integration/pages/MainObjectPage',
        'booksv2/test/integration/OpaJourney'
    ],
    function(JourneyRunner, MainListReport, MainObjectPage, Journey) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('booksv2') + '/index.html'
        });

        
        JourneyRunner.run(
            {
                pages: { onTheMainPage: MainListReport, onTheDetailPage: MainObjectPage }
            },
            Journey.run
        );
        
    }
);