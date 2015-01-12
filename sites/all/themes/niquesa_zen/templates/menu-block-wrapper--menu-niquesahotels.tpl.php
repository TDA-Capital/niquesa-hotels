<?php
	$node = menu_get_object();
	if ($node === null && arg(0) == 'node' && ctype_digit(arg(1)))
		$node = node_load(arg(1));

	if (isset($node->field_hotel['und']))
		$hotel_node = node_load($node->field_hotel['und'][0]['target_id']);
	elseif ($node->type == 'hotel')
		$hotel_node = $node; 

	$logo_uri = $hotel_node->field_hotel_logo['und'][0]['uri'];
?>
<nav class="main-nav">
	<div class="container">
		<div class="row">
			<a href="<?php echo url("node/{$hotel_node->nid}") ?>" class="col-xs-4 col-md-2 logo-link">
				<img class="logo" src="<?php echo file_create_url($logo_uri) ?>" alt="NIQUESA Hotels &amp; Resorts">
			</a>
			<div class="col-xs-4 col-md-9 menu-col">
				<?php echo render($content) ?>
			</div>
			<?php if (isset($hotel_node->field_book_now_url['und'][0])): ?>
				<div class="col-xs-4 col-md-1">
					<a
						href="<?php echo $hotel_node->field_book_now_url['und'][0]['url'] ?>"
						title="<?php echo t('Book now') ?>"
						class="a-button orange book-now"
					><?php echo t('Book now') ?></a>
				</div>
			<?php endif ?>
		</div>
	</div>
</nav>
