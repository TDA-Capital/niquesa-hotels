<h3><?php echo $fields['title']->content ?></h3>
<span class="horizontal-divider dark"></span>
<h4 class="orange-colour">
    <?php echo t('From €'), $fields['field_promotion_price']->content ?>
</h4>

<div class="text-center">
    <a class="a-button black decorated" href="<?php echo url("node/{$fields['nid']->content}") ?>">
        <?php echo t('Read More') ?>
    </a>
</div>

<?php $url = url("node/{$fields['nid']->content}", array('absolute' => true)) ?>

<ul class="social-list">
    <li class="twitter">
        <a href="https://twitter.com/share?<?php echo http_build_query(array(
            'url' => $url,
        ), '', '&amp;') ?>"></a>
    </li>
    <li class="facebook">
        <a href="https://facebook.com/sharer/sharer.php?<?php echo http_build_query(array(
            'u' => $url,
        ), '', '&amp;') ?>"></a>
    </li>
</ul>
