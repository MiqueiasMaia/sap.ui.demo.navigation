sap.ui.define([
    'sap/ui/demo/navigation/controller/BaseController',
], function (BaseController) {
    "use strict";

    return BaseController.extend("sap.ui.demo.navigation.controller.employee.EmployeeList", {
        onInit: function () {
            const oRouter = this.getRouter();
            oRouter.getRouter('employee').attachRouteMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            const oArgs = oEvent.getParameter('arguments');
            const oView = this.getView();

            oView.bindElement({
                path: '/Employees(' + oArgs.employeeId + ')',
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function (oEvent) {
                        oView.setBusy(true);
                    },
                    dataReceived: function (oEvent) {
                        oView.setBusy(false);
                    }
                }
            });
        },
        _onBindingChange: function (oEvent) {
            if (!this.getView().getBindingContext()) {
                this.getRouter().getTargets().display("notFound");
            }
        }
    });
});