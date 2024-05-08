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
  checkId($company->company_aid);

//checks current data to avoid same entries from being updated
$company_name_old = checkIndex($data, 'company_name_old');
compareName($company, $company_name_old, $company->company_name);
checkId($company->company_aid);

  // update
  $query = checkUpdate($company);
  returnSuccess($company, "company", $query);
}

// return 404 error if endpoint not available
checkEndpoint();