const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function() {
        console.log(this.name + " helper started ...");
    },

    socketNotificationReceived: function(notification, payload) {
        console.log(this.name + " received a notification: " + notification);
        
        if (notification === "CONFIG") {
            const config = payload.config;
            const self = this;
            self.sendSocketNotification("MMM_HVIEW_SNAPSHOT_IFRAME_UPDATE");
        }
    },
});
