<?php
	include 'node.header.inc';
	global $language;

	if (isset($node->field_hotel['und']))
		$hotel_nid = $node->field_hotel['und'][0]['target_id'];

	if (!isset($node->field_hotel['und']))
		$extra = ' group-level-page';
	else
		$extra = '';
?>

<div id="content_body" class="destination-landing-page<?php echo $extra ?>">
	<div class="hero-module split-landing-hero clearfix">
		<div class="hero-module-head">
			<div class="center-content">
				<div class="center-content-td">
					<div class="content-section">
						<div class="orange-box">
							<h3><em><?php echo $node->field_events_header['und'][0]['value'] ?></em></h3>
							<hr class="horizontal-divider dark">
							<p class="emphasized"><?php echo $node->field_events_text['und'][0]['value'] ?></p>

							<?php if (isset($hotel_nid)): ?>
								<a class="a-button black arrow-left" href="<?php echo url("node/{$node->nid}/local-events") ?>">
									<?php echo t("Discover what's on") ?>
								</a>
							<?php else: ?>
								<a class="a-button black arrow-left" href="<?php echo url('destinations/local-events') ?>">
									<?php echo t("Discover what's on") ?>
								</a>
							<?php endif ?>
						</div>
					</div>
				</div>
			</div>
			<img data-imgsrc="<?php echo file_create_url($node->field_events_background['und'][0]['uri']) ?>" class="background-img hide">
		</div>

		<div class="hero-module-head">
			<div class="center-content">
				<div class="center-content-td">
					<div class="content-section">
						<div class="orange-box">
							<h3><em><?php echo $node->field_neighbourhood_header['und'][0]['value'] ?></em></h3>
							<hr class="horizontal-divider dark">
							<p class="emphasized"><?php echo $node->field_neighbourhood_text['und'][0]['value'] ?></p>

							<?php if (isset($hotel_nid)): ?>
								<a class="a-button black arrow-right" href="<?php echo url("node/{$node->nid}/in-the-neighbourhood") ?>">
									<?php echo t('Start Exploring') ?>
								</a>
							<?php else: ?>
								<div class="fakeDrop standard-drop">
									<div class="hxd">
										<?php echo t('Choose hotel') ?>
									</div>
									<div class="bxd">
										<ul>
											<?php foreach (niquesa_ux_hotel_list() as $title => $path): ?>
												<li><?php echo l($title, drupal_get_path_alias($path) . "/destination/in-the-neighbourhood", array('alias' => true)) ?></li>
											<?php endforeach ?>
										</ul>
									</div>
								</div>
							<?php endif ?>
						</div>
					</div>
				</div>
			</div>
			<img data-imgsrc="<?php echo file_create_url($node->field_neighbourhood_background['und'][0]['uri']) ?>" class="background-img hide">
		</div>
	</div>
  
	<div class="hidden-region">
        <?php echo theme('niquesa_header_links', array('nid' => isset($hotel_nid) ? $hotel_nid : null)) ?>
		<?php
			$block_id = isset($hotel_nid) ? 1 : 3;
			echo niquesa_ux_block_render('menu_block', $block_id);
		?>
	</div>

	<?php
		if (isset($hotel_nid))
			include 'node.footer.inc';
		else
			include 'node.group.footer.inc';
	?>
</div>
