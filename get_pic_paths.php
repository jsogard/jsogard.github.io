
<?php
$collageRoot = $_GET["root"];

$pic_paths = [];
$collage = scandir($collageRoot);
array_splice($collage, 0, 2);
foreach($collage as $i => $dirName){
	$pic_paths[$dirName] = scandir($collageRoot . '/' . $dirName);
	array_splice($pic_paths[$dirName], 0, 2);
}
echo json_encode($pic_paths, JSON_PRETTY_PRINT);
?>