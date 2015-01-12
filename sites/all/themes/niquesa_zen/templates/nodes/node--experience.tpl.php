<div id="content_body" class="experiences-inner-page">
	<div class="page-heading">
		<a href="#" class="go-back" onclick="window.history.back();return false;"><?php echo t('Back') ?></a>
		<h1 class="text-center">
			<?php if ($previous = get_previous_experience($node)): ?>
				<a href="<?php echo url("node/{$previous->nid}") ?>" class="pager-btn pager-prev" title="<?php echo $previous->title ?>">
					<?php echo t('Previous') ?>
				</a>
			<?php endif ?>

			<?php echo strtoupper($node->title) ?>

			<?php if ($next = get_next_experience($node)): ?>
				<a href="<?php echo url("node/{$next->nid}") ?>" class="pager-btn pager-next" title="<?php echo $next->title ?>">
					<?php echo t('Next') ?>
				</a>
			<?php endif ?>
		</h1>
	</div>

	<div class="experienx-inner">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<?php
						$style_array = array(
							'path' => $node->field_experience_image['und'][0]['uri'],
							'style_name' => 'experience_920x460',
							'width' => 920,
							'height' => 460,
						);

						$styled_experience_image = niquesa_ux_image_style($style_array);
					?>
					<img class="image" src="<?php echo $styled_experience_image['path'] ?>">
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-sm-offset-3 col-sm-6">
					<h1 class="experienx-heading text-center">
						<em><?php echo $node->field_experience_byline['und'][0]['value'] ?></em>
					</h1>
					<p class="emphasized"><?php echo $node->field_experience_description['und'][0]['value'] ?></p>
				</div>
			</div>

			<div class="text">
				<div class="row">
					<div class="col-xs-12 col-sm-6 paragraphs">
						<div class="row">
							<div class="col-xs-11 hero-letter">
								<?php echo $node->field_experience_descrip_left['und'][0]['value'] ?>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 lists">
						<div class="row">
							<div class="col-xs-offset-1 col-xs-11">
								<p><?php echo t('Experience Includes:') ?></p>
								<ul>
									<?php foreach ($node->field_experience_includes["und"] as $include): ?>
										<li><?php echo $include['value'] ?></li>
									<?php endforeach ?>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 text-center cta">
					<a href="<?php echo $node->field_experience_book_now_link['und'][0]['url'] ?>" class="a-button black decorated" target="_blank">
						<?php echo $node->field_experience_book_now_link['und'][0]['title'] ?>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
		<?php echo niquesa_ux_block_render("menu_block", 1) ?>
	</div>

	<?php include 'node.footer.inc' ?>
</div>
