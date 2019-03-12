Ext.define('App.views.LandingView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.landing',
	controller: '',
	requires: [],

	region: 'center',

	initComponent: function () {
		var self = this;

		Ext.apply(self, {
			bodyPadding: '150 0 0 0',
		});

		self.callParent();
	}
});