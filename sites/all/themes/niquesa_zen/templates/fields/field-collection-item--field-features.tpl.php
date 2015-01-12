<div class="a-box">
	<div class="circle-mask">
		<img <?php echo drupal_attributes(array(
			'class' => 'slow-trans',
			'src' => file_create_url($content['field_feature_highlights_image'][0]['#item']['uri']),
			'alt' => $content['field_feature_highlights_image'][0]['#item']['alt'],
			'title' => $content['field_feature_highlights_image'][0]['#item']['title'],
		)) ?>>
	</div>
	<div class="horizontal-divider"></div>
	<?php echo drupal_render($content['field_title']) ?>
</div>
