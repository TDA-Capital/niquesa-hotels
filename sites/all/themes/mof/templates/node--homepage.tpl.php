<article class="node-<?php print $node->nid; ?> <?php print $classes; ?>"<?php print $attributes; ?>>

  <?php if ($title_prefix || $title_suffix || $display_submitted || $unpublished || !$page && $title): ?>
    <header>
      <?php print render($title_prefix); ?>
      <?php if (!$page && $title): ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>
      <?php print render($title_suffix); ?>

      <?php if ($display_submitted): ?>
        <p class="submitted">
          <?php print $user_picture; ?>
          <?php print $submitted; ?>
        </p>
      <?php endif; ?>

      <?php if ($unpublished): ?>
        <mark class="unpublished"><?php print t('Unpublished'); ?></mark>
      <?php endif; ?>
    </header>
  <?php endif; ?>

  <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    //print render($content);
  ?>

	<?php print render($content['field_background_image']); ?>
	<?php print render($content['field_background_image_large_']); ?>
	
	<section class="homepage-mobileonly-section light-color tablet-only mobile-only">
		<div class="faux-interactive">
			<div class="container">
				<div class="hgroup">
					<img src="<?php print $themePath; ?>/css/images/logo-main.png" />
					<h2><?php print render($content['field_section_1_heading']); ?></h2>
					<h4><?php print render($content['field_section_1_subheading']); ?></h4>
					<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a>
				</div>
				
				<div class="iphone">
					<img data-imgsrc="<?php print $themePath; ?>/css/images/home.jpg" />
				</div>
			</div>
		</div>
		<div class="faux-interactive">
			<div class="container">
				<div class="hgroup">
					<ul class="appstage_icons">
						<li class="fishScale"><button class="gmp"></button><button class="gsp"></button></li>
					</ul>
					<h2><?php $wrapper = entity_metadata_wrapper('node', $node); print $wrapper->field_interactive_section[0]->field_section_head->value(); ?></h2>
					<p><?php print $wrapper->field_interactive_section[0]->field_section_body->value(); ?></p>
					<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a>
				</div>
				<div class="iphone">
					<div class="app-screens fishScale">
						<img data-imgsrc="<?php print $themePath; ?>/css/images/import.jpg" />
						<img data-imgsrc="<?php print $themePath; ?>/css/images/calibrate.jpg" />
						<img data-imgsrc="<?php print $themePath; ?>/css/images/select_species.jpg" />
						<img data-imgsrc="<?php print $themePath; ?>/css/images/measure.jpg" />
					</div>
				</div>
			</div>
		</div>
		<div class="faux-interactive">
			<div class="container">
				<div class="hgroup">
					<ul class="appstage_icons">
						<li class="logbook"><button class="gmp"></button><button class="gsp"></button></li>
					</ul>
					<h2><?php print $wrapper->field_interactive_section[1]->field_section_head->value(); ?></h2>
					<p><?php print $wrapper->field_interactive_section[0]->field_section_body->value(); ?></p>
					<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a>
				</div>
				<div class="iphone">
					<div class="app-screens logbook"><img data-imgsrc="<?php print $themePath; ?>/css/images/logbook.jpg" /></div>
				</div>
			</div>
		</div>
		<div class="faux-interactive">
			<div class="container">
				<div class="hgroup">
					<ul class="appstage_icons">
						<li class="species"><button class="gmp"></button><button class="gsp"></button></li>
					</ul>
					<h2><?php print $wrapper->field_interactive_section[2]->field_section_head->value(); ?></h2>
					<p><?php print $wrapper->field_interactive_section[2]->field_section_body->value(); ?></p>
					<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a>
				</div>
				<div class="iphone">
					<div class="app-screens species"><img data-imgsrc="<?php print $themePath; ?>/css/images/fish-species.jpg" /></div>
				</div>
			</div>
		</div>
		<div class="faux-interactive">
			<div class="container">
				<div class="hgroup">
					<ul class="appstage_icons">
						<li class="setup"><button class="gmp"></button><button class="gsp"></button></li>
					</ul>
					<h2><?php print $wrapper->field_interactive_section[3]->field_section_head->value(); ?></h2>
					<p><?php print $wrapper->field_interactive_section[3]->field_section_body->value(); ?></p>
					<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a>
				</div>
				<div class="iphone">
					<div class="app-screens setup"><img data-imgsrc="<?php print $themePath; ?>/css/images/setup.jpg" /></div>
				</div>
			</div>
		</div>
	</section>
	
	<section class="homepage-interactive-section light-color tablet-hidden mobile-hidden">
		<section class="screensized">
			<div class="appstage interactive-1">
				<div class="container">
					<div class="hgroup  v-center">
						<img src="<?php print $themePath; ?>/css/images/logo-main.png" />
						<h1 class="divider"><?php print render($content['field_section_1_heading']); ?></h1>
						<h4><?php print render($content['field_section_1_subheading']); ?></h4>
						<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a>
					</div>
				</div>
			</div>
		</section>
		
		<section class="screensized">
			<div class="appstage interactive-2" data-app-stage="fishScale">
				<div class="container">
					<div class="app_desc col span_4  v-center">
						<h2><?php print $wrapper->field_interactive_section[0]->field_section_head->value(); ?></h2>
						<p><?php print $wrapper->field_interactive_section[0]->field_section_body->value(); ?></p>
						<hr />
						<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a> <h4>NEXT</h4>
					</div>
				</div>
			</div>
		</section>
		
		<section class="screensized">
			<div class="appstage interactive-3" data-app-stage="logbook">
				<div class="container">
					<div class="app_desc col span_4  v-center">
						<h2><?php print $wrapper->field_interactive_section[1]->field_section_head->value(); ?></h2>
						<p><?php print $wrapper->field_interactive_section[1]->field_section_body->value(); ?></p>
						<hr />
						<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a> <h4>NEXT</h4>
					</div>
				</div>
			</div>
		</section>
		
		<section class="screensized">
			<div class="appstage interactive-4" data-app-stage="species">
				<div class="container">
					<div class="app_desc col span_4  v-center">
						<h2><?php print $wrapper->field_interactive_section[2]->field_section_head->value(); ?></h2>
						<p><?php print $wrapper->field_interactive_section[2]->field_section_body->value(); ?></p>
						<hr />
						<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a> <h4>NEXT</h4>
					</div>
				</div>
			</div>
		</section>
		
		<section class="screensized">
			<div class="appstage interactive-5" data-app-stage="setup">
				<div class="container">
					<div class="app_desc col span_4  v-center">
						<h2><?php print $wrapper->field_interactive_section[3]->field_section_head->value(); ?></h2>
						<p><?php print $wrapper->field_interactive_section[3]->field_section_body->value(); ?></p>
						<hr />
						<a href="#" class="scroll-down-link">Scroll Down <span class="inactive"></span><span class="active"></span></a> <h4>MORE INFO</h4>
					</div>
				</div>
			</div>
		</section>
		
		<div id="iphone" class="iphone">
			<img src="<?php print $themePath; ?>/css/images/home.jpg" />
			<div class="app-screens fishScale">
				<img data-imgsrc="<?php print $themePath; ?>/css/images/import.jpg" />
				<img data-imgsrc="<?php print $themePath; ?>/css/images/calibrate.jpg" />
				<img data-imgsrc="<?php print $themePath; ?>/css/images/select_species.jpg" />
				<img data-imgsrc="<?php print $themePath; ?>/css/images/measure.jpg" />
			</div>
			<div class="app-screens logbook"><img data-imgsrc="<?php print $themePath; ?>/css/images/logbook.jpg" /></div>
			<div class="app-screens species"><img data-imgsrc="<?php print $themePath; ?>/css/images/fish-species.jpg" /></div>
			<div class="app-screens setup"><img data-imgsrc="<?php print $themePath; ?>/css/images/setup.jpg" /></div>
		</div>
		
		<ul id="appstage_icons" class="appstage_icons">
			<li class="fishScale"><button class="gmp"></button><button class="gsp"></button></li>
			<li class="logbook"><button class="gmp"></button><button class="gsp"></button></li>
			<li class="species"><button class="gmp"></button><button class="gsp"></button></li>
			<li class="setup"><button class="gmp"></button><button class="gsp"></button></li>
		</ul>
		
		<div class="social-links">
			<?php print render($content['field_twitter_link']); ?>
			<?php print render($content['field_facebook_link']); ?>
		</div>
		
		<div class="appstore-links">
			<?php print render($content['field_apple_store_link']); ?>
			<?php print render($content['field_google_play_store_link']); ?>
		</div>
		
		<!--<div class="loading"></div>-->
	</section>

	<section class="screensized homepage-section devices-and-integration-section">
		<div class="container v-center">
			<div class="hgroup">
				<h2><?php print render($content['field_section_2_heading']); ?></h2>
				<h4><?php print render($content['field_section_2_subheading']); ?></h4>
			</div>
			<?php print render($content['field_section_2_body']); ?>
			<img src="<?php print $themePath; ?>/css/images/devices-full.jpg" />
		</div>
	</section>

	<section class="screensized homepage-section catch-and-release-section">
		<div class="container v-center">
			<div class="hgroup">
				<h2><?php print render($content['field_section_3_heading']); ?></h2>
				<h4><?php print render($content['field_section_3_subheading']); ?></h4>
			</div>
			<?php print render($content['field_section_3_body']); ?>
			
			<div class="catch-release-animation clearfix">
				<img src="<?php print $themePath; ?>/css/images/catch-hook.png" class="catch-hook" />
				<img src="<?php print $themePath; ?>/css/images/catch-fish.png" class="catch-fish" />
			</div>
		</div>
	</section>

	<section class="screensized homepage-section selected-catches-section light-color">		
		<?php print render($content['field_gallery_section']); ?>
		
		<div class="container v-center">
			<div class="hgroup">
				<h2><?php print render($content['field_section_4_heading']); ?></h2>
				<h4><?php print render($content['field_section_4_subheading']); ?></h4>
			</div>
		</div>
	</section>

	<section class="screensized homepage-section section5">
		<div class="container v-center">
			<div class="hgroup">
				<h2><?php print render($content['field_section_5_heading']); ?></h2>
				<h4><?php print render($content['field_section_5_subheading']); ?></h4>
			</div>
			<?php print render($content['body']); ?>
			
			<?php print render($content['field_apple_store_link']); ?>
			<?php print render($content['field_google_play_store_link']); ?>
		</div>
			
		<?php print render($content['field_secondary_background']); ?>
		<?php print render($content['field_secondary_background_large']); ?>
	</section>

</article>
