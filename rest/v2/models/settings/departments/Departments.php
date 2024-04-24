<?php

class Departments
{
    public $departments_aid;
    public $departments_is_active;
    public $departments_name;
    public $departments_supervisor;
    public $departments_supervisor_email;
    public $departments_datetime;
    public $departments_created;

    public $connection;
    public $lastInsertedId;
    public $departments_start;
    public $departments_total;
    public $departments_search;

    public $tblDepartments;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDepartments = "lcss_departments";
        
    }

    public function readAll()
      {
        try {
          $sql = "select * from {$this->tblDepartments} ";
          $sql .= "order by departments_is_active desc, ";
          $sql .= "departments_aid asc ";
          $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
          $query = false;
        }
        return $query;
      }

  //     public function readLimit()
  //     {
  //       try {
  //         $sql = "select * from {$this->tblClient} ";
  //         $sql .= "order by client_is_active desc, ";
  //         $sql .= "client_aid asc ";
  //         $sql .= "limit :start, ";
  //         $sql .= ":total ";
  //         $query = $this->connection->prepare($sql);
  //         $query->execute([
  //             "start" => $this->client_start - 1,
  //             "total" => $this->client_total,
  //         ]);
  //     } catch (PDOException $ex) {
  //         $query = false;
  //     }
  //     return $query;
  // }
      public function readById()
      {
          try {
              $sql = "select * from {$this->tblDepartments} ";
              $sql .= "where departments_aid = :departments_aid ";
              $query = $this->connection->prepare($sql);
              $query->execute([
                  "departments_aid" => $this->departments_aid,
              ]);
          } catch (PDOException $ex) {
              $query = false;
          }
          return $query;
      }

      public function create()
  {
    try {
      $sql = "insert into {$this->tblDepartments} ";
      $sql .= "(departments_is_active, ";
      $sql .= "departments_name, ";
      $sql .= "departments_supervisor, ";
      $sql .= "departments_supervisor_email, ";
      $sql .= "departments_created, ";
      $sql .= "departments_datetime ) values ( ";
      $sql .= "(departments_is_active, ";
      $sql .= "departments_name, ";
      $sql .= "departments_supervisor, ";
      $sql .= "departments_supervisor_email, ";
      $sql .= "departments_created, ";
      $sql .= ":departments_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "departments_is_active" => $this->departments_is_active,
        "departments_name" => $this->departments_name,
        "departments_supervisor" => $this->departments_supervisor,
        "departments_supervisor_email" => $this->departments_supervisor_email,
        "departments_datetime" => $this->departments_datetime,
        "departments_created" => $this->departments_created,

      ]);
      $this->lastInsertedId = $this->connection->lastInsertId();
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function checkName()
  {
    try {
      $sql = "select children_name from {$this->tblChildren} ";
      $sql .= "where children_name = :children_name ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "children_name" => "{$this->children_name}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function update()
  {
    try {
      $sql = "update {$this->tblDepartments} set ";
      $sql .= "departments_name = :departments_name, ";
      $sql .= "departments_supervisor = :departments_supervisor, ";
      $sql .= "departments_supervisor_email = :departments_supervisor_email, ";
      $sql .= "departments_datetime = :departments_datetime ";
      $sql .= "where departments_aid  = :departments_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "departments_name" => $this->departments_name,
        "departments_supervisor" => $this->departments_supervisor,
        "departments_supervisor_email" => $this->departments_supervisor_email,
        "departments_datetime" => $this->departments_datetime,
        "departments_aid" => $this->departments_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function delete()
  {
    try {
      $sql = "delete from {$this->tblDepartments} ";
      $sql .= "where departments_aid = :departments_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "departments_aid" => $this->departments_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function active()
    {
    try {
    $sql = "update {$this->tblDepartments} set ";
    $sql .= "departments_is_active = :departments_is_active, ";
    $sql .= "departments_datetime = :departments_datetime ";
    $sql .= "where departments_aid  = :departments_aid ";
    $query = $this->connection->prepare($sql);
    $query->execute([
    "departments_is_active" => $this->departments_is_active,
    "departments_datetime" => $this->departments_datetime,
    "departments_aid" => $this->departments_aid,
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
  //           $sql .= "from {$this->tblClient} ";
  //           $sql .= "where client_name like :client_name ";
  //           $sql .= "order by client_is_active desc, ";
  //           $sql .= "client_aid asc ";
  //           $query = $this->connection->prepare($sql);
  //           $query->execute([
  //               "client_name" => "%{$this->client_search}%",
  //           ]);
  //       } catch (PDOException $ex) {
  //           $query = false;
  //       }
  //       return $query;
  //   }

}