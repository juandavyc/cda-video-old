<?php

class App
{
    public $data = array();

    const TEMPLATES = 'Templates';

    const COMPONENTS = 'Components';
    const DATABASE = 'Database';

    public function __construct()
    {
        $this->data = array(
            'root' => $_SERVER['DOCUMENT_ROOT'] . '/app/',
            'src' => $_SERVER['DOCUMENT_ROOT'] . '/src/',
            'name' => "CDA Camera",
            'version' => "v1.0",
            'app' => array(
                'modulo' => 2,
                'session' => 0
            )
        );
    }

    public function requireApp($class = null)
    {
        require_once($this->data['root'] . $class . '.php');
        return new $class();
    }


    // public function getMenu()
    // {
    //     require($this->AppData['root'] . '/components/menu.php');
    // }
}
