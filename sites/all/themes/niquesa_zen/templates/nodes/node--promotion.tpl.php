<div id="content_body" class="promotions-inner-page">
	<div class="page-heading">
		<a href="#" class="go-back" onclick="window.history.back();return false;"><?php echo t('Back') ?></a>
	</div>

	<div class="container">
		<div class="promotions-inner">
			<div class="orange-box">
				<h3 class="headline"><em>From € <?php echo $node->field_promotion_price['und'][0]['value'] ?></em></h3>

				<?php
					$style_array = array(
						'path' => $node->field_promotion_image['und'][0]['uri'],
						'style_name' => 'promotion_540x250',
						'width' => 540,
						'height' => 250,
					);

					$styled_promotion_image = niquesa_ux_image_style($style_array);
				?>	

				<img class="image" src="<?php echo $styled_promotion_image['path'] ?>">

				<div class="body">
					<div class="row">
						<h1 class="experienx-heading text-center"><em><?php echo $node->title ?></em></h1>
						<hr class="horizontal-divider orange">
						<p class="emphasized"><?php echo $node->field_promotion_italic_text['und'][0]['value'] ?></p>
					</div>

					<div class="row text">
						<ul>
							<?php foreach ($node->field_promotion_description['und'] as $description): ?>
								<li><?php echo $description['value'] ?></li>
							<?php endforeach ?>
						</ul>
					</div>
				</div>

				<?php if ($prev = get_previous_promotion($node)): ?>
					<a href="<?php echo url("node/{$prev->nid}") ?>" class="pager-btn pager-prev" title="<?php echo t('Previous page') ?>"><?php echo t('Back') ?></a>
				<?php endif ?>
				<?php if ($next = get_next_promotion($node)): ?>
					<a href="<?php echo url("node/{$next->nid}") ?>" class="pager-btn pager-next" title="<?php echo t('Next page') ?>"><?php echo t('Next') ?></a>
				<?php endif ?>

				<div class="cta">
					<div class="mas-uf">
						<a href="<?php echo $node->field_promotion_book_now_link['und'][0]['url'] ?>" class="a-button black" target="_blank">
							<?php echo $node->field_promotion_book_now_link['und'][0]['title'] ?>
						</a>
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
