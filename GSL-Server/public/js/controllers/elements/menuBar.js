/***********************Hecho por Shirley Claudette Martínez***********************/
app.controller("menuBarCtrl", function($scope, $http) {
    $scope.privilegios = [];

    $http({
        method : "POST",
        url : "/usuario/obtenerPrivilegios",
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
        $scope.privilegios = JSON.parse(response.data);
        if($scope.privilegios.length==0){
            $window.location.href = "/";
        }
    }, function myError(response) {
        console.log(response.statusText);
    });
    
});
