<?php
	global $language;

	if (isset($node->field_hotel['und']))
		$hotel_nid = $node->field_hotel['und'][0]['target_id'];
?>

<div id="content_body" class="gallery-page">
	<div id="gallerySlideshow">
		<a id="prevslide" class="load-item slider-prev"></a>
		<a id="nextslide" class="load-item slider-next"></a>

		<div id="thumb-tray" class="load-item">
			<div id="thumb-back"></div>
			<div id="thumb-forward"></div>
		</div>

		<div class="hide-this">
			<?php foreach ($node->field_image['und'] as $gallery_image): ?>
				<?php
					$thumbnail = niquesa_ux_image_style(array(
						'path' => $gallery_image['uri'],
						'style_name' => 'gallery_thumb_170x113',
					));
					$full = niquesa_ux_image_style(array(
						'path' => $gallery_image['uri'],
						'style_name' => 'gallery_full_1440x960',
					));
				?>
				<img <?php echo drupal_attributes(array(
					'src' => $thumbnail['path'],
					'data-img-src' => $full['path'],
					'alt' => $gallery_image['alt'],
					'title' => $gallery_image['title'],
				)) ?>>
			<?php endforeach ?>
		</div>

		<div class="gallery-Nav">
			<a href="#" class="close-btn" onclick="window.history.back();return false;"><?php echo t('Close') ?></a>

			<ul class="container gallery-menu">
				<?php
					$query = new EntityFieldQuery();
					$query->entityCondition('entity_type', 'node')
						->propertyCondition('status', 1)
						->propertyCondition('type', 'gallery')
						->propertyCondition('language', $language->language);

					if (isset($hotel_nid))
						$query->fieldCondition('field_hotel', 'target_id', $hotel_nid);

					$result = $query->execute();
					$gallery_nodes = node_load_multiple(array_keys($result['node']), '');
				?>

				<?php foreach ($gallery_nodes as $gallery_node): ?>
					<?php 
						if (!isset($hotel_nid) && isset($gallery_node->field_hotel['und']))
							continue;

						if (isset($gallery_node->field_gallery_type["und"])) {
							$term = taxonomy_term_load($gallery_node->field_gallery_type['und'][0]['tid']);
							$translated_term = i18n_taxonomy_term_get_translation($term, $language->language);
						}

						$extra = '';

						if ($gallery_node->nid == $node->nid)
							$extra = ' class="active"';
					?>
					<li<?php echo $extra ?>>
						<a href="<?php echo url("node/{$gallery_node->nid}") ?>"><?php echo $translated_term->name ?></a>
					</li>
				<?php endforeach ?>
			</ul>
		</div>
	</div>

	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php include 'node.footer.inc' ?>
</div>
