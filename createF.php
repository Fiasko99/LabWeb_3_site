<?php
    
$login = file_get_contents('php://input');
$path = getcwd();
$fullPath = "{$path}/users/{$login}";

if (!file_exists($fullPath)) {
    mkdir($fullPath);
    echo 1;
} else {
    echo 0;
}

