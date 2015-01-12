<?php global $language ?>
<div class="function-room-module menu-scroll" data-scrollmenu-link-text="<?php echo t('Our Venues') ?>">
	<div class="container">
		<div class="row header">
			<div class="col-xs-12">
				<h2 class="module-heading"><?php echo t('Our Venues') ?></h2>
				<hr class="horizontal-divider" />
			</div>
		</div>

		<div class="function-room-menu-wrap">
			<div class="function-room-menu">
				<div class="container">
					<div class="row">
						<div class="col-xs-12">
							<div class="function-room-module-nav">
								<?php
									$counter = 0;
									foreach ($function_rooms as $function_room):
										$counter++;
								?>
									<div>
										<a <?php echo drupal_attributes(array(
											'href' => '#',
											'title' => $function_room->title,
											'data-function-room-tabindex' => $counter,
										)) ?>>
											<?php echo $function_room->title ?>
										</a>
									</div>
								<?php endforeach ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="function-room-module-content container">
			<?php
				$counter = 0;
				foreach ($function_rooms as $function_room):
					$counter++;
			?>
				<div class="function-room-tab" data-function-room-tabindex="<?php echo $counter ?>">
					<div class="row">
						<div class="col-xs-12">
							<?php if (isset($function_room->field_function_room_image['und'])): ?>
								<div class="img-slideshow ezSlidr">
									<ul class="slides">
										<?php foreach ($function_room->field_function_room_image['und'] as $function_room_slide): ?>
											<?php
												$style_array = array(
													'path' => $function_room_slide['uri'],
													'style_name' => 'slideshow__940x400_',
													'attributes' => array('class' => 'lazy-img'),
													'width' => 940,
													'height' => 400
												);

											   $styled_slide = niquesa_ux_image_style($style_array);
											?>
											<li>
												<img <?php echo drupal_attributes(array(
													'class' => 'lazy-img',
													'data-imgsrc' => $styled_slide['path'],
													'alt' => $function_room_slide['alt'],
													'title' => $function_room_slide['title'],
												)) ?>>
											</li>
										<?php endforeach ?>
									</ul>
								</div>
							<?php endif ?>

							<div class="room-layouts scrollable-nav">
								<div class="row">
									<div class="col-xs-6 col-sm-4 col-md-2 box box-1">
										<img src="/assets/img/second-scroll-nav-theatre.jpg">
										<h5><?php echo t('Theatre'); ?></h5>
										<hr class="horizontal-divider" />
										<p>
											<?php if (isset($function_room->field_seating_theatre['und'])): ?>
												Max cap.<?php echo $function_room->field_seating_theatre['und'][0]['value'] ?>
											<?php else:  ?>
												N/A
											<?php endif  ?>
										</p>
									</div>
									<div class="col-xs-6 col-sm-4 col-md-2 box box-1">
										<img src="/assets/img/second-scroll-nav-boardroom.jpg">
										<h5><?php echo t('Boardroom'); ?></h5>
										<hr class="horizontal-divider" />
										<p>
											<?php if (isset($function_room->field_seating_boardroom['und'])): ?>
												Max cap.<?php echo $function_room->field_seating_boardroom['und'][0]['value'] ?>
											<?php else:  ?>
												N/A
											<?php endif  ?>
										</p>
									</div>
									<div class="col-xs-6 col-sm-4 col-md-2 box box-1">
										<img src="/assets/img/second-scroll-nav-ushape.jpg">
										<h5><?php echo t('U-Shape'); ?></h5>
										<hr class="horizontal-divider" />
										<p>
											<?php if (isset($function_room->field_seating_ushape['und'])): ?>
												Max cap.<?php echo $function_room->field_seating_ushape['und'][0]['value'] ?>
											<?php else:  ?>
												N/A
											<?php endif  ?>
										</p>
									</div>
									<div class="col-xs-6 col-sm-4 col-md-2 box box-1">
										<img src="/assets/img/second-scroll-nav-classroom.jpg">
										<h5><?php echo t('Classroom'); ?></h5>
										<hr class="horizontal-divider" />
										<p>
											<?php if (isset($function_room->field_seating_classroom['und'])): ?>
												Max cap.<?php echo $function_room->field_seating_classroom['und'][0]['value'] ?>
											<?php else:  ?>
												N/A
											<?php endif  ?>
										</p>
									</div>
									<div class="col-xs-6 col-sm-4 col-md-2 box box-1">
										<img src="/assets/img/second-scroll-nav-banquet.jpg">
										<h5><?php echo t('Banquet'); ?></h5>
										<hr class="horizontal-divider" />
										<p>
											<?php if (isset($function_room->field_seating_banquet['und'])): ?>
												Max cap.<?php echo $function_room->field_seating_banquet['und'][0]['value'] ?>
											<?php else:  ?>
												N/A
											<?php endif  ?>
										</p>
									</div>
									<div class="col-xs-6 col-sm-4 col-md-2 box box-1">
										<img src="/assets/img/second-scroll-nav-cabaret.jpg">
										<h5><?php echo t('Cabaret'); ?></h5>
										<hr class="horizontal-divider" />
										<p>
											<?php if (isset($function_room->field_seating_cabaret['und'])): ?>
												Max cap.<?php echo $function_room->field_seating_cabaret['und'][0]['value'] ?>
											<?php else:  ?>
												N/A
											<?php endif  ?>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12">
							<div class="content-block">
								<header class="header-block">
									<h1><?php echo $function_room->title ?></h1>
									<hr class="horizontal-divider" />
									<h3><?php echo $function_room->field_function_room_slogan['und'][0]['value'] ?></h3>
									<hr class="horizontal-divider" />
								</header>
								<div class="row text">
									<?php
										$room_description = $function_room->field_function_room_description['und'][0]['value'];
										$room_descrip_split = niquesa_ux_two_column_split($room_description);
									?>
									<div class="col-xs-12 col-sm-6 hero-letter">
										<p><?php echo $room_descrip_split[0] ?></p>
									</div>
									<div class="col-xs-12 col-sm-6">
										<p><?php echo $room_descrip_split[1] ?></p>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 text-center cta">
										<div class="decorated-btn-wrap">
											<a class="a-button black decorated triggerReservationPopup" data-popup-target=".reservation-popup" href="#">
												<?php echo $book_event_label ?>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach ?>
		</div>
		
		<?php echo render($features) ?>
	</div>
</div>
