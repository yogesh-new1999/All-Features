sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/vk/ContentResource"


], function (Controller, UIComponent,ContentResource) {
	"use strict";

	return Controller.extend("shop.controller.cateNestedDetail", {
		onInit: function () {

			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("cateNestedDetail").attachMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {

			var oRouterArgs = oEvent.getParameter("arguments");
			var contextArgs = oRouterArgs["?value"].cate || {};

			var getId = this.getView().byId("idNestedDetai");
			getId.setValue(contextArgs);


			var oRouterArgss = oEvent.getParameter("arguments");
			var contextArgsd = oRouterArgss["?value"].discription || {};

			var disc = this.getView().byId("idNestedDeta");
			disc.setValue(contextArgsd);
		},
		onBack: function () {

			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("detail", true);
		},
		onClick: function (a) {



			var x = a.getSource().getValue();

			if (!this.pDialog) {

				this.pDialog = this.loadFragment({
					name: "showshopping.view.HelloDialog",

				});
			}

			this.pDialog.then(function (oDialog) {

				oDialog.open();
				var allConte = oDialog.getContent();
				allConte[0].setValue(x);


			});
		},
		onCloseDialog: function () {

			this.byId("helloDialog").close();
		}

	});
});