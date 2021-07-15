Solució:

cal posar el flag "persistTechnicalMessages": true al model:

es pot fer de dues maneres:

- la bona, al manifest:

            "": {
                "dataSource": "mainService",
                "preload": true,
                "settings": {
                    "defaultBindingMode": "TwoWay",
                    "defaultCountMode": "Inline",
                    "refreshAfterChange": false,
                    "metadataUrlParams": {
                        "sap-value-list": "none"
                    },
                    "persistTechnicalMessages": true
                }
            }

- via extensió

    sap.ui.controller("com.seidor.sfc.apps.manage.managestations.ext.controller.DetailsExtension", {
        onInit: function (oEvent) {
            //debugger        
        },

        onBeforeRendering: function () {
            debugger
            this.getView().getModel().setPersistTechnicalMessages(true)
        },

        onAfterRendering: function () {
            //debugger
        }
    })