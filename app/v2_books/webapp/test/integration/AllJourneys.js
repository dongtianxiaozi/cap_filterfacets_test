QUnit.config.autostart = false;

sap.ui.define([
	"sap/ui/test/Opa5",
    "v2books/test/integration/pages/Common",
	"sap/suite/ui/generic/template/integration/testLibrary/ListReport/pages/ListReport",
	"sap/suite/ui/generic/template/integration/testLibrary/ObjectPage/pages/ObjectPage",
	"v2books/test/integration/ListTest"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "v2books.view",
		testLibs: {
			fioriElementsTestLibrary: {
				Common: {
					appId: "v2books",
					entitySet: "Books"
				}
			}
		}
	});
});