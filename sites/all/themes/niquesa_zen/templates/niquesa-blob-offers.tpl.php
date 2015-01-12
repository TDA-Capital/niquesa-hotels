<div class="offers-module">
	<div class="container">
		<div class="row">
			<h2 class="module-heading"><?php echo t('Experience highlights') ?></h2>
			<div class="row scrollable-nav-container">
				<a class="scrollable-prev"><span>&lt;</span></a>
				<a class="scrollable-next active"><span>&gt;</span></a>

				<ul class="scrollable-nav">
				</ul>
			</div>

			<div class="ezSlidr">
				<ul class="slides clearfix">
					<?php foreach ($offers_nodes as $offer_node): ?>
						<?php
							$offer_image_uri = $offer_node->field_offer_image['und'][0]['uri'];
							$offer_image_path = file_create_url($offer_image_uri);
							$offer_url = url("node/{$offer_node->nid}");
						?>
						<li class="offer-item">
							<a href="<?php echo $offer_url ?>">
								<img class="offer-img lazy-img" data-imgsrc="<?php echo $offer_image_path ?>">
								<div class="meta slow-trans">
									<h4><?php echo $offer_node->title ?></h4>
									<span class="horizontal-divider"></span>
									<p><?php echo $offer_node->field_offer_number_of_nights['und'][0]['value'] ?> Nights</p>
								</div>
							</a>
						</li>
					<?php endforeach ?>
				</ul>
			</div>
		</div>
	</div>
</div>
