sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
	
	function (Controller,UIComponent) {
		"use strict";

		return Controller.extend("showshopping.controller.master", {
			onInit: function () {

			},
            categoriesDetailView : function () {
				
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("detail");
				
            },
			onProducts: function(){
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("products");
			},
			onShippers: function(){
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("shippers");
			}
		});
	});
