<ul>
    <?php foreach ($rows as $i => $row): ?>
        <li>
            <?php echo $row ?>
            <?php if ($i < count($rows) - 1): ?>
                <span>/</span>
            <?php endif ?>
        </li>
    <?php endforeach ?>
</ul>
