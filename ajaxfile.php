<?php
$login = '';
foreach (getallheaders() as $name => $value) {
    if($name == "login") {
		$login = $value;
	}
}

// File name
$filename = $_FILES['file']['name'];

// Upload file
if(move_uploaded_file($_FILES['file']['tmp_name'], "users/{$login}/{$filename}")){
	echo file_get_contents("http://localhost:3000/users?login={$login}&role=3");
}else{
	echo 0;
}

exit;