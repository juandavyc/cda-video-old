<?php
class Jumbotron
{
    private $icon;
    private $title;
    private $description;

    public function __construct($data)
    {
        $this->icon = $data['icon'];
        $this->title = $data['title'];
        $this->description = $data['description'];
    }

    public function render()
    {
        ob_start();
?>
        <div class="jumbotron">
            <div class="container text-center">
                <span class="<?= $this->icon ?> fa-2xl text-success mb-2"></span>
                <h1><?= htmlspecialchars($this->title) ?></h1>
                <p><?= htmlspecialchars($this->description) ?></p>
            </div>
        </div>
<?php
        return ob_get_clean();
    }
}
