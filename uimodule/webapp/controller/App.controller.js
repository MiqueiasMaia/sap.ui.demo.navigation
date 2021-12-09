sap.ui.define([
    "sap/ui/demo/navigation/controller/BaseController",
    "sap/m/MessageToast",
	"sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageToast, Log) {
        "use strict";

        return BaseController.extend("sap.ui.demo.navigation.controller.App", {
            onInit: function () {
                Log.setLevel(Log.Level.INFO);
                const oRouter = this.getRouter();
                oRouter.attachBypassed(function (oEvent) {
                    var sHash = oEvent.getParameter("hash");
                    const info = `Sorry, but the hash '` + sHash + `' is invalid. The resource was not found.`;
                    Log.info(info);
                    MessageToast.show(info);
                });
            }
        });
    });
