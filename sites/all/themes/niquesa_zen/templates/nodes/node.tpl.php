<?php include 'node.header.inc' ?>

<div id="content_body" class="terms-page group-level-page">
	<div class="page-wrapper">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-offset-3 col-md-6">
					<div class="page-heading">
						<h1 class="text-center"><?php echo $node->title ?></h1>
						<hr class="horizontal-divider dark">
					</div>
					<?php echo $node->body['und'][0]['safe_value'] ?>
				</div>
			</div>
		</div>
	</div>

	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>
		<?php echo niquesa_ux_block_render('menu_block', 3) ?>
	</div>

	<?php include 'node.group.footer.inc' ?>
</div>
