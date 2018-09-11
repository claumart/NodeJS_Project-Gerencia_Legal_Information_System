app.service('urlUtility', function() {
    this.getServerUrl = ()=> {
        var serverUrl = "http://localhost:3000";
        return serverUrl;
    };
});