/***********************Hecho por Shirley Claudette Martínez***********************/
app.controller("passwordCtrl", function($scope, $http, $window) {
    $scope.actual_password_input = "";
    $scope.password_input = "";
    $scope.password_verification_input = "";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $scope.cambiarPassword = ()=> {
        if($scope.actual_password_input.trim().length > 0){
            $http({
                method : "POST",
                url : "/usuario/comprobar/password",
                headers: {'Content-Type': 'application/json'},
                data : {actualPassword : $scope.actual_password_input}
            }).then(function mySuccess(response) {
                if(response.data){
                    if($scope.password_input.length < 21 && $scope.password_input.trim().length > 6){
                        if($scope.password_input == $scope.password_verification_input){
                            $http({
                                method : "POST",
                                url : "/usuario/cambiar/password",
                                headers: {'Content-Type': 'application/json'},
                                data : {actualPassword : $scope.actual_password_input, newPassword : $scope.password_input,
                                    passwordVerification : $scope.password_verification_input}
                            }).then(function mySuccess(response) {
                                if(response.data){
                                    $window.location.href = "/";
                                }else{
                                    $scope.modalMessage = "No se pudo realizar la acción porque la información fue corrompida";
                                    document.getElementById('myModal').style.display = "flex";
                                }
                            }, function myError(response) {
                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                document.getElementById('myModal').style.display = "flex";
                            });
                        }else{
                            $scope.modalMessage = "Las contraseñas no coinciden";
                            document.getElementById('myModal').style.display = "flex";
                        }
                    }else{
                        $scope.modalMessage = "Por favor escriba una contraseña de 6 a 20 caracteres";
                        document.getElementById('myModal').style.display = "flex";
                    }
                }else{

                }
            }, function myError(response) {
                $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                document.getElementById('myModal').style.display = "flex";
            });
        }else{
            $scope.modalMessage = "Por favor escriba su contraseña actual";
            document.getElementById('myModal').style.display = "flex";
        }
    };


});