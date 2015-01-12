<?php
	global $language;
	include 'node.header.inc';

	// grab all promotions, sort by creation date desc, so that the most recent is at the top

	$query = new EntityFieldQuery();

	$query->entityCondition('entity_type', 'node')
		->entityCondition('bundle', 'promotion')
		->propertyCondition('status', 1)
		->propertyCondition('language', $language->language)
		->propertyOrderBy('created', 'DESC');
		
	$result = $query->execute();
	$promotions = node_load_multiple(array_keys($result['node']), '');
?>

<div id="content_body" class="suites-and-rooms-page group-level-page">
	<div class="container">
		<div class="page-heading">
			<h1 class="text-center"><?php echo $node->title ?></h1>
			<hr class="horizontal-divider dark">
		
			<div class="row">
				<div class="col-xs-12 col-md-offset-3 col-md-6 emphasized">
					<?php echo $node->field_promotions_lp_intro_text['und'][0]['value'] ?>
				</div>
			</div>
		</div>
		
		<div class="row promotions-list">
			<?php foreach ($promotions as $promotion_node): ?>
				<div class="col-md-6">
					<div class="promotions-teaser">
						<div class="orange-box">
							<h3><?php echo $promotion_node->title ?></h3>
							<span class="horizontal-divider dark"></span>
							<h4 class="orange-colour"><?php echo t('From €'), $promotion_node->field_promotion_price['und'][0]['value'] ?></h4>
							
							<?php $promotion_url = url("node/{$promotion_node->nid}") ?>
							<div class="text-center">
								<a class="a-button black decorated" href="<?php echo url("node/{$promotion_node->nid}") ?>">
									<?php echo t('Read More') ?>
								</a>
							</div>

							<?php $url = url("node/{$promotion_node->nid}", array('absolute' => true)) ?>

							<ul class="social-list">
								<li class="twitter">
									<a href="https://twitter.com/share?<?php echo http_build_query(array(
										'url' => $url,
									), '', '&amp;') ?>"></a>
								</li>
								<li class="facebook">
									<a href="https://facebook.com/sharer/sharer.php?<?php echo http_build_query(array(
										'u' => $url,
									), '', '&amp;') ?>"></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			<?php endforeach ?>
		</div>
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
