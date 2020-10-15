<?php
$login = '';
foreach (getallheaders() as $name => $value) {
    if($name == "login") {
		$login = $value;
	}
}
$namefile = file_get_contents('php://input');
array_map ('unlink', glob ("users/{$login}/{$namefile}"));
?>