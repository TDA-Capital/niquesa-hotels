<h4><?php echo drupal_render($content['field_title']) ?></h4>
<p>
	<?php echo drupal_render($content['field_phone']) ?><br>
	<?php $email = drupal_render($content['field_email']) ?>
	<a href="mailto:<?php echo $email ?>"><?php echo $email ?></a>
</p>
