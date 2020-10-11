<?php

// File name
$filename = $_FILES['file']['name'];

// Upload file
if(move_uploaded_file($_FILES['file']['tmp_name'], "uploads/".$filename)){
	echo 1;
}else{
	echo 0;
}

exit;