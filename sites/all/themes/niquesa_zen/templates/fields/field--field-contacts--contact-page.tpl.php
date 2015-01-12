<div class="contacts">
	<?php foreach (array_chunk($items, 3) as $chunk): ?>
		<div class="row">
			<?php foreach ($chunk as $item): ?>
				<div class="col-md-4">
					<div class="contact">
						<?php echo drupal_render($item) ?>
					</div>
				</div>
			<?php endforeach ?>
		</div>
	<?php endforeach ?>
</div>
