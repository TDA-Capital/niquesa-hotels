<div class="row experienx">
	<div class="col-sm-6 img-half">
		<div class="img">
			<img <?php echo drupal_attributes(array(
				'class' => 'lazy-img hide',
				'data-imgsrc' => file_create_url($row->field_field_event_image[0]['raw']['uri']),
				'alt' => $row->field_field_event_image[0]['raw']['alt'],
				'title' => $row->field_field_event_image[0]['raw']['title'],
			)) ?>>
		</div>
	</div>

	<div class="col-sm-6 text-half">
		<div class="orange-box">
			<h3 class="heading">
				<?php echo $fields['title']->content ?>
			</h3>

			<hr class="horizontal-divider dark">

			<h5 class="sub-heading">
				<?php echo format_date($row->field_field_event_date[0]['raw']['value'], 'event_date') ?>
				<?php if (isset($row->field_field_event_date[0]['raw']['value2'])): ?>
					- <?php echo format_date($row->field_field_event_date[0]['raw']['value2'], 'event_date') ?>
				<?php endif ?>
			</h5>

			<p><?php echo $fields['field_event_description']->content ?></p>

			<div class="text-center"><a class="a-button black decorated orange-decorated" href="<?php echo url("node/{$fields['nid']->content}") ?>"><?php echo t('Read More') ?></a></div>

			<?php if (!empty($fields['field_event_twitter_link']->content) ||
					!empty($fields['field_event_facebook_link']->content) ||
					!empty($fields['field_pinterest_link']->content)): ?>
				<ul class="social-list">
					<?php if (!empty($fields['field_event_twitter_link']->content)): ?>
						<li class="twitter"><a href="<?php echo $fields['field_event_twitter_link']->content ?>"></a></li>
					<?php endif ?>
					<?php if (!empty($fields['field_event_facebook_link']->content)): ?>
						<li class="facebook"><a href="<?php echo $fields['field_event_facebook_link']->content ?>"></a></li>
					<?php endif ?>
					<?php if (!empty($fields['field_pinterest_link']->content)): ?>
						<li class="pinterest"><a href="<?php echo $fields['field_pinterest_link']->content ?>"></a></li>
					<?php endif ?>
				</ul>
			<?php endif ?>
		</div>
	</div>
</div>
