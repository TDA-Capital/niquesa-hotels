<div class="container">
    <div class="page-heading">
        <h1 class="text-center"><?php echo t('Promotions') ?></h1>
        <hr class="horizontal-divider dark">

        <div class="row">
            <div class="col-xs-12 col-md-offset-3 col-md-6 emphasized">
                <p>
                    <?php echo t('To take a luxurious experience further, enjoy stays at our landmark hotels at special rates and with added little extras throughout the seasons.') ?>
                </p>
            </div>
        </div>
    </div>

    <div class="row promotions-list">
        <?php foreach ($rows as $row): ?>
            <div class="col-md-6">
                <div class="promotions-teaser">
                    <div class="orange-box">
                        <?php echo $row ?>
                    </div>
                </div>
            </div>
        <?php endforeach ?>
    </div>
</div>
