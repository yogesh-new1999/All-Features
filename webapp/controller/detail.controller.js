sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel,Filter,FilterOperator) {
		"use strict";

		return Controller.extend("showshopping.controller.detail", {
			onInit: function () {
                this.callQriesData();
			},
            callQriesData : function(){
        
                var oModel = new sap.ui.model.odata.v2.ODataModel({serviceUrl:"https://thingproxy.freeboard.io/fetch/http://services.odata.org/Northwind/Northwind.svc"} );
                var view = this.getView();
                oModel.setUseBatch(false);
                oModel.read("/Categories",{
                    success : function(res){
                     
                        var valu = new JSONModel({
                            categories : res,
                            
                        });
                        view.setModel(valu,"cat");
                    },
                    error : function(Oerror){
                  
                    },
                   
                });
            },
            onDetailPress : function(oEvent){ // selecting row data we found
            
              
                var sModelPath = oEvent.getSource().getBindingContext('cat').getPath();
                var sDiD = this.getView().getModel("cat").getProperty(sModelPath);
                var param = {'cate':sDiD.CategoryID,'discription':sDiD.Description};
                  var oRouter = this.getOwnerComponent().getRouter();
                  oRouter.navTo("cateNestedDetail", {
                    value:param
                    
                  },true);
                },
            onFilterPosts : function(search){
                
                var sQuer = search.getParameter("query");
                var sQuery = sQuer.toString();

                var oFilter = new Filter({
                    filters:[
                         new Filter("CategoryName", FilterOperator.Contains, sQuery),
                     new Filter("Description", FilterOperator.Contains, sQuery),
                     new Filter("CategoryID", FilterOperator.EQ, sQuery)                    
                ]
            });
            if(sQuery){
                var cha = parseInt(sQuery);
                
                var data = new Filter("CategoryID",FilterOperator.EQ,cha);
                var oTabl = this.byId("idCategoriesTable");
                var oBinding = oTabl.getBinding("items");
              
                oBinding.filter(data);

            }
            var oTable = this.byId("idCategoriesTable");
            var oBinding = oTable.getBinding("items");
          
            oBinding.filter(oFilter);
                
        }
	});
});
