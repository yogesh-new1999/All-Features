sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
    
], function(Controller,JSONModel) {
    'use strict';
    
    return Controller.extend("showshopping.controller.shippers", {
        onInit: function () {
        
            this.shipper();
        },
        shipper : function(){
            
            var oModel = new sap.ui.model.odata.v2.ODataModel({serviceUrl:"https://thingproxy.freeboard.io/fetch/http://services.odata.org/Northwind/Northwind.svc"} );
            var view = this.getView();
            oModel.setUseBatch(false);
            oModel.read("/Shippers",{
                
                success : function(res){
                
                    var values = new JSONModel({
                        ship : res,
                        
                    });
                    view.setModel(values,"shi");
                },
                error : function(Oerror){

                },

               
            });
        },
        onClick : function(a){
            debugger;
            
            
            var x =this.getView().getModel("shi").getProperty(a.getSource().getParent().oBindingContexts.shi.sPath);	
            
            if (!this.pDialog) {
                
                this.pDialog = this.loadFragment({
                    name: "showshopping.view.HelloDialog",
                    
                });
            } 
            //this.pDialog.setModel("shi");
            this.pDialog.then(function(oDialog) {

                oDialog.open();
                var allConte = oDialog.getContent();
                allConte[0].setValue(x.ShipperID);
                
                
            });
        },
        onCloseDialog : function () {
            
            this.byId("helloDialog").close();
        },
        onPricePress : function(){
            debugger;
            var text = this.getView().byId("texx");
            text.addStyleClass("evalPriceButton"); 
        }

    });

    
});