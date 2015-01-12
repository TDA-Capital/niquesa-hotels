<?php global $language ?>

<div class="hero-module catering-hero menu-scroll" data-scrollmenu-link-text="<?php echo t('Event Cuisine') ?>">
	<div class="hero-module-head">
		<div class="center-content tint-black">
			<div class="center-content-td">
				<div class="hero-module-header">
					<h1><?php echo t('Event Cuisine') ?></h1>
					<span class="horizontal-divider"></span>
					<p class="lead">
						<?php _niquesa_util_log($parent_node); ?>
						<?php echo $parent_node->field_event_catering_intro['und'][0]['value'] ?>
					</p>
					<div class="text-center">
						<a class="a-button triggerReservationPopup" data-popup-target=".reservation-popup" href="#">
							<?php echo $book_event_label ?>
						</a>
						<div class="reservation-popup reservation-form">
							<?php echo render($webform) ?>
						</div>
					</div>
					<?php if($parent_node->field_event_catering_brochure): ?>
						<div class="text-center">
							<a class="a-button" href="<?php echo file_create_url($parent_node->field_event_catering_brochure['und'][0]['uri']) ?>" target="_blank">
								<?php echo t('Brochure') ?>
							</a>
						</div>
					<?php endif ?>
				</div>
			</div>
		</div>
		<img class="background-img hide" data-imgsrc="/assets/img/bg2.jpg" />
	</div>
	<?php if ($catering_nodes): ?>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section">
							<div class="row">
								<?php foreach (array_chunk($catering_nodes, 2) as $chunk): ?>
									<div class="item col-xs-6">
										<?php foreach ($chunk as $catering_node): ?>
											<div class="highlights-item">
												<?php
													$catering_image_uri = $catering_node->field_cuisine_image['und'][0]['uri'];

													if (isset($catering_node->field_cuisine_pdf['und']))
														$link = file_create_url($catering_node->field_cuisine_pdf['und'][0]['uri']);
													elseif (isset($catering_node->field_cuisine_link['und']))
														$link = $catering_node->field_cuisine_link['und'][0]['url'];
													else
														$link = url("node/{$catering_node->nid}");
												?>
												<img <?php echo drupal_attributes(array(
													'src' => file_create_url($catering_image_uri),
													'alt' => $catering_node->field_cuisine_image['und'][0]['alt'],
													'title' => $catering_node->field_cuisine_image['und'][0]['title'],
												))?>>
												<a href="<?php echo $link ?>" class="caption"<?php if (isset($catering_node->field_cuisine_pdf['und'])): ?> target="_blank"<?php endif ?>>
													<div class="center-content">
														<div class="center-content-td">
															<em><?php echo $catering_node->title ?></em>
															<div class="slow-trans">
																<span class="horizontal-divider"></span>
																<span><?php echo t('Learn More') ?></span>
															</div>
														</div>
													</div>
												</a>
											</div>
										<?php endforeach?>
									</div>
								<?php endforeach ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php endif ?>
</div>
