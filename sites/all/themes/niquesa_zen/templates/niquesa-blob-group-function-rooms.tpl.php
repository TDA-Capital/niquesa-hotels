<?php global $language ?>
<div class="function-room-module menu-scroll" data-scrollmenu-link-text="<?php echo t('Our Venues') ?>">
	<div class="container">
		<div class="row header">
			<div class="col-xs-12">
				<h2 class="module-heading"><?php echo t('Our Venues') ?></h2>
				<hr class="horizontal-divider" />
			</div>
		</div>

		<div class="function-room-module-content container">
			<div class="function-room-tab" data-function-room-tabindex="1">
				<?php echo render($slider_images) ?>

				<div class="row">
					<div class="col-xs-12 text-center cta hidden-xs">
						<?php _niquesa_util_log($hotels); ?>
						<table class="business-table">
							<thead>
								<tr>
									<th><h5 class="subheading-text">Destination</h5></th>
									<th><h5 class="subheading-text">Hotel</h5></th>
									<th><h5 class="subheading-text">Function Rooms</h5></th>
									<th><h5 class="subheading-text">Max Capacity</h5></th>
									<th><h5 class="subheading-text"></h5></th>
								</tr>
							</thead>
							<tbody>
								<?php foreach ($hotels as $hotel): ?>
									<tr>
										<td><?php echo $hotel->city ?></td>
										<td><?php echo $hotel->name ?></td>
										<td><?php echo $hotel->rooms ?></td>
										<td><?php echo $hotel->capacity ?></td>
										<td>
											<a href="<?php echo url("node/{$hotel->nid}"), $path ?>" class="a-button black"><?php echo t('MORE INFO') ?></a></td>
									</tr>
								<?php endforeach ?>
							</tbody>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 text-center cta">
						<div class="decorated-btn-wrap">
							<a class="a-button black decorated triggerReservationPopup" data-popup-target=".reservation-popup" href="#">
								<?php echo $book_event_label ?>
							</a>
							<div class="reservation-popup reservation-form">
								<?php echo render($webform) ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<?php echo render($features) ?>
	</div>
</div>
