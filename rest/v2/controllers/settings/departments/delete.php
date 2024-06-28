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
  // get data
  $departments->department_aid = $_GET['departmentsid'];
  checkId($departments->department_aid);
  

  $query = checkDelete($departments);

  returnSuccess($departments, "departments", $query);
}

// return 404 error if endpoint not available
checkEndpoint();