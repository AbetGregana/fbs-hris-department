<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$company = new Company($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$company->company_is_active = 1;
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
$company->company_created = date("Y-m-d H:i:s");
$company->company_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($company, $company->company_name);

$query = checkCreate($company);

returnSuccess($company, "company", $query);
