<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <section class="container">
	<?php if($teaser): ?>
	  <div class="row">
		<div class="col span_3">
		  <?php print render($content['field_image']); ?>
		</div>
		<div class="col span_9">
		  <h3 class="title"><?php print $title; ?></h3>
		  <h4><?php print render($content['field_posted_date']); ?></h4>
		  
		  <?php
			// We hide the comments and links now so that we can render them later.
			hide($content['comments']);
			hide($content['links']);
			print render($content);
		  ?>
		  <a href="<?php print $node_url; ?>" class="btn readmore-btn">READ</a>
		</div>
	  </div>
	  <hr class="divider">
	<?php else: ?>
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

		  <h4><?php print render($content['field_posted_date']); ?></h4>
		  <div class="row">
			<div class="col span_3">
			  <?php print render($content['field_image']); ?>
			</div>
			<div class="col span_9">
			  <?php
				// We hide the comments and links now so that we can render them later.
				hide($content['comments']);
				hide($content['links']);
				print render($content);
			  ?>
			  <a href="#" onclick="window.history.back();return false;" class="btn readmore-btn">BACK</a>
			</div>
		  </div>

		  <?php print render($content['links']); ?>

		  <?php //print render($content['comments']); ?>
	 <?php endif; ?> 
  </section>
</article>
