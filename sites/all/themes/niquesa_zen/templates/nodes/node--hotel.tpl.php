<?php
	global $language;
	include 'node.header.inc';
	$hotel_nid = $node->nid;
	hide($content['comments']);
	hide($content['links']);
?>
<div id="content_body" class="hotel-home-page">
	<div class="scroll-jacked">
		<?php foreach ($content['field_hotel_slideshow']['#items'] as $image): ?>
			<div class="slide active">
				<img class="background-img hide" data-imgsrc="<?php echo file_create_url($image['uri']) ?>">
			</div>
		<?php endforeach ?>

		<div class="center-content text-block">
			<div class="center-content-td">
				<div class="text">
					<h1><?php echo $content['field_hotel_slideshow_text']['#items'][0]['value'] ?></h1>
				</div>
			</div>
		</div>
		<h5 class="discover-more-btn"><a href="#" class="scroll-to"><?php echo t('Discover More') ?></a></h5>
	</div>

	<?php
		$query = new EntityFieldQuery();

		$query->entityCondition('entity_type', 'node')
			->propertyCondition('status', 1)
			->propertyCondition('type', array('facilities', 'bar', 'restaurant', 'room', 'function_rooms'))
			->propertyCondition('language', $language->language)
			->fieldCondition('field_hotel', 'target_id', $hotel_nid)
			->fieldCondition('field_display_on_hotel_home_page', 'value', 1)
			->range(0, 3);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');
	?>

	<div class="homepage-feature rfltered clearfix" data-traveller-tags="friends" data-interest-tags="shopping arts-and-culture">
		<div class="slider-wrap">
			<?php
				$fields = array(
					'facilities' => 'field_facility_image',
					'bar' => 'field_bar_image',
					'restaurant' => 'field_restaurant_image',
					'room' => 'field_room_image',
					'function_rooms' => 'field_function_room_image',
				);
			?>
			<?php foreach ($nodes as $slide_node): ?>
				<?php
					$field = $fields[$slide_node->type];
					$image_field = $slide_node->{$field}['und'][0];
				?>
				<div class="img-slide">
					<img <?php echo drupal_attributes(array(
						'class' => 'background-img lazy-img hide',
						'data-imgsrc' => file_create_url($image_field['uri']),
						'alt' => $image_field['alt'],
						'title' => $image_field['title'],
					)) ?>>
				</div>
			<?php endforeach ?>
		</div>
		<div class="content-wrap">
			<div class="orange-box">
				<div class="center-content">
					<div class="center-content-td">
						<?php
							$fields = array(
								'facilities' => 'field_facility_description',
								'bar' => 'field_bar_intro_text',
								'restaurant' => 'field_restaurant_intro_text',
								'room' => 'field_room_intro_text',
								'function_rooms' => 'field_function_room_description',
							)
						?>
						<?php foreach ($nodes as $slide_node): ?>
							<div class="slide">
								<div class="header">
									<h5><?php echo t('AT THE HOTEL') ?></h5>
									<hr class="horizontal-divider dark">
									<h3 class="slide-heading"><?php echo $slide_node->title ?></h3>
								</div>

								<div class="content-block hero-letter">
									<?php
										$field = $fields[$slide_node->type];
										echo $slide_node->{$field}['und'][0]['safe_value'];
									?>
								</div>
								<div class="text-center">
									<a href="<?php echo token_replace('[current-page:url]').'/'.t('cuisine') ?>" class="a-button black decorated">
										<?php echo t('Our Cuisine') ?>
									</a>
								</div>
							</div>
						<?php endforeach ?>
					</div>
				</div>

				<div class="slideNav"><ul class="clearfix"></ul></div>
				<a title="<?php echo t('Previous') ?>" class="pager-btn pager-prev" href="#"><?php echo t('Back') ?></a>
				<a title="<?php echo t('Next') ?>" class="pager-btn pager-next" href="#"><?php echo t('Next') ?></a>
			</div>
		</div>
	</div>

	<?php
		$query = new EntityFieldQuery();

		$query->entityCondition('entity_type', 'node')
			->propertyCondition('status', 1)
			->propertyCondition('type', 'event')
			->propertyCondition('language', $language->language)
			->fieldCondition('field_hotel', 'target_id', $hotel_nid)
			->fieldCondition('field_display_on_hotel_home_page', 'value', 1)
			->range(0, 3);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');
	?>

	<div class="homepage-feature rfltered clearfix" data-traveller-tags="couples" data-interest-tags="occasions">
		<div class="slider-wrap">
			<?php foreach ($nodes as $slide_node): ?>
				<?php $image = file_create_url($slide_node->field_event_image['und'][0]['uri']) ?>
				<div class="img-slide">
					<img class="background-img lazy-img hide" data-imgsrc="<?php echo $image ?>">
				</div>
			<?php endforeach ?>
		</div>
		<div class="content-wrap">
			<div class="orange-box">
				<div class="center-content">
					<div class="center-content-td">
						<?php foreach ($nodes as $slide_node): ?>
							<div class="slide">
								<div class="header">
									<h5><?php echo t('UPCOMING EVENTS') ?></h5>
									<hr class="horizontal-divider dark">
									<h3 class="slide-heading"><?php echo $slide_node->title ?></h3>
								</div>

								<div class="content-block hero-letter">
									<?php echo $slide_node->field_event_intro_text['und'][0]['safe_value'] ?>
								</div>
							</div>
						<?php endforeach ?>
					</div>
				</div>
				<div class="slideNav"><ul class="clearfix"></ul></div>
				<a title="<?php echo t('Previous') ?>" class="pager-btn pager-prev" href="#"><?php echo t('Back') ?></a>
				<a title="<?php echo t('Next') ?>" class="pager-btn pager-next" href="#"><?php echo t('Next') ?></a>
			</div>
		</div>
	</div>

	<?php
		$query = new EntityFieldQuery();
		$query->entityCondition('entity_type', 'node')
			->propertyCondition('status', 1)
			->propertyCondition('type','destination')
			->propertyCondition('language', $language->language)
			->fieldCondition('field_hotel', 'target_id', $hotel_nid)
			->fieldCondition('field_display_on_hotel_home_page', 'value', 1)
			->range(0, 3);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');
	?>

	<div class="homepage-feature rfltered clearfix" data-traveller-tags="business" data-interest-tags="shopping gourmet">
		<div class="slider-wrap">
			<?php foreach ($nodes as $slide_node): ?>
				<?php $image = file_create_url($slide_node->field_destination_image['und'][0]['uri']) ?>
				<div class="img-slide">
					<img class="background-img lazy-img hide" data-imgsrc="<?php echo $image ?>">
				</div>
			<?php endforeach ?>
		</div>

		<div class="content-wrap">
			<div class="orange-box">
				<div class="center-content">
					<div class="center-content-td">
						<?php foreach ($nodes as $slide_node): ?>
							<div class="slide">
								<div class="header">
									<h5><?php echo t('IN THE NEIGHBOURHOOD') ?></h5>
									<hr class="horizontal-divider dark">
									<h3 class="slide-heading"><?php echo $slide_node->title ?></h3>
								</div>

								<div class="content-block hero-letter">
									<?php echo $slide_node->field_destination_intro_italic['und'][0]['safe_value'] ?>
								</div>

								<div class="text-center">
									<a href="<?php echo token_replace('[current-page:url]').'/'.t('destination') ?>" class="a-button black decorated">
										<?php echo t('The Destination') ?>
									</a>
								</div>
							</div>
						<?php endforeach ?>
					</div>
				</div>

				<div class="slideNav"><ul class="clearfix"></ul></div>
				<a title="<?php echo t('Previous') ?>" class="pager-btn pager-prev" href="#"><?php echo t('Back') ?></a>
				<a title="<?php echo t('Next') ?>" class="pager-btn pager-next" href="#"><?php echo t('Next') ?></a>
			</div>
		</div>
	</div>

	<div class="hidden-region">
        <?php echo theme('niquesa_header_links', array('nid' => $node->nid)) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php include 'node.footer.inc' ?>
</div>
