<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$company = new Company($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("companyid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $company->company_aid = $_GET['companyid'];
  $company->company_name = checkIndex($data, "company_name");
  $company->company_email = checkIndex($data, "company_email");
  $company->company_phone = checkIndex($data, "company_phone");
  $company->company_street = checkIndex($data, "company_street");
  $company->company_city = checkIndex($data, "company_city");
  $company->company_province = checkIndex($data, "company_province");
  $company->company_postal = checkIndex($data, "company_postal");
  $company->company_country = checkIndex($data, "company_country");
  $company->company_background = checkIndex($data, "company_background");
  $company->company_submenu = checkIndex($data, "company_submenu");
  $company->company_accent = checkIndex($data, "company_accent");
  $company->company_logo = checkIndex($data, "company_logo");
 
  $company->company_datetime = date("Y-m-d H:i:s");
  checkId($company->company_aid);

//checks current data to avoid same entries from being updated
$company_name_old = checkIndex($data, 'company_name_old');
compareName($company, $company_name_old, $company->company_name);


  // update
  $query = checkUpdate($company);
  returnSuccess($company, "company", $query);
}

// return 404 error if endpoint not available
checkEndpoint();