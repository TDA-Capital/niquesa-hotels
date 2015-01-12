<?php
	include 'node.header.inc';
	global $language;
	$hotel_nid = $node->field_hotel['und'][0]['target_id'];
?>
<div id="content_body" class="suites-and-rooms-page">
    <div class="hero-module suites-landing-hero">
        <div class="hero-module-head">
            <div class="center-content">
                <div class="center-content-td">
                    <div class="hero-module-header">
                        <?php echo render($content['field_links']) ?>

                        <div class="view-all text-center">
                            <a class="a-button black decorated orange-decorated arrow-down scroll-to"><?php echo t('View promotions') ?></a>
                        </div>

                        <?php $hero_image_uri = $node->field_hero_image['und'][0]['uri'] ?>
                        <img class="background-img lazy-img hide" data-imgsrc="<?php echo file_create_url($hero_image_uri) ?>"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php echo views_embed_view('promotions', 'block', $hotel_nid) ?>

    <div class="hidden-region">
        <?php echo theme('niquesa_header_links', array('nid' => isset($hotel_nid) ? $hotel_nid : null)) ?>
        <?php echo niquesa_ux_block_render('menu_block', 1) ?>
    </div>

    <?php include 'node.footer.inc' ?>
</div>
