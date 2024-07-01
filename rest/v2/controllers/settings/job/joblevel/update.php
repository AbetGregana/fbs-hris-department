<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$joblevel = new Joblevel($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("joblevelid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $joblevel->jobLevel_aid = $_GET['joblevelid'];
  $joblevel->jobLevel_level = checkIndex($data, "jobLevel_level");
 
  $joblevel->jobLevel_datetime = date("Y-m-d H:i:s");
  checkId($joblevel->jobLevel_aid);
 

//checks current data to avoid same entries from being updated
$jobLevel_level_old = checkIndex($data, 'jobLevel_level_old');
compareName($joblevel, $jobLevel_level_old, $joblevel->jobLevel_level);

  // update
   $query = checkUpdate($joblevel);
   returnSuccess($joblevel, "joblevel", $query);

 
}

// return 404 error if endpoint not available
 checkEndpoint();