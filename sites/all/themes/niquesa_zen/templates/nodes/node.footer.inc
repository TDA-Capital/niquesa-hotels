<?php echo niquesa_ux_block_render('niquesa_signup', 'niquesa_signup') ?>

<?php
	if (isset($node->field_hotel['und']))
		$hotel_node = node_load($node->field_hotel['und'][0]['target_id']);
	elseif (isset($node->field_hotel_logo) && $node->type == 'hotel')
		$hotel_node = $node;
?>
<footer class="main-footer">
	<div class="container">
		<div class="row footer-print-row">
			<div class="col-xs-12"> <a href="#" class="print-btn" onclick="window.print();return false;"><?php echo t('Print'); ?></a> </div>
		</div>

		<div class="row">
			<div class="col-xs-6 col-sm-2">
				<h4><?php
					if ($hotel_node->field_header_hotel_menu)
						echo $hotel_node->field_header_hotel_menu['und'][0]['value'];
					else
						echo t('Hotel menu');
				?></h4>
				<?php
					$menu = menu_navigation_links('menu-niquesahotels', 1);
					echo theme('links__menu_niquesa_hotels', array('links' => $menu));
				?>
			</div>
			<div class="col-xs-6 col-sm-2">
				<h4><?php
					if ($hotel_node->field_header_more_menu)
						echo $hotel_node->field_header_more_menu['und'][0]['value'];
					else
						echo t('Hotel menu');
				?></h4>
				<?php
					if (isset($hotel_node) ) {
						$menu_block_id = niquesa_more_menu_get_menu_block_id($hotel_node->nid, $language->language);
						
						if ($menu_block_id) {
							$config = menu_block_get_config($menu_block_id);
							$data = menu_tree_block_data($config);
							menu_tree_add_active_path($data);

							echo drupal_render(menu_tree_output($data));
						}
					}
				?>
				<?php if (isset($hotel_node->field_facebook_link['und'][0])): ?>
					<div class="social-link">
						<a href="<?php echo $hotel_node->field_facebook_link['und'][0]['url'] ?>" title="Facebook" class="facebook"></a>
					</div>
				<?php endif ?>
				<?php if (isset($hotel_node->field_twitter_link['und'][0])): ?>
					<div class="social-link">
						<a href="<?php echo $hotel_node->field_twitter_link['und'][0]['url'] ?>" title="Twitter" class="twitter"></a>
					</div>
				<?php endif ?>
				<?php if (isset($hotel_node->field_gplus_link['und'][0])): ?>
					<div class="social-link">
						<a href="<?php echo $hotel_node->field_gplus_link['und'][0]['url'] ?>" title="Google+" class="gplus"></a>
					</div>
				<?php endif ?>
			</div>
			<div class="col-xs-12 col-sm-4">
				<h4><?php
					if ($hotel_node->field_header_hotel_address)
						echo $hotel_node->field_header_hotel_address['und'][0]['value'];
					else
						echo $hotel_node->title;
				?></h4>
				<p>
					<?php
						if (isset($hotel_node->field_hotel_address['und'][0]['value']))
							echo $hotel_node->field_hotel_address['und'][0]['value'];
					?>

					<br>

					<?php
						if (isset($hotel_node->field_hotel_city['und'][0]['value']))
							echo $hotel_node->field_hotel_city['und'][0]['value'];
					?>

					<br>
					
					<?php
						if (isset($hotel_node->field_hotel_phone['und'][0]['value']))
							echo t('Ph.'), ' <a href="tel:', str_replace(' ', '', $hotel_node->field_hotel_phone['und'][0]['value']), '">', $hotel_node->field_hotel_phone['und'][0]['value'], '</a>';

						if (isset($hotel_node->field_hotel_fax['und'][0]['value']))
							echo ' | ', t('Fax'), ' ', $hotel_node->field_hotel_fax['und'][0]['value'];
					?>

					<br>
					 
					<?php
						if (isset($hotel_node->field_hotel_general_manager['und'][0]['value']))
							echo t('General Manager'), ' ', $hotel_node->field_hotel_general_manager['und'][0]['value'];
					?>
				</p>

				<p></p>

				<?php if (isset($hotel_node->field_hotel_reservations_phone['und'][0]['value'])): ?>
					<p><?php
						if ($hotel_node->field_header_reservations_office)
							echo $hotel_node->field_header_reservations_office['und'][0]['value'];
						else
							echo t('Reservations Office');
					?></p>
					<p>
						<?php echo t('Ph.'), ' ', '<a href="tel:', str_replace(' ', '', $hotel_node->field_hotel_reservations_phone['und'][0]['value']), '">', $hotel_node->field_hotel_reservations_phone['und'][0]['value'], '</a>' ?>
						
						<?php if (isset($hotel_node->field_hotel_reservations_fax['und'][0]['value'])): ?>
							| <?php echo t('Fax'), ' ', $hotel_node->field_hotel_reservations_fax['und'][0]['value'] ?>
						<?php endif ?>

						<br>

						<?php
							if (isset($hotel_node->field_hotel_reservations_email['und'][0]['value']))
								echo '<a href="mailto:', $hotel_node->field_hotel_reservations_email['und'][0]['value'], '">', $hotel_node->field_hotel_reservations_email['und'][0]['value'], '</a>';
						?>
					</p>
				<?php endif ?>
			</div>
			<div class="col-xs-12 col-sm-4 right">
				<div class="dropdowns">
					<h4><?php echo t('Niquesa Hotels & Residences') ?></h4>

					<div class="fakeDrop footer-drop">
						<div class="hxd">
							<?php echo t('Select a property') ?>
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
								<?php foreach (menu_navigation_links('menu-explore-niquesa') as $menu_item): ?>
									<li><?php echo l($menu_item['title'], $menu_item['href']) ?></li>
								<?php endforeach ?>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
			if (isset($hotel_node->field_brochure['und'][0])):
				$brochure_url = file_create_url($hotel_node->field_brochure['und'][0]['uri']);
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

<div class="main-footer-bar text-center">
	<?php if (isset($main_footer_bar)): ?>
		<?php echo $main_footer_bar ?>
	<?php endif ?>
</div>

<?php
	if ($ajax_req) {
		$js = drupal_add_js();
		echo drupal_get_js('header', array(
			'settings' => $js['settings']
		));
	}
?>
