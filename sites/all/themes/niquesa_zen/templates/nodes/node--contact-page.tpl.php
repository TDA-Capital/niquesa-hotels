<?php
	global $language;
	include 'node.header.inc';
?>

<div id="content_body" class="contact-us-page<?php if (!isset($node->field_hotel['und'])): ?> group-level-page<?php endif ?>">
	<div class="contact-us-module">
		<div class="container">
			<div class="content-section">
				<div class="orange-box">
					<img alt="<?php echo $content['field_section_title']['#items'][0]['value'] ?>" src="<?php echo file_create_url($content['field_contact_image']['#items'][0]['uri']) ?>" class="logo">

					<hr class="horizontal-divider dark">

					<p><?php echo $content['field_section_title']['#items'][0]['value'] ?></p>

					<small><?php echo render($content['body']) ?></small>
				</div>
			</div>
		</div>

		<div
			class="gMap"
			data-location-title="<?php echo $content['field_marker_title']['#items'][0]['value'] ?>"
			data-location-latitude="<?php echo $content['field_marker_latitude']['#items'][0]['value'] ?>"
			data-location-longditude="<?php echo $content['field_marker_longditude']['#items'][0]['value'] ?>"
		></div>
	</div>

	<div class="container content">
		<div class="row">
			<h1 class="text-center"><?php echo strtoupper($node->title) ?></h1>
			<hr class="horizontal-divider dark">
		</div>
		<?php echo render($content['field_contacts']) ?>
	</div>

	<?php if (isset($node->field_hotel['und'])): ?>
		<div class="hidden-region">
            <?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
			<?php echo niquesa_ux_block_render('menu_block', 1) ?>
		</div>
		<?php include 'node.footer.inc' ?>  
	<?php else: ?>
		<div class="hidden-region">
            <?php echo theme('niquesa_header_links', array('nid' => null)) ?>
			<?php echo niquesa_ux_block_render('menu_block', 3) ?>
		</div>
		<?php include 'node.group.footer.inc' ?>
	<?php endif ?>
</div>
