<?php
/**
 * @file
 * Returns the HTML for a node.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728164
 */
?>
<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <section class="container light-color">
	  <?php //if ($title_prefix || $title_suffix || $display_submitted || $unpublished || !$page && $title): ?>
		<header>
		  <?php //print render($title_prefix); ?>
		  <?php if ($title): ?>
			<h2<?php print $title_attributes; ?>><?php print $title; ?></h2>
		  <?php endif; ?>
		  <?php //print render($title_suffix); ?>

		  <?php if (false&&$display_submitted): ?>
			<p class="submitted">
			  <?php print $user_picture; ?>
			  <?php print $submitted; ?>
			</p>
		  <?php endif; ?>

		  <?php if ($unpublished): ?>
			<mark class="unpublished"><?php print t('Unpublished'); ?></mark>
		  <?php endif; ?>
		</header>
	  <?php //endif; ?>
	  
	  <?php
		hide($content['comments']);
		hide($content['links']);
		hide($content['field_tutorial_section']);
		print render($content);
	  ?>

		<div class="tutorial row">
			<div class="col span_7 phonesection">
				<div class="iphone">
					<div class="app-screens">
						<?php 
							$wrapper = entity_metadata_wrapper('node', $node); 
							$tuts = array(); 
							for($i=0; $i < count($content['field_tutorial_section']['#items']); $i++){
								$w = $wrapper->field_tutorial_section[$i];
								$tuts[$i]['field_tutorial_image'] = $w->field_tutorial_image->value();
								$tuts[$i]['field_tutorial_header'] = $w->field_tutorial_header->value();
								$tuts[$i]['field_tutorial_text'] = $w->field_tutorial_text->value();
								print '<img data-imgsrc="'.file_create_url($tuts[$i]['field_tutorial_image']['uri']).'" data-tut-stage="stage-'.$i.'" class="hide"/>'; 
							}
						?>
					</div>
				</div>
			</div>
			<div class="col span_5">
				<?php for($i=0; $i < count($tuts); $i++){ ?>
					<div class="app_desc tut-stage" data-tut-stage="stage-<?php print $i; ?>">
						<h2><?php print $tuts[$i]['field_tutorial_header']; ?></h2>
						<?php print $tuts[$i]['field_tutorial_text']['value']; ?>
					</div>
				<?php } ?>
			</div>
		</div>

	  <?php print render($content['links']); ?>

	  <?php print render($content['comments']); ?>
  </section>
  
</article>
