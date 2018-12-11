app.service('urlUtility', function() {
    this.getServerUrl = ()=> {
        var serverUrl = "http://localhost:3001";
        return serverUrl;
    };
});