<?php
	include('node.header.inc');
	global $language;

	if (isset($node->field_hotel['und'])) {
		$hotel_nid=$node->field_hotel['und'][0]['target_id'];
		$extra = '';
	}
	else
		$extra = ' group-level-page';
?>

<div id="content_body" class="about-us-page<?php echo $extra ?>">
	<div class="hero-module hero-about">
		<div class="hero-module-head">
			<div class="center-content">
				<div class="center-content-td">
					<div class="box-about">
						<div class="orange-box">
							<h1><?php echo $node->title ?></h1>
							<span class="horizontal-divider orange"></span>
							<?php echo $node->body['und'][0]['safe_value'] ?>
						</div>
					</div>
				</div>
			</div>
			<?php if (!empty($node->field_background_image['und'])): ?>
				<img class="background-img hide" data-imgsrc="<?php echo file_create_url($node->field_background_image['und'][0]['uri']) ?>">
			<?php endif ?>
		</div>
	</div>

	<?php if (isset($node->field_hotel['und'])): ?>
		<div class="hidden-region">
            <?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
			<?php echo niquesa_ux_block_render('menu_block', 1) ?>
		</div>
		<?php include 'node.footer.inc' ?>
	<?php else: ?>
		<div class="hidden-region">
            <?php echo theme('niquesa_header_links', array('nid' => null)) ?>
			<?php echo niquesa_ux_block_render('menu_block', 3) ?>
		</div>
		<?php include 'node.group.footer.inc' ?>
	<?php endif ?>
</div>
