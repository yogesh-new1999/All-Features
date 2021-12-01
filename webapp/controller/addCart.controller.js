sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	'sap/m/MessageToast'
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,UIComponent,MessageToast) {
		"use strict";
		var arr = [];
		return Controller.extend("showshopping.controller.addCart", {
            onInit: function () {
				var oRouter = UIComponent.getRouterFor(this);
			 	oRouter.getRoute("addCart").attachMatched(this.addToCart, this);

				
				
			},
			myFormatter : function(val,va){
			
				
				var sTock = parseInt(va);
				var total = val * sTock;
				var totalVal = arr.push(total);
				 var setViewAll = this.getView().byId("tot");
				 setViewAll.setValue(totalVal);	
				
			},
			// myNum : function(num){
			// 	debugger;
			// 	var oFormat = NumberFormat.getCurrencyInstance({
					
			// 	});
			// 	var changeData = oFormat.format(num);
			// 	var numForm = this.getView().byId("unitPrize");
			// 	numForm.setText(changeData);	
				
			// },

			addToCart : function(oEvent){
				
				var view = this.getView();
				var allRecords = view.getModel().getProperty("/carts"); // access gloab data 
			
			},
            ondelete : function(oEvent){
			debugger;
			
				
				var oTable = this.getView().byId("idAddcartTable");
				var aSelectedItems = oTable.getSelectedItems();
			   
				for(var i=0; i<aSelectedItems.length; i++){
				   oTable.removeItem(aSelectedItems[i]);
				   MessageToast.show("Item Closed: ");
				}
				

			},
            onBack: function () {
           
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("products", true);
            }
		});
	});
