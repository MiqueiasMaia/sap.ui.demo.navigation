sap.ui.define([
    "sap/ui/demo/navigation/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
    "use strict";
    const _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
    return BaseController.extend("sap.ui.demo.navigation.controller.employee.Resume", {
        onInit: function () {
            var oRouter = this.getRouter();
            this.getView().setModel(new JSONModel(), "view");
            oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            var oArgs, oView, oQuery;
            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();
            oView.bindElement({
                path: "/Employees(" + oArgs.employeeId + ")",
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
            oQuery = oArgs["?query"];
            if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1) {
                oView.getModel("view").setProperty("/selectedTab", oQuery.tab);
                if (oQuery.tab === "Hobbies" || oQuery.tab === "Notes") {
                    this.getRouter().getTargets().display("resumeTab" + oQuery.tab);
                }
            } else {
                this.getRouter().navTo("employeeResume", {
                    employeeId: oArgs.employeeId,
                    "?query": {
                        tab: _aValidTabKeys[0]
                    }
                }, true);
            }
        },
        _onBindingChange: function (oEvent) {
            if (!this.getView().getBindingContext()) {
                this.getRouter().getTargets().display("notFound");
            }
        },
        onTabSelect: function (oEvent) {
            const oContext = this.getView().getBindingContext();
            this.getRouter().navTo("employeeResume", {
                employeeId: oContext.getProperty("EmployeeID"),
                "?query": {
                    tab: oEvent.getParameter("selectedKey")
                }
            }, true);
        }
    });
});