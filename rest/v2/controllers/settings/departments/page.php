<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../models/settings/departments/Departments.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $department->department_start = $_GET['start'];
        $department->department_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($department->department_start, $department->department_total);

        $query = checkReadLimit($department);
        $total_result = checkReadAll($department);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $department->department_total,
            $department->department_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();