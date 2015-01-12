<?php
/**
 * @file
 * Returns the HTML for a block.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728246
 */
?>
<div class="information">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<p>
					<span><?php echo t('SIGN UP') ?></span>
					&amp; <?php echo htmlspecialchars(t('keep up to date with our latest specials, news & promotions.')) ?>
				</p>
			</div>
			<div class="col-xs-12">
				<?php print $content; ?>
			</div>
		</div>
	</div>
</div>
