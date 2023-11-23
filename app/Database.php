<?php

class Database
{  
    private $response = array();
    private $connection = null;
    private $statement = null;
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "videosv3";
    private $fixTime = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET time_zone = '-05:00'");
    public function __construct($dir = null)
    {
        try {
            $this->connection = new PDO(
                "mysql:host=$this->servername;dbname=$this->database",
                $this->username,
                $this->password,
                $this->fixTime
            );
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

            $this->response = array('status' => true, 'message' => 'Conexion establecida', 'statusText' => 'bien');
        } catch (Exception $e) {
            $this->response = array('status' => false, 'message' => 'Error al al conectar : ' . $e->getMessage(), 'statusText' => 'exception');
        }
        return $this->connection;
    }
    public function getEstado()
    {
        return $this->response;
    }

    public function getPDO()
    {
        if ($this->connection instanceof PDO) {
            return $this->connection;
        }
    }
    public function close()
    {
        $this->connection = null;
    }
}
