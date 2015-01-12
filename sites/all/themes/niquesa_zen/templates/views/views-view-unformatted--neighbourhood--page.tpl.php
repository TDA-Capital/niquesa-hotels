<?php
	$data = array();
	foreach ($view->result as $row) {
		$image_uri = $row->field_field_destination_image[0]['rendered']['#item']['uri'];
		foreach ($row->field_field_traveller_tags as $tag)
			$traveller_tags[] = str_replace(array(' ', '&'), array('-', 'and'), strtolower($tag['raw']['taxonomy_term']->name));
		foreach ($row->field_field_interest_tags as $tag)
			$interest_tags[] = str_replace(array(' ', '&'), array('-', 'and'), strtolower($tag['raw']['taxonomy_term']->name));
		$data["destination-{$row->nid}"] = array(
			'title' => $row->node_title,
			'subTitle' => '',  #Unused at the moment
			'description' => '<div class="emphasized">' . $row->field_field_destination_intro_italic[0]['rendered']['#markup'] . '</div>
				<hr class="horizontal-divider black">' .
				$row->field_field_destination_description[0]['rendered']['#markup'],
			'img' => image_style_url('destination_details', $image_uri),
			'imgThumb' => image_style_url('destination_thumbnail', $image_uri),
			'travellerTags' => implode(' ', $traveller_tags),
			'interestTags' => implode(' ', $interest_tags),
			'address' => '',  # Unused at the moment
			'lat' => (float)$row->field_field_location[0]['raw']['lat'],
			'lng' => (float)$row->field_field_location[0]['raw']['lng'],
			'walkTime' => 0,  # Unused at the moment
			'cycleTime' => 0,  # Unused at the moment
			'distanceToDestination' => 0,  # Unused at the moment
			'poi' => array(),
		);
	}
?>
<script id="map_json_formatted">
	window.gtMapJSON = <?php echo json_encode($data) ?>;
</script>

<div id="personalizeFilter" class="hidden-xs">
	<div class="container controls">
		<em class="description xs-hidden"><?php print t("Find out what's here for you, sort highlights by:"); ?></em>

		<?php
			// return the localised name of the "traveller" vocabulary
			$vocab = taxonomy_vocabulary_machine_name_load('traveller');
			$vocab_name = i18n_taxonomy_vocabulary_name($vocab, $language->language);
		?>

		<button class="dd-btn traveller-type"><?php echo $vocab_name ?></button>

		<em><?php t('or') ?></em>

		<?php
			// return the the localised name of the "interest" vocabulary
			$vocab = taxonomy_vocabulary_machine_name_load('interest');
			$vocab_name = i18n_taxonomy_vocabulary_name($vocab, $language->language);
		?>

		<button class="dd-btn interest-type"><?php echo $vocab_name ?></button>

		<button class="clear-btn"><?php print t('CLEAR FILTER'); ?></button>
	</div>

	<ul class="filter-set traveller">
		<?php foreach (niquesa_ux_taxonomyterms('traveller') as $term_class => $term_name): ?>
			<li class="<?php echo $term_class ?>">
				<button><?php echo $term_name ?></button>
			</li>
		<?php endforeach ?>
	</ul>

	<ul class="filter-set interest">
		<?php foreach (niquesa_ux_taxonomyterms('interest') as $term_class => $term_name): ?>
			<li class="<?php echo $term_class ?>">
				<button><?php echo $term_name ?></button>
			</li>
		<?php endforeach ?>
	</ul>
</div>

<a href="#" class="close-btn" onclick="window.history.back();return false;"><?php echo t('Close') ?></a>

<?php
	$destination_page = node_load($view->args[0]);
	$hotel = node_load($destination_page->field_hotel['und'][0]['target_id']);
?>
<div <?php echo drupal_attributes(array(
	'id' => 'gtMap_canvas',
	'class' => 'gMap',
	'data-latitude' => $hotel->field_location['und'][0]['lat'],
	'data-longitude' => $hotel->field_location['und'][0]['lng'],
	'data-title' => $hotel->title
)) ?>></div>

<div id="GT_overlay">
	<div class="gt-detailed">
		<div class="gt-img row">

		</div>
		<div class="row gt-pagination">
			<button class="prev"><h5><?php echo t('Previous') ?></h5></button>
			<h5 class="status"></h5>
			<button class="nxt"><h5><?php echo t('Next') ?></h5></button>
		</div>
		<div class="row gt-heading">
			<h3 class="gt-title"> </h3>
		</div>
		<div class="row gt-description">

		</div>

		<button class="gt-close" title="close"><?php echo t('Back to map') ?></button>
	</div>
</div>
