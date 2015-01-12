<?php
	include 'node.header.inc';
	global $language;

	if (isset($node->field_hotel['und']))
		$hotel_nid = $node->field_hotel['und'][0]['target_id'];
?>

<div id="content_body" class="event-inner-page">
	<div class="page-heading">
		<a href="#" class="go-back" onclick="window.history.back();return false;"><?php echo t('Back') ?></a>
	</div>
	
	<div class="container">
		<div class="promotions-inner">
			<div class="orange-box">
				<h5 class="headline">
					<span>
						<?php echo format_date($node->field_event_date['und'][0]['value'], 'event_date') ?>
						<?php if ($node->field_event_date['und'][0]['value2']): ?>
							- <?php echo format_date($node->field_event_date['und'][0]['value2'], 'event_date') ?>
						<?php endif ?>
					</span>
				</h5>
				<?php
					$style_array = array(
						'path' => $node->field_event_image['und'][0]['uri'],
						'style_name' => 'event_540x250',
						'width' => 540,
						'height' => 250,
					);
					$styled_event_image = niquesa_ux_image_style($style_array);
				?>

				<img <?php echo drupal_attributes(array(
					'class' => 'image',
					'src' => $styled_event_image['path'],
					'alt' => $node->field_event_image['und'][0]['alt'],
					'title' => $node->field_event_image['und'][0]['title'],
				)) ?>>
				<div class="body">
					<div class="row">
						<h3 class="experienx-heading text-center">
							<em><?php echo $node->title ?></em>
						</h3>
						<hr class="horizontal-divider orange">
						<?php echo $node->field_event_description['und'][0]['safe_value'] ?>
					</div>
				</div>

				<?php if ($previous = get_previous_event($node)): ?>
					<a href="<?php echo url("node/{$previous->nid}") ?>" class="pager-btn pager-prev" title="<?php echo $previous->title ?>">
						<?php echo t('Previous') ?>
					</a>
				<?php endif ?>

				<?php if ($next = get_next_event($node)): ?>
					<a href="<?php echo url("node/{$next->nid}") ?>" class="pager-btn pager-next" title="<?php echo $next->title ?>">
						<?php echo t('Next') ?>
					</a>
				<?php endif ?>
			</div>
		</div>
	</div>

	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => isset($hotel_nid) ? $hotel_nid : null)) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php include 'node.footer.inc' ?>
</div>
