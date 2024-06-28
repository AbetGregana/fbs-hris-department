<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$departments = new Departments($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$departments->department_is_active = 1;
$departments->department_name = checkIndex($data, "department_name");
$departments->department_created = date("Y-m-d H:i:s");
$departments->department_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($departments, $departments->department_name);

$query = checkCreate($departments);

returnSuccess($departments, "departments", $query);
