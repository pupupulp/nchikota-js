Ext.define('App.views.LandingView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.landing',
	requires: [
		'App.controllers.LandingController'
	],
	controller: 'LandingController',

	region: 'center',

	initComponent: function () {
		var self = this,
			BACKGROUND_IMAGE = '/assets/landing.jpg';

		Ext.apply(self, {
			bodyPadding: '150 0 0 0',
			bodyStyle: {
				backgroundImage: 'url('+BACKGROUND_IMAGE+')',
				backgroundSize: 'cover'
			},
		});

		self.callParent();
	}
});