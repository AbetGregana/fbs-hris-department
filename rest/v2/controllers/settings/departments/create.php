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
$departments->departments_is_active = 1;
$departments->departments_name = checkIndex($data, "departments_name");
$departments->departments_supervisor = checkIndex($data, "departments_supervisor");
$departments->departments_supervisor_email = checkIndex($data, "departments_supervisor_email");
$departments->departments_created = date("Y-m-d H:i:s");
$departments->departments_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($departments, $departments->departments_name);

$query = checkCreate($departments);

returnSuccess($departments, "departments", $query);
