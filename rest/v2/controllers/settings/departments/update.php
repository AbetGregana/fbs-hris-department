<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$departments = new Departments($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("departmentsid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $departments->department_aid = $_GET['departmentsid'];
  $departments->department_name = checkIndex($data, "department_name");
 
  $departments->department_datetime = date("Y-m-d H:i:s");
  checkId($departments->department_aid);
 

//checks current data to avoid same entries from being updated
$department_name_old = checkIndex($data, 'department_name_old');
compareName($departments, $department_name_old, $departments->department_name);

  // update
   $query = checkUpdate($departments);
   returnSuccess($departments, "departments", $query);

 
}

// return 404 error if endpoint not available
 checkEndpoint();