<div class="row">
	<div class="col-xs-12">
		<div class="img-slideshow ezSlidr">
			<ul class="slides">
				<?php foreach ($items as $item): ?>
					<li>
						<img class="lazy-img" data-imgsrc="<?php echo image_style_url('slideshow__940x400_', $item['#item']['uri']) ?>">
					</li>
				<?php endforeach ?>
			</ul>
		</div>
	</div>
</div>
