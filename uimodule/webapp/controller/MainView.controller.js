sap.ui.define([
    "sap/ui/demo/navigation/controller/BaseController",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageToast) {
        "use strict";

        return BaseController.extend("sap.ui.demo.navigation.controller.MainView", {
            onDisplayNotFound: function (){
                this.getRouter().getTargets().display("notFound", {
                    fromTarget: "home"
                });
            },

            onNavToEmployees: function () {
                this.getRouter().navTo("employeeList");
            }
        });
    });
