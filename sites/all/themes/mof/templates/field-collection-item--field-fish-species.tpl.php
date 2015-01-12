<div class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <div class="content row"<?php print $content_attributes; ?>>
    <div class="col span_6">
		<?php print render($content['field_fish_image']); ?>
	</div>
    <div class="col span_6">
		<h3><?php print $content['field_species_name']['0']['#markup']; ?></h3>
	</div>
  </div>
  <hr class="divider" />
</div>
