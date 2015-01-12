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
<div id="content_body" class="business-events-page<?php echo $extra ?>">
	<div class="hero-module business-events-hero menu-scroll" data-scrollmenu-link-text="Introduction">
		<div class="hero-module-head">
			<div class="center-content tint-black">
				<div class="center-content-td">
					<div class="hero-module-header">
						<h1><?php echo $node->title ?></h1>
						<span class="horizontal-divider"></span>
						<p class="lead">
							<?php echo $node->field_greetings_intro_italic['und'][0]['value'] ?>
						</p>
					</div>
				</div>
			</div>

			<?php
				$hero_uri = $node->field_greetings_hero_image['und'][0]['uri'];
				$hero_image_path = file_create_url($hero_uri);
			?>

			<img class="background-img hide" data-imgsrc="<?php echo $hero_image_path ?>" />
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section hero-letter">
							<?php print $node->field_greetings_description["und"][0]["safe_value"]; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php if (!isset($node->field_hotel['und'])): ?>
		<?php echo niquesa_blob_group_function_rooms_christmas_output(array(
			'features' => $content['field_features'],
			'slider_images' => $content['field_slider_images'],
			'path' => '/experiences',
			'book_event_label' => $node->field_book_event_label['und'][0]['value']
		)) ?>

		<div class="hero-module catering-hero menu-scroll" data-scrollmenu-link-text="<?php echo t('Event Cuisine') ?>">
			<div class="hero-module-head">
				<div class="center-content tint-black">
					<div class="center-content-td">
						<div class="hero-module-header">
							<h1><?php echo t('Christmas Cuisine') ?></h1>
							<span class="horizontal-divider"></span>
							<p class="lead">
								<?php echo $node->field_event_catering_intro['und'][0]['value'] ?>
							</p>
							<div class="text-center">
								<a class="a-button triggerReservationPopup" data-popup-target=".reservation-popup" href="#">
									<?php echo $node->field_book_event_label['und'][0]['value'] ?>
								</a>
								<div class="reservation-popup reservation-form">
									<?php echo render($content['webform']) ?>
								</div>
							</div>
						</div>
					</div>
				</div>

				<img class="background-img hide" data-imgsrc="/assets/img/bg2.jpg" />
			</div>

			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="hero-module-body">
							<div class="hero-module-content-section hero-letter">
									<?php echo $node->field_event_catering_description['und'][0]['safe_value'] ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php else: ?>
		<?php
			echo niquesa_blob_function_rooms_output(array(
				'hotel_nid' => $hotel_nid,
				'features' => $content['field_features'],
				'book_event_label' => $node->field_book_event_label['und'][0]['value'],
			));
			echo niquesa_blob_catering_output(array(
				'hotel_nid' => $hotel_nid,
				'parent_node' => $node,
				'book_event_label' => $node->field_book_event_label['und'][0]['value'],
				'webform' => $content['webform'],
			));
		?>
	<?php endif ?>

	<?php include 'experiences.inc' ?>

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
