sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
	'sap/m/MessageToast'
	
],
	function (Controller,JSONModel,UIComponent,MessageToast	) {
		"use strict";
		var arr = [];
		var arrFiltered;
		
		return Controller.extend("showshopping.controller.products", {
			onInit: function () {
				
				this.order();
			},
			
			order : function(){
				
				var oModel = new sap.ui.model.odata.v2.ODataModel({serviceUrl:"https://thingproxy.freeboard.io/fetch/http://services.odata.org/Northwind/Northwind.svc"} );
				var view = this.getView();
				oModel.setUseBatch(false);
				oModel.read("/Products",{
					
					success : function(res){
						
						var values = new JSONModel({
							product : res,
							
						});
						view.setModel(values,"pro");
					},
					error : function(Oerror){

					},

				   
				});
			   
			},
			onAddCart : function(oev){
				debugger;
				var i;
				
				var oTable = this.getView().byId("idOrdersTable");
				var oModel2 = oTable.getModel("pro");
				
				var aContext = oTable.getSelectedContexts();
				if(aContext.length === 0){
					
					return MessageToast.show("Select Check Box");

				}
				
				for( i = aContext.length-1; i >= 0; i--){
					var thisObj = aContext[i];
					var pathData = oTable.getModel("pro").getProperty(thisObj.getPath());
					var val = {"productname":pathData.ProductName,"unitprice":pathData.UnitPrice,"unitstock":pathData.UnitsInStock};
					arr.push(val);
					
					
				}
				
				var uniq = {};//dublication remove
				 arrFiltered = arr.filter(obj => !uniq[obj.productname] && (uniq[obj.productname] = true));
				
				
				
			
				var x=JSON.stringify(arrFiltered);
				var param = {};
				param.keyValue=x;

				this.getView().getModel().setProperty("/carts",arrFiltered); //gloab set selected data
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("addCart",{
					value:param
				},true);
			},
			onViewCart : function(){
                debugger;
				
				var x=JSON.stringify(arrFiltered);
				var param = {};
				param.keyValue=x;

				this.getView().getModel().setProperty("/carts",arrFiltered); //gloab set selected data
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("addCart",{
					value:param
				},true);

			}
		});
	});

	