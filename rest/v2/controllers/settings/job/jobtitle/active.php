<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/job/jobtitle/Jobtitle.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$jobtitle = new Jobtitle($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("jobtitleid", $_GET)) {
    // check data
    checkPayload($data);
    $jobtitle->jobTitle_aid = $_GET['jobtitleid'];
    $jobtitle->jobTitle_is_active = trim($data["isActive"]);
    $jobtitle->jobTitle_datetime = date("Y-m-d H:i:s");
    checkId($jobtitle->jobTitle_aid);
    $query = checkActive($jobtitle);
    http_response_code(200);
    returnSuccess($jobtitle, "jobtitle", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
