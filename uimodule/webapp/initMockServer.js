sap.ui.define([
    "sap/m/MessageBox",
    "sap/ui/demo/navigation/localService/mockServer"
], function(mockserver, MessageBox) {
    "use strict";

	mockserver.init().catch(function (oError) {
		MessageBox.error(oError.message);
	}).finally(function () {
		sap.ui.require(["sap/ui/core/ComponentSupport"]);
	});
});