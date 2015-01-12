<?php
	include 'node.header.inc';
	global $language;

	if (isset($node->field_hotel['und']))
		$hotel_nid = $node->field_hotel['und'][0]['target_id'];

	$query = new EntityFieldQuery();

	$query->entityCondition('entity_type', 'node')
		->entityCondition('bundle', 'experience')
		->propertyCondition('status', 1)
		->propertyCondition('language', $language->language)
		->fieldCondition('field_experience_image', 'fid', '', '!=')
		->propertyOrderBy('created', 'DESC');

	if (isset($hotel_nid))
		$query->fieldCondition('field_hotel', 'target_id', $hotel_nid)
			->fieldCondition('field_featured_experience', 'value', 'Featured')
			->range(0, 3);
	else
		$query->fieldCondition('field_featured_experience_group', 'value', 'Featured')
			->range(0, 6);

	$result = $query->execute();
	$featured_experience_nodes = node_load_multiple(array_keys($result['node']), '');

	if (!isset($node->field_hotel['und']))
		$extra = ' group-level-page';
	else
		$extra = '';
?>
	
<div id="content_body" class="experiences-page<?php echo $extra ?>">
	<div class="hero-module hero-slider-module">
		<div class="hero-module-head">
			<div class="img-slideshow ezSlidr">
				<ul class="slides">
				<?php
					foreach ($featured_experience_nodes as $featured_experience):
						$featured_experience_url = url("node/{$featured_experience->nid}");

						if (isset($featured_experience->field_experience_nights['und']))
							$min_string = $featured_experience->field_experience_nights['und'][0]['value'] . ' nights min. stay';

						if (isset($featured_experience->field_minimum_number_of_people['und']))
							$min_string = $featured_experience->field_minimum_number_of_people['und'][0]['value'] . ' people min.';

						$image_path = file_create_url($featured_experience->field_experience_image['und'][0]['uri']);
					?>
						<li data-slide-heading="<?php echo $featured_experience->title ?>"
							data-slide-subheading="<?php echo $min_string ?>"
							data-slide-link="<?php echo $featured_experience_url ?>">
							<img <?php echo drupal_attributes(array(
								'class' => 'lazy-img',
								'data-imgsrc' => $image_path,
								'alt' => $featured_experience->field_experience_image['und'][0]['alt'],
								'title' => $featured_experience->field_experience_image['und'][0]['title'],
							)) ?>>
						</li>
					<?php endforeach ?>
				</ul>
			</div>
			
			<div class="hero-module-header">
				<h3 class="slide-heading"></h3>
				<hr class="horizontal-divider"/>
				<h5 class="slide-sub-heading"></h5>
				<a class="a-button" href="#">
					<?php echo t('Book Now') ?>
				</a>
			</div>
			
			<div class="view-all text-center">
				<a class="a-button black decorated orange-decorated arrow-down scroll-to"><?php echo t('VIEW ALL Experiences') ?></a>
			</div>
		</div>
	</div>

	<div id="personalizeFilter" class="hidden-xs">
		<div class="container controls">
			<em class="description xs-hidden">
				<?php echo t("Find out what's here for you, sort highlights by:") ?>
			</em>

			<?php
				$vocab = taxonomy_vocabulary_machine_name_load("traveller");
				$vocab_name = i18n_taxonomy_vocabulary_name($vocab, $language->language);
			?>

			<button class="dd-btn traveller-type"><?php echo $vocab_name;?></button>

			<em><?php echo t('or') ?></em>

			<?php
				$vocab = taxonomy_vocabulary_machine_name_load("interest");
				$vocab_name = i18n_taxonomy_vocabulary_name($vocab, $language->language);
			?>

			<button class="dd-btn interest-type"><?php echo $vocab_name ?></button>
			<button class="clear-btn"><?php echo t('CLEAR FILTER') ?></button>
		</div>

		<ul class="filter-set traveller">
			<?php foreach (niquesa_ux_taxonomyterms('traveller') as $class => $name): ?>
				<li class="<?php echo $class ?>">
					<button><?php echo $name ?></button>
				</li>
			<?php endforeach ?>
		</ul>

		<ul class="filter-set interest">
			<?php foreach (niquesa_ux_taxonomyterms('interest') as $class => $name): ?>
				<li class="<?php echo $class ?>">
					<button><?php echo $name ?></button>
				</li>
			<?php endforeach ?>
		</ul>
	</div>

	<div class="container">
		<div class="page-heading">
			<h1 class="text-center"><?php echo $node->title ?></h1>
			<hr class="horizontal-divider dark">
		</div>

		<?php
			// grab all experiences associated with a hotel
			$query = new EntityFieldQuery();

			$query->entityCondition('entity_type', 'node')
				->entityCondition('bundle', array('experience'))
				->propertyCondition('status', 1)
				->propertyCondition('language', $language->language)
				->propertyOrderBy('created', 'DESC');

			if (isset($hotel_nid))
				$query->fieldCondition('field_hotel', 'target_id', $hotel_nid, '=');
			
			$result = $query->execute();
			$experience_nodes = node_load_multiple(array_keys($result['node']), '');

			foreach ($experience_nodes as $experience_node ) {
				$image_path = file_create_url($experience_node->field_experience_image['und'][0]['uri']);
			
				if (isset($experience_node->field_experience_nights['und']))
					$min_string = $featured_experience->field_experience_nights['und'][0]['value'] . ' nights min. stay';
				
				if (isset($experience_node->field_minimum_number_of_people['und']))
					$min_string = $featured_experience->field_minimum_number_of_people['und'][0]['value'] . ' people min.';
				
				$experience_descrip = $experience_node->field_experience_description['und'][0]['value'];

				$taxonomy_interest_tags = '';

				if( isset($experience_node->field_interest_tags['und']))
					foreach ($experience_node->field_interest_tags['und'] as $key => $value) {
						$tax_term = taxonomy_term_load($value['tid']);

						$altered_tax_name = strtolower($tax_term->name);
						$altered_tax_name = str_replace(' ', '-', $altered_tax_name);
						$altered_tax_name = str_replace('&', 'and', $altered_tax_name);

						$taxonomy_interest_tags .= $altered_tax_name . ' ';
					}

				$taxonomy_traveller_tags = '';

				if( isset($experience_node->field_traveller_tags['und']))
					foreach ($experience_node->field_traveller_tags['und'] as $key => $value) {
						$tax_term = taxonomy_term_load($value['tid']);
						$altered_tax_name = strtolower($tax_term->name);
						$altered_tax_name = str_replace(' ', '-', $altered_tax_name);
						$altered_tax_name = str_replace('&', 'and', $altered_tax_name);
						$taxonomy_traveller_tags .= $altered_tax_name . ' ';
					}

				$experience_url = url("node/{$experience_node->nid}");
		?>

			<div class="row experienx rfltered"
				data-traveller-tags="<?php echo $taxonomy_traveller_tags ?>"
				data-interest-tags="<?php echo $taxonomy_interest_tags ?>">
		
				<div class="col-sm-6 img-half">
					<div class="img">
						<img <?php echo drupal_attributes(array(
							'class' => 'lazy-img hide',
							'data-imgsrc' => $image_path,
							'alt' => $experience_node->field_experience_image['und'][0]['alt'],
							'title' => $experience_node->field_experience_image['und'][0]['title'],
						)) ?>>
					</div>
				</div>

				<div class="col-sm-6 text-half">
					<div class="orange-box">
						<h3 class="heading"><?php echo $experience_node->title ?></h3>
						<hr class="horizontal-divider dark">
						<h5 class="sub-heading"><?php $min_string; ?></h5>

						<p><?php echo $experience_descrip ?></p>

						<div class="text-center a-button-wrapper">
							<a class="a-button black decorated orange-decorated" href="<?php echo $experience_url ?>">
								<?php echo t('Read More') ?>
							</a>
						</div>

						<?php $url = url("node/{$experience_node->nid}", array('absolute' => true)) ?>

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
							<li class="pinterest">
								<a href="http://pinterest.com/pin/create/button/?<?php echo http_build_query(array(
									'url' => $url,
									'media' => url($image_path, array('absolute' => true)),
									'description' => $experience_node->title
								), '', '&amp;') ?>"></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		<?php } ?>
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
