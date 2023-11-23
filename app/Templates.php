<?php

class Templates
{
    const NAVBAR = 'Navbar';
    const BREADCRUMB = 'Breadcrumb';
    const SCRIPTS = 'Scripts';    
    const FOOTER = 'Footer';
    

    private $dirRoot = null;

    public function get($element = null)
    {
        require_once ($_SERVER['DOCUMENT_ROOT'] . '/app/templates/' . $element . '.php');
    }
}
