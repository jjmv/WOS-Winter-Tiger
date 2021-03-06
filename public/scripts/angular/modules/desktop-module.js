var desktopapp = angular.module('desktopapp', []);
desktopapp.controller('deskController', ['$scope', '$http', function($scope,$http){
  $scope.abrirChrome = function()
  {
    window.open('http://www.google.com','','width=1000,height=600');
  }

  $scope.abrirTraductor = function()
  {
    window.open('http://translate.google.com/?hl=es','','width=1000,height=600');
  }

  $scope.abrirGmail = function()
  {
    window.open('https://mail.google.com','','width=1000,height=600');
  }

  $scope.abrirFacebook = function()
  {
    window.open('https://facebook.com','','width=1000,height=600');
  }

  $scope.abrirTwitter = function()
  {
    window.open('https://twitter.com','','width=1000,height=600');
  }

  $scope.abrirInstagram = function()
  {
    window.open('https://www.instagram.com','','width=1000,height=600');
  }

  $scope.abrirSpotify = function()
  {
    window.open('https://play.spotify.com','','width=1000,height=600');
  }


  $scope.abrirOutlook = function()
  {
    window.open('https://www.outlook.com','','width=1000,height=600');
  }

  $scope.cambiarUsuario = function()
  {
    console.log("Entre");
    window.location = "/"
  }
}]);

desktopapp.controller('modalController',['$scope','$http',function($scope,$http){



  $scope.autorun = function(){

    setInterval(function(){

    $http.post('/getMyFolders',{})
    .success(function(data){

      $scope.folders = data;
      //console.log(data);
    })
    .error(function(err){
      return err;
    })
    $http.post('/getMyTrashFolders',{})
    .success(function(data){

      $scope.Trashfolders = data;
      //console.log(data);
    })
    .error(function(err){
      return err;
    })
    $http.post('/getTrashFilesByFolder',{id:-1})
    .success(function(data){
      $scope.allTrashfiles = data;
    })
    .error(function() {
      console.log(1);
    });

  },1000);
  }
  $scope.autorun();

  $scope.restaurarTrashFolder = function(id)
  {
    $http.post('/restoreFolder',{id:id})
    .success(function(data){
      if(data == 0)
      {
        Materialize.toast('Carpeta restaurada.', 4250)
      }else{
        Materialize.toast('No tiene permisos para restaurar.', 4250)
      }
    })
  }

  $scope.restaurarTrashFile = function(id)
  {
    $http.post('/restoreFile',{id:id})
    .success(function(data){
      if(data == 0)
      {
        Materialize.toast('Carpeta restaurada.', 4250)
      }else{
        Materialize.toast('No tiene permisos para restaurar.', 4250)
      }
    })
  }

  $scope.getFilesByFolder = function(id)
  {
    $(".form_archivo").show();
    $scope.file = {id:id}
    $http.post('/getFilesByFolder',$scope.file)
    .success(function(data){
      $scope.files = data;
      //console.log(data);
    })
    .error(function() {
      console.log(1);
    });
  }



    $scope.getTrashFilesByFolder = function(id)
    {
      $(".form_archivo").show();
      $scope.file = {id:id}
      $http.post('/getTrashFilesByFolder',$scope.file)
      .success(function(data){
        $scope.Trashfiles = data;
        //console.log(data);
      })
      .error(function() {
        console.log(1);
      });
    }

  $scope.nuevaCarpeta = {nombre:''}
  $scope.crearCarpeta = function()
  {
    $http.post('/createNewFolder',$scope.nuevaCarpeta)
    .success(function(data){

      if(data == 0)
      {
        Materialize.toast('Carpeta creada.', 4250)
      }else{
        Materialize.toast('La carpeta ya existe.', 4250)
      }

      $scope.nuevaCarpeta = {nombre:''};
    })
    .error(function(e){
      return err;
    })
  }

  $scope.nuevoArchivo = {nombre:''}
  $scope.crearArchivo= function()
  {
    $http.post('/createNewFile',$scope.nuevoArchivo)
    .success(function(data){
      if(data == 1)
      {
        Materialize.toast('El archivo ya existe', 4250)
      }
      else {
        Materialize.toast('Creación existosa.', 4250)
        $scope.getFilesByFolder(0);
      }
      $scope.nuevoArchivo = {nombre:''}
    })
  }

  $scope.folderA_Eliminar = {id:''}
  $scope.eliminarFolder = function(id)
  {
    $scope.folderA_Eliminar.id = id;
    $http.post('/deleteFolder',$scope.folderA_Eliminar)
    .success(function(data){
      if(data == 0)
      {
        Materialize.toast('Se traslado a la papelera', 4250)
      }else {
        Materialize.toast('Permisos insuficientes', 4250)
      }

      $scope.getFilesByFolder(0);

    })
    .error(function(err){
      console.log(Err);
    })
  }

  $scope.TrashfolderA_Eliminar = {id:''}
  $scope.eliminarTrashFolder = function(id)
  {
    $scope.TrashfolderA_Eliminar.id = id;
    $http.post('/deleteTrashFolder',$scope.TrashfolderA_Eliminar)
    .success(function(data){
      if(data == 0)
      {
        Materialize.toast('Se eleminó permanentemente.', 4250)
      }else {
        Materialize.toast('No tiene permisos.', 4250)
      }

      $scope.getTrashFilesByFolder(0);

    })
    .error(function(err){
      console.log(Err);
    })
  }

  $scope.fileA_Eliminar = {id : ''}
  $scope.eliminarFile = function(id)
  {
    $scope.fileA_Eliminar.id = id;
    $http.post('/deleteFile',$scope.fileA_Eliminar)
    .success(function(data){
      if(data == 0)
      {
        Materialize.toast('Se traslado a la papelera', 4250)
      }else {
        Materialize.toast('Permisos insuficientes', 4250)
      }


      $scope.getFilesByFolder(0);
    })
    .error(function() {
      console.log("Error");
    });
  }
  $scope.TrashfileA_Eliminar = {id : ''}
  $scope.eliminarTrashFile = function(id)
  {
    $scope.TrashfileA_Eliminar.id = id;
    $http.post('/deleteTrashFile',$scope.TrashfileA_Eliminar)
    .success(function(data){

      if(data == 0)
      {
        Materialize.toast('Se eliminó permanentemente.', 4250)
      }else {
        Materialize.toast('Permisos insuficientes.', 4250)
      }


      $scope.getTrashFilesByFolder(0);
    })
    .error(function() {
      console.log("Error");
    });
  }


  $scope.cambiarPrivilegio = function(id)
  {
    $http.post('cambiarDerechos',{id:id})
    .success(function(data){
      console.log(data);
      if(data == 1){
        Materialize.toast('No tiene los privilegios.', 4250)
        if(id == 2)
        {
          var valor1 = document.getElementById("permiso_1").checked
          document.getElementById("permiso_1").checked = !valor1;
        }
        if(id == 3)
        {
          var valor2 = document.getElementById("permiso_2").checked
          document.getElementById("permiso_2").checked = !valor2;
        }
      }
      else {
        Materialize.toast('Privilegios actualizados.', 4250)
      }
    })
  }

  $scope.verificarDerechos = function()
  {
    $http.post('verificarDerechos',{})
    .success(function(data){

      if(data[1].level == 0)
      {
        console.log(data[0].level);
        document.getElementById("permiso_1").checked = true;
      }
      if(data[2].level == 0)
      {
        console.log(data[2].level);
        document.getElementById("permiso_2").checked = true;
      }
    })


  }

  $scope.verificarDerechos();

}]);
