<?php
	global $language;
	include 'node.header.inc';
?>
<div id="content_body" class="cuisine-page">
	<div class="hero-module generic-hero menu-scroll" data-scrollmenu-link-text="Our Cuisine">
		<div class="hero-module-head">
			<div class="hero-module-header">
				<h1><?php echo $node->title ?></h1>
				<span class="horizontal-divider"></span>
			</div>

			<?php $hero_uri = $node->field_cuisine_hero_image['und'][0]['uri'] ?>
			<img class="background-img hide" data-imgsrc="<?php echo file_create_url($hero_uri) ?>" />
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section">
							<?php echo $node->field_cuisine_intro_text['und'][0]['value'] ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php foreach ($restaurants as $restaurant): ?>
		<div class="cafe-module menu-scroll" data-scrollmenu-link-text="<?php echo $restaurant->title ?>">
			<header class="header-block">
				<h1><?php echo $restaurant->title ?></h1>
				<hr class="horizontal-divider">
				<h3><?php echo strtoupper($restaurant->field_restaurant_slogan['und'][0]['value']) ?></h3>
				<hr class="horizontal-divider">
			</header>
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<div class="img-slideshow ezSlidr">
							<ul class="slides">
								<?php
									foreach ($restaurant->field_restaurant_image['und'] as $slide):
										$style_array = array(
											'path' => $slide['uri'],
											'style_name' => 'slideshow__940x400_',
											'attributes' => array('class' => 'lazy-img'),
											'width' => 940,
											'height' => 240,
										);
										$styled_slide = niquesa_ux_image_style($style_array);
								?>
									<li><img <?php echo drupal_attributes(array(
										'class' => 'lazy-img',
										'data-imgsrc' => $styled_slide['path'],
										'alt' => $slide['alt'],
										'title' => $slide['title'],
									)) ?>></li>
								<?php endforeach ?>
							</ul>
						</div>
					</div>
				</div>

				<div class="content-block">
					<div class="text">
						<hr class="horizontal-divider black">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 emphasized">
								<?php echo $restaurant->field_restaurant_intro_text['und'][0]['value'] ?>
							</div>
						</div>
						<hr class="horizontal-divider black">
					</div>
					<div class="text">
						<div class="row">
							<div class="col-xs-12 col-sm-6">
							   <?php echo $restaurant->field_restaurant_descrip_left['und'][0]['value'] ?>
							</div>
							<div class="col-xs-12 col-sm-6">
							   <?php echo $restaurant->field_restaurant_descrip_right['und'][0]['value'] ?>
							</div>
						</div>
					</div>
					
					<div class="decorated-btn-wrap">
						<a href="#" class="a-button black decorated triggerReservationPopup" data-popup-target=".reservation-popup">
							<?php echo $restaurant->field_reserve_your_table['und'][0]['title'] ?>
						</a>
					</div>
				</div>
			</div>
				
			<div class="container">
				<div class="row highlight-row hidden-xs">
					<div class="col-xs-3 col-xs-offset-3">
						<div class="highlights-item">
							<?php $specials = $restaurant->field_restaurant_specials_image['und'][0] ?>
							<img <?php echo drupal_attributes(array(
								'src' => file_create_url($specials['uri']),
								'alt' => $specials['alt'],
								'title' => $specials['title'],
							)) ?>>
							<a class="caption" href="<?php echo file_create_url($restaurant->field_restaurant_specials_pdf['und'][0]['uri']) ?>" target="_blank">
								<div class="center-content">
									<div class="center-content-td">
										<em><?php echo $restaurant->field_restaurant_specials_text['und'][0]['value'] ?></em>
										<div class="slow-trans">
											<span class="horizontal-divider"></span>
											<span><?php echo t('Learn More') ?></span>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-xs-3">
						<div class="highlights-item">
							<?php $menu = $restaurant->field_restaurant_menu_image['und'][0] ?>
							<img <?php echo drupal_attributes(array(
								'src' => file_create_url($menu['uri']),
								'alt' => $menu['alt'],
								'title' => $menu['title'],
							)) ?>>
							<a class="caption" href="<?php echo file_create_url($restaurant->field_restaurant_menu_pdf['und'][0]['uri']) ?>" target="_blank">
								<div class="center-content">
									<div class="center-content-td">
										<em><?php echo $restaurant->field_restaurant_menu_text['und'][0]['value'] ?></em>
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
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="content-block">
							<?php echo $restaurant->field_restaurant_outro_text['und'][0]['safe_value'] ?>
						</div>
					</div>
				</div>

				<div class="content-block">
					<div class="decorated-btn-wrap">
						<a href="#" class="a-button black decorated triggerReservationPopup" data-popup-target=".reservation-popup">
							<?php echo $restaurant->field_reserve_your_table['und'][0]['title'] ?>
						</a>
						<div class="reservation-popup reservation-form">
							<?php echo render($content['webform']) ?>
						</div>
					</div>
				</div>
			</div>
				
			<div class="container">
				<ul class="split-list hidden-xs">
					<li class="row">
						<?php list($open_from, $open_to, $remainder) = explode(';', $restaurant->field_restaurant_opening_times['und'][0]['value']) ?>

						<div class="col-xs-12 col-sm-6 text-right"><?php echo $restaurant->field_restaurant_address['und'][0]['value'] ?></div>
						<div class="col-xs-12 col-sm-6 emphasized"><?php echo $open_from ?></div>
					</li>
					<li class="row">
						<div class="col-xs-12 col-sm-6 text-right"><?php echo $restaurant->field_reservation_phone['und'][0]['value'] ?></div>
						<div class="col-xs-12 col-sm-6 emphasized"><?php echo $open_to ?></div>
					</li>
					<li class="row">
						<div class="col-xs-12 col-sm-6 text-right">
							<a href="mailto:<?php echo $restaurant->field_restaurant_email['und'][0]['value'] ?>">
								<?php echo $restaurant->field_restaurant_email['und'][0]['value'] ?>
							</a>
						</div>
						<div class="col-xs-12 col-sm-6 emphasized"?><?php echo $remainder ?></div>
					</li>
				</ul>
				<ul class="split-list visible-xs text-center">
					<li class="row">
						<div class="col-xs-12"><?php echo $restaurant->field_restaurant_address['und'][0]['value'] ?></div>
						<div class="col-xs-12 col-sm-6"><?php echo $restaurant->field_reservation_phone['und'][0]['value'] ?></div>
						<div class="col-xs-12">
							<a href="mailto:<?php echo $restaurant->field_restaurant_email['und'][0]['value'] ?>">
								<?php echo $restaurant->field_restaurant_email['und'][0]['value'] ?>
							</a>
						</div>
					</li>
					<li class="row">
						<div class="col-xs-12 emphasized"><?php echo $open_from ?></div>
						<div class="col-xs-12 emphasized"><?php echo $open_to ?></div>
						<div class="col-xs-12 emphasized"?><?php echo $remainder ?></div>
					</li>
				</ul>
			</div>
		</div>

		<?php if (!empty($node->field_chef_name['und'])): ?>
			<a name="chef"></a>
			<div class="hero-module generic-hero menu-scroll" data-scrollmenu-link-text="Our Chef">
				<div class="hero-module-head">
					<div class="hero-module-header">
						<em><?php echo $node->field_chef_name['und'][0]['value'] ?></em>
						<h1><?php echo t('Our Chef') ?></h1>
						<span class="horizontal-divider"></span>
					</div>
					<img class="background-img hide" data-imgsrc="<?php echo file_create_url($node->field_chef_hero_image['und'][0]['uri']) ?>" />
				</div>

				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="hero-module-body">
								<div class="hero-module-content-section hero-letter">
									<?php
										$biography = $node->field_chef_biography['und'][0]['value'];
										$paragraphs = explode("\r\n\r\n", $biography);
									?>
									<?php foreach ($paragraphs as $i => $paragraph): ?>
										<?php if ($i + 1 == count($paragraphs) && $node->field_chef_image): ?>
											<div class="row">
												<div class="col-md-4">
													<?php
														$style_array = array(
															'path' => $node->field_chef_image['und'][0]['uri'],
															'style_name' => 'chef_image_220_x_380',
															'width' => 220,
															'height' => 380,
														);
														$chef_image_styled = niquesa_ux_image_style($style_array)
													?>
													<img src="<?php echo $chef_image_styled['path'] ?>" />
												</div>
												<div class="col-md-8">
													<p><?php echo nl2br($paragraph) ?></p>
												</div>
											</div>
										<?php else: ?>
											<p><?php echo nl2br($paragraph) ?></p>
										<?php endif ?>
									<?php endforeach ?>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		<?php endif ?>
	<?php endforeach ?>

	<div class="cafe-module menu-scroll" data-scrollmenu-link-text="<?php echo $bar->title ?>">
		<header class="header-block">
			<h1><?php echo $bar->title ?></h1>
			<hr class="horizontal-divider">
			<h3><?php echo $bar->field_highlight_text['und'][0]['value'] ?></h3>
			<hr class="horizontal-divider">
		</header>
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<div class="img-slideshow ezSlidr">
						<ul class="slides">
							<?php
								foreach ($bar->field_bar_image['und'] as $slide):
									$style_array = array(
										'path' => $slide['uri'],
										'style_name' => 'slideshow__940x400_',
										'attributes' => array('class' => 'lazy-img'),
										'width' => 940,
										'height' => 240,
									);
									$styled_slide = niquesa_ux_image_style($style_array);
							?>
								<li><img <?php echo drupal_attributes(array(
									'class' => 'lazy-img',
									'data-imgsrc' => $styled_slide['path'],
									'alt' => $slide['alt'],
									'title' => $slide['title'],
								)) ?>></li>
							<?php endforeach ?>
						</ul>
					</div>
				</div>
			</div>

			<div class="content-block">
				<div class="text">
					<hr class="horizontal-divider black">
					<div class="row">
						<div class="col-md-8 col-md-offset-2 emphasized">
							<?php echo $bar->field_bar_intro_text['und'][0]['value'] ?>
						</div>
					</div>
					<hr class="horizontal-divider black">
				</div>
				<div class="text">
					<div class="row">
						<div class="col-md-6 col-md-offset-3">
							<?php echo $bar->field_bar_description_intro['und'][0]['value'] ?>
							<?php echo $bar->field_bar_description['und'][0]['value'] ?>
						</div>
					</div>
				</div>
				<hr class="horizontal-divider black">
				<div class="text">
					<div class="row">
						<div class="col-xs-6 col-xs-offset-3 text-center">
							<p><?php echo $bar->field_bar_address['und'][0]['value'] ?></p>
							<p><?php echo $bar->field_bar_telephone['und'][0]['value'] ?></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php include 'node.footer.inc' ?>
</div>
