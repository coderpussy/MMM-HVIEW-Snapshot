/* global Module */

Module.register("MMM-HVIEW-Snapshot",{
	defaults: {
        id: "camera01",
        url: "",
		updateInterval: 60000,
        wrapperWidth: "640px",
        wrapperHeight: "360px",
        iframeWidth: "1920px",
        iframeHeight: "1080px",
        grayscale: 1,
        scale: "0.33"
	},

	start: function() {
		setInterval(() => {
            this.updateDom();
		}, this.config.updateInterval);
	},

	getStyles: function() {
		return ['MMM-HVIEW-Snapshot.css'];
	},
    
    getTemplate: function () {
        return 'MMM-HVIEW-Snapshot.njk';
	},
	
    getTemplateData: function () {
        return templateData = { config: this.config };
	}
});
