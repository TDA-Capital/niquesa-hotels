 
<?php if (!empty($experiences)): ?>
	<div class="offers-module">
		<div class="container">
			<div class="row">
				<h2 class="module-heading"><?php echo t('Experience highlights') ?></h2>
				<div class="bx_slider_container">
					<ul class="bxslider slides">
						<?php foreach ($experiences as $experience): ?>
							<li class="offer-item">
								<a href="<?php echo $experience['url'] ?>">
									<img class="offer-img lazy-img" data-imgsrc="<?php echo $experience['image'] ?>">
									<div class="meta slow-trans">
										<h4><?php echo $experience['title'] ?></h4>
									</div>
								</a>
							</li>
						<?php endforeach ?>
					</ul>
				</div>
			</div>
		</div>
	</div>
<?php endif ?>
