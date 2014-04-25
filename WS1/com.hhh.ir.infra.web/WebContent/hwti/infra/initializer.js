define([ "dojo/_base/declare", "dijit/Menu", "dijit/MenuItem"],

function(declare, Menu, MenuItem) {
	return declare("hwti.infra.initializer", [], {
		constructor : function(args) {

			var prop = null;
			for (prop in args)
				this[prop] = args[prop];

		},

		// postMixInProperties: function () {
		// this.inherited(arguments);
		// },
		//
		// buildRendering: function () {
		// this.inherited(arguments);
		// },
		//
		// postCreate: function () {
		// this.inherited(arguments);
		// },
		//
		// startup: function () {
		// this.inherited(arguments);
		// },
		//        
		loadApplicationMenuItems : function(applicationMainMenu) {

			var loadModuleContributorsService = {
				url : "/infraweb/request.do?action=getModuleContributors",
				handleAs : "json",
				preventCache : true
			};

			dojo.connect(loadModuleContributorsService, "load", this, dojo
					.hitch(this, this.handleLoadModuleContributorsSuccess,
							applicationMainMenu));

			dojo.connect(loadModuleContributorsService, "error", this, dojo
					.hitch(this, this.handleLoadModuleContributorsError));

			var deferred = dojo.xhrPost(loadModuleContributorsService);

		},

		handleLoadModuleContributorsSuccess : function(applicationMainMenu,
				data) {

			applicationMainMenu.addChild(new MenuItem({
				label : data.moduleContributors[0].label,
				onClick : this.handleOpenApplication,
				accelKey : "Ctrl+A"
			}));

		},

		handleLoadModuleContributorsError : function() {
			// TODO: handle error
			console.log(error);
		},
		
		handleOpenApplication: function() {
			
			alert('Open Application');
		}

	});

});