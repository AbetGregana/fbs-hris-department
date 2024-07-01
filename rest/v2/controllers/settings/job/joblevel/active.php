<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../models/settings/joblevel/Joblevel.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$joblevel = new Joblevel($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("joblevelid", $_GET)) {
    // check data
    checkPayload($data);
    $joblevel->jobLevel_aid = $_GET['joblevelid'];
    $joblevel->jobLevel_is_active = trim($data["isActive"]);
    $joblevel->jobLevel_datetime = date("Y-m-d H:i:s");
    checkId($joblevel->jobLevel_aid);
    $query = checkActive($joblevel);
    http_response_code(200);
    returnSuccess($joblevel, "joblevel", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
