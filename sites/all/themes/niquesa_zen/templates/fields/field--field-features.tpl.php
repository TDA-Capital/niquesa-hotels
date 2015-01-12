<div class="feature-highlights">
	<div class="row">
		<div class="col-xs-12 text-center">
			<h3><?php echo t('Feature Highlights') ?></h3>
			<hr class="horizontal-divider dark">
		</div>
	</div>
	<div class="row">
		<?php $classes = array('col-xs-offset-3', 'text-center', '') ?>
		<?php foreach ($items as $i => $item): ?>
			<div class="col-xs-2 <?php echo $classes[$i] ?>">
				<?php echo drupal_render($item) ?>
			</div>
		<?php endforeach ?>
	</div>
</div>
