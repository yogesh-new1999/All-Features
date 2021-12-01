sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"showshopping/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("showshopping.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			//add to cart add global model
			
			var jsonDataNew =  new sap.ui.model.json.JSONModel({carts:[]});
			this.setModel(jsonDataNew);


			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
