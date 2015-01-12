<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <section class="container">
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

	<div class="row">
		<div class="col span_6 info-block">
			<?php
				print $content['body']['0']['#markup'];
				hide($content['body']);
			?>
		</div>
		<div class="col span_6">
			<h3>Feedback</h3>
			<?php
				hide($content['comments']);
				hide($content['links']);
				print render($content);
			?>
		</div>
	</div>
  </section>
  
</article>
