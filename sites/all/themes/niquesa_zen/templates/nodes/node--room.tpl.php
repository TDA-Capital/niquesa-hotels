<?php $room_type = strtolower($node->field_room_type['und'][0]['value']) ?>
<div id="content_body" class="suites-and-rooms-page">
	<div class="hero-module generic-hero">
		<div class="hero-module-head">
			<div class="hero-module-header has-pager">
				<?php if ($room_type == 'room'): ?>
					<em><?php echo t('Rooms') ?></em>
				<?php else: ?>
					<em><?php echo t('Suites') ?></em>
				<?php endif ?>

				<h1><?php echo $node->title ?></h1>
				<span class="horizontal-divider"></span>

				<h5><a onclick="window.history.back();return false;" href="#" class="pager-back">
					<?php if ($room_type == 'room'): ?>
						<?php echo t('Back to rooms') ?>
					<?php else: ?>
						<?php echo t('Back to suites') ?>
					<?php endif ?>
				</a></h5>

				<?php if ($previous = get_previous_room($node)): ?>
					<?php echo l(t('Previous'), "node/{$previous->nid}", array(
						'attributes' => array(
							'title' => $previous->title,
							'class' => 'pager-btn pager-prev large-light',
						),
					)) ?>
				<?php endif ?>
				<?php if ($next = get_next_room($node)): ?>
					<?php echo l(t('Next'), "node/{$next->nid}", array(
						'attributes' => array(
							'title' => $next->title,
							'class' => 'pager-btn pager-next large-light',
						),
					)) ?>
				<?php endif ?>
			</div>
			<?php $hero_uri = $node->field_room_image['und'][0]['uri'] ?>
			<img class="background-img hide" data-imgsrc="<?php echo file_create_url($hero_uri) ?>" />
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="hero-module-body">
						<div class="hero-module-content-section emphasized">
							<p><?php echo $node->field_room_intro_text['und'][0]['value'] ?></p>
							<a href="<?php echo $node->field_room_book_now_link['und'][0]['url'] ?>" class="a-button black decorated" target="_blank">
								<?php echo $node->field_room_book_now_link['und'][0]['title'] ?>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="suites-rooms-module<?php if (empty($node->field_features['und'][0])): ?> no-features<?php endif ?>">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<div class="img-slideshow ezSlidr">
						<ul class="slides">
							<?php foreach ($node->field_room_slideshow['und'] as $slideshow_image): ?>
								<?php
									$slidearray = array(
										'style_name' => 'slideshow__940x400_',
										'path' => $slideshow_image['uri'],
									);
									$slide = niquesa_ux_image_style($slidearray);
								?>
								<li>
									<img <?php echo drupal_attributes(array(
										'class' => 'lazy-img',
										'data-imgsrc' => $slide['path'],
										'alt' => $slideshow_image['alt'],
										'title' => $slideshow_image['title'],
									)) ?>>
								</li>
							<?php endforeach ?>
						</ul>
					</div>
				</div>
			</div>

			<div class="text">
				<div class="row">
					<div class="col-xs-12 col-sm-6 paragraphs">
						<?php if (isset($node->field_room_left_column_text['und'][0]['value'])): ?>
							<?php echo $node->field_room_left_column_text['und'][0]['value'] ?>
						<?php endif ?>
					</div>
					<?php if (isset($node->field_room_facilities['und'])): ?>
						<?php $facilities = $node->field_room_facilities['und'] ?>
						<?php foreach (array_chunk($facilities, ceil(count($facilities) / 2)) as $chunk): ?>
							<div class="col-xs-12 col-sm-3 lists">
								<ul>
									<?php foreach ($chunk as $value): ?>
										<li><?php echo $value['taxonomy_term']->name ?></li>
									<?php endforeach ?>
								</ul>
							</div>
						<?php endforeach ?>
					<?php endif ?>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 text-center cta">
					<div class="decorated-btn-wrap">
						<a href="<?php echo $node->field_room_book_now_link['und'][0]['url'] ?>" class="a-button black decorated" target="_blank">
							<?php echo $node->field_room_book_now_link['und'][0]['title'] ?>
						</a>
					</div>
				</div>
			</div>

			<?php echo render($content['field_features']) ?>
		</div>
	</div>

	<div class="offers-module">
		<div class="container">
			<div class="row">
				<h2 class="module-heading">Suites &amp; Offers</h2>
				
				<div class="bx_slider_container">
					<ul class="bxslider slides">
						<?php foreach ($promotions as $promotion): ?>
							<li class="offer-item">
								<a href="<?php echo $promotion['url'] ?>">
									<img <?php echo drupal_attributes(array(
										'class' => 'offer-img lazy-img',
										'data-imgsrc' => $promotion['image']['uri'],
										'alt' => $promotion['image']['alt'],
										'title' => $promotion['image']['title'],
									)) ?>>
									<div class="meta slow-trans">
										<h4><?php echo $promotion['title'] ?></h4>
									</div>
								</a>
							</li>
						<?php endforeach ?>
					</ul>
				</div>
				
			</div>
		</div>
	</div>

	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => isset($hotel_nid) ? $hotel_nid : null)) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php ob_start() ?>
		<div class="footer-tab-module menu">
			<div class="container">
				<div class="col-sm-6 col-sm-offset-3">
					<ul class="footer-tab-labels clearfix">
						<li<?php if ($room_type == 'suite'): ?> class="active"<?php endif ?>><?php echo t('Suites') ?></li>
						<li<?php if ($room_type == 'room'): ?> class="active"<?php endif ?>><?php echo t('Rooms') ?></li>
					</ul>

					<div class="footer-tabs">
						<div class="footer-tab">
							<?php echo views_embed_view('rooms', 'block', 'suite', $node->field_hotel['und'][0]['target_id']) ?>
						</div>

						<div class="footer-tab">
							<?php echo views_embed_view('rooms', 'block', 'room', $node->field_hotel['und'][0]['target_id']) ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php $main_footer_bar = ob_get_clean() ?>

	<?php include 'node.footer.inc' ?>
</div>
