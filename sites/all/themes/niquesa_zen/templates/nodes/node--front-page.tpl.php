<?php include 'node.header.inc' ?>

<div id="content_body" class="group-home-page group-level-page">
	<div class="hero-module group-home-landing-hero">
		<div class="scroll-jacked">
				<?php					
					for($ind=0; $ind<6; $ind++){
				?>
				<div class="slide active">
				
				<?php $background_image = $node->field_background_image['und'][$ind]['uri'] ?>
					
						<img class="background-img hide"  data-imgsrc="<?php echo file_create_url($background_image) ?>"/>
					
				</div>
				<?php };?>
			<div class="hero-module-head">
			  <div class="center-content text-block">
				<div class="center-content-td">
					<div class="hero-module-header destinationSelector">
						<div class="hero-slide landing-slide active">
							<div class="hero-copy">
								<h1><?php echo $node->title ?></h1>
								<span class="horizontal-divider"></span>
								<h4><?php echo $content['field_fp_italic_intro']['#items'][0]['value'] ?></h4>
								<p><?php echo $content['field_fp_text_paragraph']['#items'][0]['value'] ?></p>
							</div>
							<button class="hero-button destinations-btn"><?php echo t('Select a Destination') ?></button>
							<button class="hero-button hotels-btn"><?php echo t('Select a Hotel') ?></button>
						</div>
						<div class="hero-slide destinations-slide">
							<button class="hero-button close-button"><?php echo t('Close') ?></button>
							<div class="scroller">
								<ul class="hero-list destinations-list">
									<?php foreach (array_keys($hotel) as $city): ?>
										<li>
											<a href="#" data-destination-id="<?php echo $city ?>" class="clearfix"><?php echo $city ?></a>
										</li>
									<?php endforeach ?>
								</ul>
							</div>
						</div>

						<div class="hotels-slides">
							<?php foreach ($hotel as $city => $hotel_in_a_city): ?>
								<div class="hero-slide hotels-slide" data-destination-id="<?php echo $city ?>">
									<button class="hero-button close-button"><?php echo t('Close') ?></button>
									<div class="scroller">
										<ul class="hero-list hotels-list">
											<?php foreach ($hotel_in_a_city as $hoteldata): ?>
												<li>
													<a href="<?php echo $hoteldata['path'] ?>" class="clearfix">
														<?php echo $hoteldata['name'] ?>
													</a>
												</li>
											<?php endforeach ?>
										</ul>
									</div>
								</div>
							<?php endforeach ?>

							<div class="hero-slide hotels-slide" data-destination-id="all">
								<button class="hero-button close-button">Close</button>
								<div class="scroller">
									<ul class="hero-list hotels-list">
									<?php
										foreach ($hotel as $city => $hotel_in_a_city):
											foreach ($hotel_in_a_city as $hoteldata):
									?>
										<li><a href="<?php echo $hoteldata['path'] ?>" class="clearfix">
											<?php echo $hoteldata['name'] ?>
										</a></li>
									<?php
											endforeach;
										endforeach;
									?>
									</ul>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

		
 </div>
	<div class="hidden-region">
		<?php echo theme('niquesa_header_links', array('nid' => null)) ?>
		<?php echo niquesa_ux_block_render('menu_block', 3) ?>
	</div>

	<?php include 'node.group.footer.inc' ?>
</div>
