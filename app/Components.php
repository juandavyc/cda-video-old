<?php

class Components
{
    const JUMBOTRON = 'Jumbotron';

    private $dirRoot = null;

    public function get($element = null, $data = array())
    {
        require_once ($_SERVER['DOCUMENT_ROOT'] . '/app/components/' . $element . '.php');
        $lowercaseVarName = strtolower($element);
        $$lowercaseVarName = new $element($data);
        echo $$lowercaseVarName->render();
    }
}
