<?php

class Departments{
    public $department_aid;
    public $department_name;
    public $department_is_active;
    public $department_created;
    public $department_datetime;

    public $connection;
    public $lastInsertedId;
    
    public $tblDepartments;

    public function __construct($db){
        $this->connection = $db;
        $this->tblDepartments = "fbs_hris_departments";
    }

    public function readAll(){
        try{
            $sql = "select * from {$this->tblDepartments} ";
            $sql .= "order by department_is_active desc, ";
            $sql .= "department_aid asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblDepartments}";
            $sql .= "(department_is_active, ";
            $sql .= "department_name, ";
            $sql .= "department_created, ";
            $sql .= "department_datetime ) values ( ";
            $sql .= ":department_is_active, ";
            $sql .= ":department_name, ";
            $sql .= ":department_created, ";
            $sql .= ":department_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active"=> $this->department_is_active,
                "department_name"=> $this->department_name,
                "department_created"=> $this->department_created,
                "department_datetime"=> $this->department_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql = "update {$this->tblDepartments} set ";
            $sql .= "department_name = :department_name, ";
            $sql .= "department_datetime = :department_datetime ";
            $sql .= "where department_aid = :department_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
                "department_datetime" => $this->department_datetime,
                "department_aid" => $this->department_aid,
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete() {
        try{
            $sql = "delete from {$this->tblDepartments} ";
            $sql .= "where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->department_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active() {
        try{
            $sql = "update {$this->tblDepartments} set ";
            $sql .= "department_is_active = :department_is_active, ";
            $sql .= "department_datetime = :department_datetime ";
            $sql .= "where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_datetime" => $this->department_datetime,
                "department_aid" => $this->department_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select department_name from {$this->tblDepartments} ";
      $sql .= "where department_name = :department_name ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "department_name" => "{$this->department_name}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }




}