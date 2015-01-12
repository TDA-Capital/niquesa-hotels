<nav class="brand-nav">
	
			<ul class="menu">
								<?php foreach (menu_navigation_links('menu-group-menu') as $menu_item): ?>
									<li><a href="<?php echo drupal_get_path_alias($menu_item['href']) ?>">
										<?php echo $menu_item['title'];?>
									</a></li>
								<?php endforeach ?>
								<li class="group-book-now"><a
						href="https://gc.synxis.com/rez.aspx?Chain=16322&template=GCF&locale=en-US"
						target="_blank"
						title="<?php echo t('Book now') ?>"
						class="a-button orange book-now"
					><?php echo t('Book now') ?></a></li>
							</ul>

</nav>
