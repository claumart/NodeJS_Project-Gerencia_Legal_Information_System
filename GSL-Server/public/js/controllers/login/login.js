/***********************Hecho por Shirley Claudette Martínez***********************/
app.controller("loginCtrl", function($scope, $http, $window) {
    $scope.mostrarIdInvalido = false;
    $scope.mostrarPassInvalido = false;
    $scope.user_id_input = "";
    $scope.user_password = "";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $scope.validarAcceso = ()=> {
        $scope.mostrarIdInvalido = false;
        $scope.mostrarPassInvalido = false;
        if($scope.user_id_input.trim().length > 0){
            if($scope.user_password.trim().length > 0){
                $http({
                    method : "POST",
                    url :"/usuario/verificarUserId",
                    headers: {'Content-Type': 'application/json'},
                    data : {userId : $scope.user_id_input}
                }).then(function mySuccess(response) {
                    if(response.data){
                        $http({
                            method : "POST",
                            url :"/usuario/verificarPassword",
                            headers: {'Content-Type': 'application/json'},
                            data : {userId : $scope.user_id_input, password : $scope.user_password}
                        }).then(function mySuccess(response) {
                            if(response.data){
                                $http({
                                    method : "POST",
                                    url :"/usuario/iniciarSesion",
                                    headers: {'Content-Type': 'application/json'},
                                    data : {userId : $scope.user_id_input, password : $scope.user_password}
                                }).then(function mySuccess(response) {
                                    $window.location.href = response.data;
                                }, function myError(response) {
                                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                    document.getElementById('myModal').style.display = "flex";console.log(response.statusText);
                                });
                            }else{
                                $scope.mostrarPassInvalido = true;
                            }
                        }, function myError(response) {
                            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                            document.getElementById('myModal').style.display = "flex";console.log(response.statusText);
                        });
                    }else{
                        $scope.mostrarIdInvalido = true;
                    }
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }
        }
    };


});