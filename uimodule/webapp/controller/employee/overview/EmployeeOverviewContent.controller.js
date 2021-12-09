sap.ui.define([
    "sap/ui/demo/navigation/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/ViewSettingsDialog",
    "sap/m/ViewSettingsItem"
], function (BaseController, Filter, FilterOperator, Sorter, ViewSettingsDialog, ViewSettingsItem) {
    "use strict";

    return BaseController.extend("sap.ui.demo.navigation.controller.employee.overview.EmployeeOverviewContent", {
        onInit: function () {
            var oRouter = this.getRouter();

            this._oTable = this.byId("employeesTable");
            this._oVSD = null;
            this._sSortField = null;
            this._bSortDescending = false;
            this._aValidSortFields = ["EmployeeID", "FirstName", "LastName"];
            this._sSearchQuery = null;
            this._oRouterArgs = null;
            this._initViewSettingsDialog();
            oRouter.getRoute("employeeOverview").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._oRouterArgs = oEvent.getParameter("arguments");
            this._oRouterArgs["?query"] = this._oRouterArgs["?query"] || {};
            var oQueryParameter = this._oRouterArgs["?query"];
            this._applySearchFilter(oQueryParameter.search);
            this._applySorter(oQueryParameter.sortField, oQueryParameter.sortDescending);
            if (oQueryParameter.showDialog) {
                this._oVSD.open();
            }
        },

        onSortButtonPressed: function () {
            var oRouter = this.getRouter();
			this._oRouterArgs["?query"].showDialog = 1;
			oRouter.navTo("employeeOverview", this._oRouterArgs);
        },

        onSearchEmployeesTable: function (oEvent) {
            var oRouter = this.getRouter();
            this._oRouterArgs["?query"].search = oEvent.getSource().getValue();
            oRouter.navTo("employeeOverview", this._oRouterArgs, true);
        },

        _applySorter: function (sSortField, sortDescending) {
            var bSortDescending, oBinding, oSorter;
            if (sSortField && this._aValidSortFields.indexOf(sSortField) > -1) {

                if (typeof sortDescending === "string") {
                    bSortDescending = sortDescending === "true";
                } else if (typeof sortDescending === "boolean") {
                    bSortDescending = sortDescending;
                } else {
                    bSortDescending = false;
                }

                if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
                    return;
                }

                this._sSortField = sSortField;
                this._bSortDescending = bSortDescending;
                oSorter = new Sorter(sSortField, bSortDescending);

                this._syncViewSettingsDialogSorter(sSortField, bSortDescending);

                oBinding = this._oTable.getBinding("items");
                oBinding.sort(oSorter);
            }
        },

        _initViewSettingsDialog: function () {
            var oRouter = this.getRouter();
            this._oVSD = new ViewSettingsDialog("vsd", {
                confirm: function (oEvent) {
                    var oSortItem = oEvent.getParameter("sortItem");
                    this._oRouterArgs["?query"].sortField = oSortItem.getKey();
                    this._oRouterArgs["?query"].sortDescending = oEvent.getParameter("sortDescending");
                    delete this._oRouterArgs["?query"].showDialog;
                    oRouter.navTo("employeeOverview", this._oRouterArgs, true);
                }.bind(this),
                cancel: function (oEvent) {
                    delete this._oRouterArgs["?query"].showDialog;
                    oRouter.navTo("employeeOverview", this._oRouterArgs, true);
                }.bind(this)
            });

            this._oVSD.addSortItem(new ViewSettingsItem({
                key: "EmployeeID",
                text: "Employee ID",
                selected: true
            }));

            this._oVSD.addSortItem(new ViewSettingsItem({
                key: "FirstName",
                text: "First Name",
                selected: false
            }));

            this._oVSD.addSortItem(new ViewSettingsItem({
                key: "LastName",
                text: "Last Name",
                selected: false
            }));
        },

        _applySearchFilter: function (sSearchQuery) {
            var aFilters, oFilter, oBinding;

            if (this._sSearchQuery === sSearchQuery) {
                return;
            }
            this._sSearchQuery = sSearchQuery;
            this.byId("searchField").setValue(sSearchQuery);

            aFilters = [];
            if (sSearchQuery && sSearchQuery.length > 0) {
                aFilters.push(new Filter("FirstName", FilterOperator.Contains, sSearchQuery));
                aFilters.push(new Filter("LastName", FilterOperator.Contains, sSearchQuery));
                oFilter = new Filter({ filters: aFilters, and: false });
            } else {
                oFilter = null;
            }

            oBinding = this._oTable.getBinding("items");
            oBinding.filter(oFilter, "Application");
        },

        _syncViewSettingsDialogSorter: function (sSortField, bSortDescending) {
            this._oVSD.setSelectedSortItem(sSortField);
            this._oVSD.setSortDescending(bSortDescending);
        },

        onItemPressed: function (oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oCtx = oItem.getBindingContext();
            this.getRouter().navTo("employeeResume", {
                employeeId: oCtx.getProperty("EmployeeID"),
                "?query": {
                    tab: "Info"
                }
            });
        }
    });
});