<?php
	global $language;
	$query = new EntityFieldQuery();
	$result = $query
		->entityCondition('entity_type', 'node')
		->entityCondition('bundle', 'front_page')
		->propertyCondition('language', $language->language)
		->range(0, 1)
		->execute();
	$nids = array_keys($result['node']);
	$frontpage_node = node_load($nids[0]);

	echo niquesa_ux_block_render('niquesa_signup', 'niquesa_signup');
?>

<footer class="main-footer">
	<div class="container">
		<div class="row footer-print-row">
			<div class="col-xs-12"> <a href="#" class="print-btn" onclick="window.print();return false;"><?php echo t('Print'); ?></a> </div>
		</div>

		<div class="row">
			<div class="col-xs-6 col-sm-2">
                <h4><?php
                    if ($frontpage_node->field_header_group_menu)
                        echo $frontpage_node->field_header_group_menu['und'][0]['value'];
                    else
                        echo t('Group');
                ?></h4>
				<?php
					$menu = menu_navigation_links('menu-group-menu');
					echo theme('links__menu_group_menu', array('links' => $menu));
				?>
			</div>
			<div class="col-xs-6 col-sm-2">
                <h4><?php
                    if ($frontpage_node->field_header_more_menu)
                        echo $frontpage_node->field_header_more_menu['und'][0]['value'];
                    else
                        echo t('More');
                ?></h4>
				<?php
					$menu = menu_navigation_links('menu-group-more-menu');
					echo theme('links__group_more_menu', array('links' => $menu));
				?>
				<?php if (isset($frontpage_node->field_facebook_link['und'][0])): ?>
					<div class="social-link">
						<a href="<?php echo $frontpage_node->field_facebook_link['und'][0]['url'] ?>" title="Facebook" class="facebook"></a>
					</div>
				<?php endif ?>
				<?php if (isset($frontpage_node->field_twitter_link['und'][0])): ?>
					<div class="social-link">
						<a href="<?php echo $frontpage_node->field_twitter_link['und'][0]['url'] ?>" title="Twitter" class="twitter"></a>
					</div>
				<?php endif ?>
				<?php if (isset($frontpage_node->field_gplus_link['und'][0])): ?>
					<div class="social-link">
						<a href="<?php echo $frontpage_node->field_gplus_link['und'][0]['url'] ?>" title="Google+" class="gplus"></a>
					</div>
				<?php endif ?>
			</div>
			<?php
				$config = variable_get('niquesa_config_group_address');
				if ($config):
					$address = $config[$language->language];
			?>
				<div class="col-xs-12 col-sm-4">
                    <h4><?php
                        if ($frontpage_node->field_header_group_address)
                            echo $frontpage_node->field_header_group_address['und'][0]['value'];
                        else
                            echo t('Niquesa Group');
                    ?></h4>
					<p>
						<?php echo $address['address'] ?><br>
						<?php echo $address['city'] ?><br>
						<?php echo t('Ph.'), ' <a href="tel:', str_replace(' ', '', $address['phone']), '">', $address['phone'], '</a>' ?><br>
						<?php echo '<a href="mailto:', $address['email'], '">', $address['email'], '</a>' ?>
					</p>
				</div>
			<?php endif ?>
			
			<div class="col-xs-12 col-sm-4 right"> 
				<div class="dropdowns">
					<h4><?php echo t('Niquesa Hotels & Residences') ?></h4>

					<div class="fakeDrop footer-drop">
						<div class="hxd">
							<?php echo t('Select a property'); ?>
						</div>
						<div class="bxd">
							<ul>
								<?php foreach (niquesa_ux_hotel_list() as $title => $path): ?>
									<li><?php echo l($title, $path) ?></li>
								<?php endforeach ?>
							</ul>
						</div>
					</div>

					<hr/>

					<h4><?php echo t('The World of Niquesa') ?></h4>

					<div class="fakeDrop footer-drop">
						<div class="hxd">
							<?php echo t('Explore') ?>
						</div>
						<div class="bxd">
							<ul>
								<?php foreach (menu_navigation_links('menu-explore-niquesa') as $item): ?>
									<li><?php echo l($item['title'], $item['href']) ?></li>
								<?php endforeach ?>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<?php
			if (isset($frontpage_node->field_brochure['und'][0])):
				$brochure_url = file_create_url($frontpage_node->field_brochure['und'][0]['uri']);
		?>
			<div class="row">
				<div class="col-xs-12 text-center">
					<a href="<?php echo $brochure_url ?>" class="e-brochure"><?php echo t('view our e-brochure') ?></a>
				</div>
			</div>
		<?php endif ?>
	</div>
	
	<div class="footer-links">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<span><?php echo date('Y') ?> Niquesa</span>
					<?php foreach (menu_navigation_links('menu-lower-footer-menu') as $item): ?>
						<span class="divider">/</span>
						<?php echo l($item['title'], $item['href']) ?>
					<?php endforeach ?>
				</div>
			</div>
		</div>
	</div>
</footer>

<div class="main-footer-bar text-center"></div>

<?php
	if ($ajax_req) {
		$js = drupal_add_js();
		echo drupal_get_js('header', array(
			'settings' => $js['settings']
		));
	}
?>
