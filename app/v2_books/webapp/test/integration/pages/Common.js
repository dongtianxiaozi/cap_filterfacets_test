sap.ui.define([
    "sap/ui/test/Opa5",
    "v2books/localService/mockserver"
  ], function (Opa5, mockserver) {
    "use strict";
  
    return Opa5.extend("v2books.test.integration.pages.Common", { 
        iStartMyApp: function () {
            var sPath = sap.ui.require.toUrl("v2books/test");
            return this.iStartMyAppInAFrame(sPath + "/flpSandboxMockServer.html#masterDetail-display");
        }
    });
  }
);