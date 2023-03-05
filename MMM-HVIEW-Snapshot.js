/* global Module */

Module.register("MMM-HVIEW-Snapshot",{
	defaults: {
		animationSpeed: 500,
		updateInterval: 60000,
        wrapperWidth: "640px",
        wrapperHeight: "360px",
        iframeWidth: "1920px",
        iframeHeight: "1080px",
        grayscale: 1,
        scale: "0.33"
	},

	start: function() {
		let self = this;
        
		setInterval(() => {
            // Start helper and data polling
			self.sendSocketNotification("CONFIG", self.config);
		}, self.config.updateInterval);
	},
    
	getDom: function() {
        let self = this;
        
        var wrapper = document.createElement("div");
        wrapper.className = "wrap";
        wrapper.style.width = self.config.wrapperWidth;
        wrapper.style.height = self.config.wrapperHeight;
        
        var makeIframe = document.createElement("iframe");
        makeIframe.id = self.config.id; 
        makeIframe.className = "frame";
        makeIframe.setAttribute("scrolling", "no");
        makeIframe.src = self.config.url;
        makeIframe.style.width = self.config.iframeWidth;
        makeIframe.style.height = self.config.iframeHeight;
        makeIframe.style.transform = "scale(" + self.config.scale + ")";
        makeIframe.style.filter = "grayscale(" + self.config.grayscale + ")";
        
        var hidecursordiv = document.createElement("div");
        hidecursordiv.className = "hide-cursor";
        
        wrapper.appendChild(makeIframe);
        wrapper.appendChild(hidecursordiv);
        
		return wrapper;
	},

	getScripts: function() {
		return ["MMM-HVIEW-Snapshot.css"];
	},
    
    // Handle socket answer
    socketNotificationReceived: function(notification, payload) {
        Log.info(this.name + " received a notification: " + notification);
        // Care only own socket answers
        if (notification === "MMM_HVIEW_SNAPSHOT_IFRAME_UPDATE") {
            this.updateDom(self.config.animationSpeed);
        }
    }
});
