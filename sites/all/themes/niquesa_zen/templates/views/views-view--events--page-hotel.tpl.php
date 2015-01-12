<?php
	# Load the destinations landing page node.
	$node = node_load($view->args[0]);
	require dirname(__FILE__) . '/../nodes/node.header.inc';
?>
<div id="content_body" class="events-page">
	<div class="container">
		<div class="page-heading">
			<h1 class="text-center"><?php echo t('Local events') ?></h1>
			<hr class="horizontal-divider dark">

			<div class="row">
				<div class="col-xs-12 col-md-offset-3 col-md-6 emphasized">
					<p><?php echo t('To take a luxurious experience further, enjoy stays at our landmark hotels at special rates and with added little extras throughout the seasons.') ?></p>
				</div>
			</div>
		</div>

		<?php echo $rows ?>
	</div>

	<div class="hidden-region">
        <?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php require dirname(__FILE__) . '/../nodes/node.footer.inc' ?>
</div>
