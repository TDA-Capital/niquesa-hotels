<?php
	include 'node.header.inc';
	global $language;

	if (isset($node->field_hotel['und']))
		$hotel_nid=$node->field_hotel['und'][0]['target_id'];

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
						<div class="lead">
							<?php echo $node->field_business_intro_italic['und'][0]['value'] ?>
						</div>
					</div>
				</div>
			</div>

			<?php if (isset($node->field_business_hero_image['und'][0]['uri'])): ?>
				<?php $hero_uri = $node->field_business_hero_image['und'][0]['uri'] ?>
				<img class="background-img hide" data-imgsrc="<?php echo file_create_url($hero_uri) ?>" />
			<?php endif ?>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section hero-letter">
							<?php echo $node->field_business_description_text['und'][0]['safe_value'] ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php if (!isset($node->field_hotel['und'])): ?>
		<?php echo niquesa_blob_group_function_rooms_output(array(
			'features' => $content['field_features'],
			'slider_images' => $content['field_slider_images'],
			'path' => '/business',
			'book_event_label' => $node->field_book_event_label['und'][0]['value']
		)) ?>

		<div class="hero-module catering-hero menu-scroll" data-scrollmenu-link-text="<?php echo t('Event Cuisine') ?>">
			<div class="hero-module-head">
				<div class="center-content">
					<div class="center-content-td">
						<div class="hero-module-header">
							<h1><?php echo t('Event Cuisine') ?></h1>
							<span class="horizontal-divider"></span>
							<div class="lead">
								<?php echo $node->field_event_catering_intro['und'][0]['safe'] ?>
							</div>
							<div class="text-center">
								<a class="a-button triggerReservationPopup" data-popup-target=".reservation-popup" href="#">
									<?php echo $node->field_book_event_label['und'][0]['value'] ?>
								</a>
								<div class="reservation-popup reservation-form">
									<?php echo render($content['webform']) ?>
								</div>
							</div>
							<?php if($node->field_event_catering_brochure): ?>
								<div class="text-center">
									<a class="a-button" href="<?php echo file_create_url($node->field_event_catering_brochure['und'][0]['uri']) ?>" target="_blank">
										<?php echo t('Brochure') ?>
									</a>
								</div>
							<?php endif ?>
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
