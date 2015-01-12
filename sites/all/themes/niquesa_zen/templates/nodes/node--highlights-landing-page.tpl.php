<?php
	global $language;
	include 'node.header.inc';
?>
	
<div id="content_body" class="highlights-page">
	<div class="hero-module generic-hero menu-scroll" data-scrollmenu-link-text="<?php echo $node->field_module_a_title['und'][0]['value'] ?>">
		<div class="hero-module-head">
			<div class="hero-module-header">
				<em><?php echo $node->field_module_a_intro_italic['und'][0]['value'] ?></em>
				<h1><?php echo $node->field_module_a_title['und'][0]['value'] ?></h1>
				<span class="horizontal-divider"></span>
			</div>
	
			<?php $hero_uri = $node->field_module_a_hero_image['und'][0]['uri'] ?>
			<img class="background-img hide" data-imgsrc="<?php echo file_create_url($hero_uri) ?>" />
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section">
							<div class="hero-letter">
								<?php echo $node->field_module_a_text_description['und'][0]['value'] ?>
							</div>

							<div class="text-center">
								<a href="<?php echo $node->field_module_a_book_now_link['und'][0]['url'] ?>" class="a-button black decorated" target="_blank">
									<?php echo $node->field_module_a_book_now_link['und'][0]['title'] ?>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php include 'experiences.inc' ?>

	<div class="hero-module generic-hero menu-scroll" data-scrollmenu-link-text="<?php echo $node->field_module_b_title['und'][0]['value'] ?>">
		<div class="hero-module-head">
			<div class="hero-module-header">
				<em><?php echo $node->field_module_b_intro_italic['und'][0]['value'] ?></em>
				<h1><?php echo $node->field_module_b_title['und'][0]['value'] ?></h1>
				<span class="horizontal-divider"></span>
			</div>

			<?php $hero_uri = $node->field_module_b_hero_image['und'][0]['uri'] ?>

			<img class="background-img hide" data-imgsrc="<?php echo file_create_url($hero_uri) ?>">
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section">
							<div class="hero-letter">
								<?php echo $node->field_module_b_text_description['und'][0]['value'] ?>
							</div>

							<div class="text-center">
								<a href="<?php echo $node->field_module_b_book_now_link['und'][0]['url'] ?>" class="a-button black decorated" target="_blank">
									<?php echo $node->field_module_b_book_now_link['und'][0]['title'] ?>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="hotel-highlights-module">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 text-center">
					<h3 class="module-heading"><?php echo t('Hotel Highlights') ?></h3>
					<hr class="horizontal-divider dark">
				</div>
			</div>

			<?php
				$h_class = array('top', 'left', 'right', 'bottom');
				$h_style = array('highlight_232x313', 'highlight_460x190', 'highlight_237x307', 'highlight_391x261');
				$h_width = array(232, 460, 237, 391);
				$h_height = array(313, 190, 307, 261);
			?>

			<div class="row highlight-container">
				<?php
					$counter = 0;
					foreach ($highlights as $highlight_item):
						if ($counter < 3 && strlen($highlight_item['text']) > 90)
							$highlight_item['text'] = substr($highlight_item['text'], 0, 90) . '&hellip;';
				?>
					<div class="col-md-4">
						<div class="highlights-item <?php echo $h_class[$counter] ?> ">
							<div class="img">
								<?php
									$style_array = array(
										'path' => $highlight_item['image'],
										'style_name' => $h_style[$counter],
										'width' => $h_width[$counter],
										'height' => $h_height[$counter],
									);
									echo theme('image_style', $style_array);
								?>
							</div>
							<div class="highlights-copy">
								<div class="text">
									<h4><?php echo $highlight_item['title'] ?></h4>
									<hr class="horizontal-divider dark">
									<p><?php echo $highlight_item['text'] ?></p>
								</div>
								<a class="caption" href="<?php echo $highlight_item['link'] ?>">
									<div class="center-content">
										<div class="center-content-td">
											<em><?php echo $highlight_item['title'] ?></em>
											<div class="slow-trans">
												<span class="horizontal-divider"></span>
												<span><?php echo t('Learn More') ?></span>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				<?php
						$counter++;
						if ($counter > 3)
							$counter = 0;
					endforeach;
				?>
			</div>
		</div>
	</div>

	<div class="hero-module generic-hero menu-scroll" data-scrollmenu-link-text="<?php echo $node->field_module_c_title['und'][0]['value'] ?>">
		<div class="hero-module-head">
			<div class="hero-module-header">
				<em><?php print $node->field_module_c_intro_italic["und"][0]["value"];?></em>
				<h1><?php print $node->field_module_c_title["und"][0]["value"];?></h1>
				<span class="horizontal-divider"></span>
			</div>

			<?php $hero_uri = $node->field_module_c_hero_image['und'][0]['uri'] ?>

			<img class="background-img hide" data-imgsrc="<?php echo file_create_url($hero_uri) ?>" />
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section">
							<div class="hero-letter">
								<?php echo $node->field_module_c_text_description['und'][0]['value'] ?>
							</div>

							<div class="text-center">
								<a href="<?php echo $node->field_module_c_book_now_link['und'][0]['url'] ?>" class="a-button black decorated" target="_blank">
									<?php echo $node->field_module_c_book_now_link['und'][0]['title'] ?>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php if ($destinations): ?>
		<div class="highlights-slider-module hidden-xs">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 text-center">
						<h3 class="module-heading"><?php echo t('Destination Highlights') ?></h3>
						<hr class="horizontal-divider dark">
					</div>
				</div>

				<div class="row">
					<div class="ezRotate">
						<ul class="slides clearfix">
							<?php
								$query = db_select('node', 'node');
								$query->join('field_data_field_hotel', 'hotel', 'hotel.entity_id = node.nid');
								$destination_page = $query->fields('node', array('nid'))
									->condition('node.status', 1)
									->condition('node.type', 'destination_landing_page')
									->condition('node.language', $language->language)
									->condition('hotel.field_hotel_target_id', $node->field_hotel['und'][0]['target_id'])
									->execute()
									->fetchObject();
								$base_url = url("node/{$destination_page->nid}/in-the-neighbourhood");
								$counter = 0;

								foreach ($destinations as $destination):
									$counter++;
							?>
								<li class="highlights-item slow-trans<?php if ($counter == 2): ?> active<?php endif ?>">
									<div class="highlights-img">
										<?php
											$style_array = array(
												'path' => $destination['image'],
												'style_name' => 'destination_highlights_460_x_240',
												'attributes' => array('class' => 'lazy-img'),
												'width' => 460,
												'height' => 240,
											);
											echo theme('image_style', $style_array);
											$url_destination = $base_url . '?' . http_build_query(array('viewDestination' => $destination['title']), '', '&', PHP_QUERY_RFC3986);
											$url_details = $base_url . '?' . http_build_query(array('viewDestinationDetails' => $destination['title']), '', '&', PHP_QUERY_RFC3986);
										?>
										 <div class="highlight-hover slow-trans" >
											<a class="view-map subheading-text" href="<?php echo $url_destination ?>">
												<?php echo t('View On Map') ?>
											</a>
											<hr/>
											<a class="view-details subheading-text" href="<?php echo $url_details ?>">
												<?php echo t('View Details') ?>
											</a>
										</div> 
									</div>

									<div class="meta slow-trans">
										<h4><?php echo $destination['title'] ?></h4>
										<?php echo $destination['icon'] ?>
										<?php echo $destination['icon_hover'] ?>
									</div>
								</li>
							<?php endforeach ?>
						</ul>
					</div>
				</div>
			</div>
		</div>
	<?php endif ?>

	<div class="hero-module generic-hero menu-scroll" data-scrollmenu-link-text="<?php echo $node->field_module_d_title['und'][0]['value'] ?>">
		<div class="hero-module-head">
			<div class="hero-module-header">
				<em><?php echo $node->field_module_d_intro_italic['und'][0]['value'] ?></em>
				<h1><?php echo $node->field_module_d_title['und'][0]['value'] ?></h1>
				<span class="horizontal-divider"></span>
			</div>

			<?php $hero_uri = $node->field_module_d_hero_image['und'][0]['uri'] ?>
			<img class="background-img hide" data-imgsrc="<?php echo file_create_url($hero_uri) ?>" />
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section">
							<div class="hero-letter">
								<?php echo $node->field_module_d_text_description['und'][0]['value'] ?>
							</div>

							<div class="text-center">
								<a href="<?php echo $node->field_module_d_book_now_link['und'][0]['url'] ?>" class="a-button black decorated" target="_blank">
									<?php echo $node->field_module_d_book_now_link['und'][0]['title'] ?>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php if ($cuisine): ?>
		<div class="highlights-module">
			<div class="row">
				<div class="col-xs-12 text-center">
					<h3 class="module-heading"><?php echo t('Culinary Highlights') ?></h3>
					<hr class="horizontal-divider dark">
				</div>
			</div>

			<div class="container">
				<div class="row highlight-row">
					<?php
						foreach ($cuisine as $cuisine_item):
							$style_array = array(
								'path' => $cuisine_item['image']['uri'],
								'style_name' => 'cuisine_thumbnail',
								'width' => 220,
								'height' => 380,
								'alt' => $cuisine_item['image']['alt'],
								'title' => $cuisine_item['image']['title'],
							);
					?>
						<div class="col-xs-6 col-md-3">
							<div class="highlights-item">
								<?php echo theme('image_style', $style_array) ?>
								<a href="<?php echo $cuisine_item['link'] ?>" class="caption"<?php if (isset($cuisine_item['target'])): ?> target="<?php echo $cuisine_item['target'] ?>"<?php endif ?>>
									<div class="center-content">
										<div class="center-content-td">
											<em><?php echo $cuisine_item['title'] ?></em>
											<div class="slow-trans">
												<span class="horizontal-divider"></span>
												<span><?php echo t('Learn More') ?></span>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					<?php endforeach ?>
				</div>
			</div>
		</div>
	<?php endif ?>

	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php include 'node.footer.inc' ?>
</div>
