sap.ui.define([
    'sap/ui/demo/navigation/controller/BaseController',
], function (BaseController) {
    "use strict";

    return BaseController.extend("sap.ui.demo.navigation.controller.employee.EmployeeList", {
        onListItemPressed: function (oEvent) {
            const oItem = oEvent.getSource();
            const oCtx = oItem.getBindingContext();
            this.getRouter().navTo("employee", {
                employeeId: oCtx.getProperty("EmployeeID")
            });
        }
    });
});