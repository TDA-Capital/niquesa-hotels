<?php
	# Load the destinations landing page node.
	$node = node_load($view->args[0]);
	require dirname(__FILE__) . '/../nodes/node.header.inc';
?>
<div id="content_body" class="destinations-page">
	<div id="gtMap_module">
		<?php echo $rows ?>
	</div>

	<div class="hidden-region">
        <?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
		<?php echo niquesa_ux_block_render('menu_block', 1) ?>
	</div>

	<?php require dirname(__FILE__) . '/../nodes/node.footer.inc' ?>
</div>
