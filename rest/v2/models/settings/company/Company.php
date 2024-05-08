<?php

class Company
{
    public $company_aid;
    public $company_is_active;
    public $company_name;
    public $company_email;
    public $company_phone;
    public $company_street;
    public $company_city;
    public $company_province;
    public $company_postal;
    public $company_country;
    public $navigation_bgc;
    public $submenu_color;
    public $accent_color;
    public $company_logo;
    // public $company_datetime;
    // public $company_created;

    public $connection;
    public $lastInsertedId;
    public $company_start;
    public $company_total;
    public $company_search;

    public $tblCompany;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCompany = "lcss_companyinfo";
        
    }

    public function readAll()
      {
        try {
          $sql = "select * from {$this->tblCompany} ";
          $sql .= "order by company_is_active desc, ";
          $sql .= "company_aid asc ";
          $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
          $query = false;
        }
        return $query;
      }

      public function readLimit()
      {
        try {
          $sql = "select * from {$this->tblCompany} ";
          $sql .= "order by company_is_active desc, ";
          $sql .= "company_aid asc ";
          $sql .= "limit :start, ";
          $sql .= ":total ";
          $query = $this->connection->prepare($sql);
          $query->execute([
              "start" => $this->company_start - 1,
              "total" => $this->company_total,
          ]);
      } catch (PDOException $ex) {
          $query = false;
      }
      return $query;
  }
       public function readById()
       {
           try {
               $sql = "select * from {$this->tblCompany} ";
               $sql .= "where company_aid = :company_aid ";
               $query = $this->connection->prepare($sql);
               $query->execute([
                   "company_aid" => $this->company_aid,
               ]);
           } catch (PDOException $ex) {
               $query = false;
           }
           return $query;
       }
  //     public function create()
  // {
  //   try {
  //     $sql = "insert into {$this->tblCompany} ";
  //     $sql .= "(company_is_active, ";
  //     $sql .= "company_name, ";
  //     $sql .= "company_created, ";
  //     $sql .= "company_datetime ) values ( ";
  //     $sql .= ":company_is_active, ";
  //     $sql .= ":company_name, ";
  //     $sql .= ":company_created, ";
  //     $sql .= ":company_datetime ) ";
  //     $query = $this->connection->prepare($sql);
  //     $query->execute([
  //       "company_is_active" => $this->company_is_active,
  //       "company_name" => $this->company_name,
  //       "company_datetime" => $this->company_datetime,
  //       "company_created" => $this->company_created,

  //     ]);
  //     $this->lastInsertedId = $this->connection->lastInsertId();
  //   } catch (PDOException $ex) {
  //     $query = false;
  //   }
  //   return $query;
  // }
  // public function checkName()
  // {
  //   try {
  //     $sql = "select company_name from {$this->tblCompany} ";
  //     $sql .= "where company_name = :company_name ";
  //     $query = $this->connection->prepare($sql);
  //     $query->execute([
  //       "company_name" => "{$this->company_name}",
  //     ]);
  //   } catch (PDOException $ex) {
  //     $query = false;
  //   }
  //   return $query;
  // }
   public function update()
   {
     try {
       $sql = "update {$this->tblCompany} set ";
       $sql .= "company_name = :company_name, ";
       $sql .= "company_datetime = :company_datetime ";
       $sql .= "where company_aid  = :company_aid ";
       $query = $this->connection->prepare($sql);
       $query->execute([
         "company_name" => $this->company_name,
         "company_aid" => $this->company_aid
       ]);
     } catch (PDOException $ex) {
       $query = false;
     }
     return $query;
   }
  // public function delete()
  // {
  //   try {
  //     $sql = "delete from {$this->tblCompany} ";
  //     $sql .= "where company_aid = :company_aid ";
  //     $query = $this->connection->prepare($sql);
  //     $query->execute([
  //       "company_aid" => $this->company_aid,
  //     ]);
  //   } catch (PDOException $ex) {
  //     $query = false;
  //   }
  //   return $query;
  // }
   public function active()
     {
     try {
     $sql = "update {$this->tblCompany} set ";
     $sql .= "company_is_active = :company_is_active, ";
     $sql .= "company_datetime = :company_datetime ";
     $sql .= "where company_aid  = :company_aid ";
     $query = $this->connection->prepare($sql);
     $query->execute([
     "company_is_active" => $this->company_is_active,
     "company_aid" => $this->company_aid,
     ]);
     } catch (PDOException $ex) {
     $query = false;
     }
     return $query;
   }
  // public function search()
  //   {
  //       try {
  //           $sql = "select * ";
  //           $sql .= "from {$this->tblCompany} ";
  //           $sql .= "where company_name like :company_name ";
  //           $sql .= "order by company_is_active desc, ";
  //           $sql .= "company_aid asc ";
  //           $query = $this->connection->prepare($sql);
  //           $query->execute([
  //               "company_name" => "%{$this->company_search}%",
  //           ]);
  //       } catch (PDOException $ex) {
  //           $query = false;
  //       }
  //       return $query;
  //   }
}