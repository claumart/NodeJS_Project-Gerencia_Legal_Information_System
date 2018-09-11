<?php

	//Validar el archivo que sera la caratula del album (El archivo debe ser una imagen)
	/*if($_FILES['imageFile']['type'] != ""){
		if (($_FILES["imageFile"]["type"] =="image/pjpeg" OR $_FILES["imageFile"]["type"] =="image/gif" 
		OR $_FILES["imageFile"]["type"] =="image/png" OR $_FILES["imageFile"]["type"] =="image/jpg" OR $_FILES["imageFile"]["type"] =="image/jpeg")){
			$extension_imagen = split("\.", basename($_FILES["imageFile"]['name']));
			$nombre_imagen = "img-ar".session_id()."al".$album->get_idAlbum().".".$extension_imagen[count($extension_imagen) -1];
			if(move_uploaded_file($_FILES["imageFile"]["tmp_name"], $dirAlbum."/".$nombre_imagen)){
				$query_update_dirCaratula = "update album set dirCaratula = '".$dirAlbum."/".$nombre_imagen."' where idAlbum = ".$album->get_idAlbum();
				mysqli_query($conexion, $query_update_dirCaratula);
			}			
			
		}else{
			echo "El archivo de portada seleccionado no es una imagen";
		}

	}*/

	if(isset($_FILES['imageFiles'])){
		$imagen = json_encode($_FILES['imageFiles']);
		echo $imagen;
	}else {
		echo "Imagnes no encontradas";
	}

	/*if(isset($_FILES['audioFiles'])){
		for($i = 0; $i< count($_FILES['audioFiles']['name']); $i++) {
			if(($_FILES['audioFiles']['type'][$i] =="audio/mp3") or ($_FILES['audioFiles']['type'][$i] =="audio/mpeg")){

				$mydate=getdate(date("U"));
				$micro = split(" ", microtime());
				$mydate['seconds'] += $micro[0];
				$fecha_format = $mydate["year"]."-".$mydate["mon"]."-".$mydate["mday"]." ".$mydate["hours"].":".$mydate["minutes"].":".$mydate["seconds"];

				$extension_audio = split("\.", basename($_FILES["audioFiles"]['name'][$i]));

				//Se le remueve la extension al nombre de la cancion para que no se muestre al momento de desplegar el nombre
				$nombre_cancion = addslashes(substr(basename($_FILES['audioFiles']['name'][$i]), 0, count(basename($_FILES['audioFiles']['name'][$i])) - 5));
				//Se obtiene la duracion de la cancion en segundos
				$audio = new MP3File($_FILES['audioFiles']['tmp_name'][$i]);
				$duracion = $audio->getDurationEstimate();
				//Se establece el directorio donde se guardará la canción, en este caso el nombre de la canción si debe llevar la extensión
				$dir_cancion = $dirAlbum."/".md5("cn-ar".session_id()."al".$album->get_idAlbum().$fecha_format).".".$extension_audio[count($extension_audio) -1];
				//Se instancia un nuevo objeto cancion
				$cancion = new Cancion(0, $nombre_cancion,  $duracion, $dir_cancion);
				//Se guarda la canción en su respectivo directorio
				move_uploaded_file($_FILES["audioFiles"]["tmp_name"][$i], $cancion->get_dirCancion());
				//Se guarda la cancion en la base de datos
				$query_insert_cancion = "insert into cancion(idCancion, nombreCancion, idAlbum, duracionSegundos, dirCancion) values(". $cancion->get_idCancion().
				", '". $cancion->get_nombreCancion(). "',". $album->get_idAlbum(). ",".$cancion->get_duracion().",'". addslashes($cancion->get_dirCancion())."')";
				$result_insert_cancion = mysqli_query($conexion, $query_insert_cancion);

			}else{
				echo "Fallo al guardar el archivo ".basename($_FILES["audioFiles"]['name'][$i]). ". El formato es incorrecto";
		}

		}
	}*/

?>