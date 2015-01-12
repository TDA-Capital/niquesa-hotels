<div class="gallery">
	<div class="slidr <?php print $classes; ?> clearfix"<?php print $attributes; ?>>
		<?php foreach ($items as $delta => $item): ?>
			<div class="gallery-panel" <?php print $content_attributes; ?>><img data-imgsrc="<?php print file_create_url($item['#item']['uri']); ?>" class="hide gallery-img <?php print $delta % 2 ? 'odd' : 'even'; ?>" /></div>
		<?php endforeach; ?>
	</div>
	<div class="mask"></div>
</div>