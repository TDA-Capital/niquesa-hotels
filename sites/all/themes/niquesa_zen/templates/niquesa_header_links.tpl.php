<div class="header-links">
    <?php if (isset($nid)): ?>
        <a href="<?php echo url("node/{$nid}"), '/contact-us' ?>"><?php echo t('Contact us') ?></a>
        <a href="<?php echo url("node/{$nid}"), '/gallery/hotel-gallery' ?>"><?php echo t('Gallery') ?></a>
    <?php endif ?>
</div>
