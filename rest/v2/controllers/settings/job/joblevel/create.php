<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$joblevel = new Joblevel($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$joblevel->jobLevel_is_active = 1;
$joblevel->jobLevel_level = checkIndex($data, "jobLevel_level");
$joblevel->jobLevel_created = date("Y-m-d H:i:s");
$joblevel->jobLevel_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($joblevel, $joblevel->jobLevel_level);

$query = checkCreate($joblevel);

returnSuccess($joblevel, "joblevel", $query);
