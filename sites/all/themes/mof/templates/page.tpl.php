<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>

	<header class="header clearfix slow-trans" id="header" role="banner">
		<?php if (false && $logo): ?>
			<a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="header__logo" id="logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="header__logo-image" /></a>
		<?php else: ?>
			<a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="header__logo" id="logo">
				<?php if(false): ?><div class="light-style">
					<img src="<?php print $themePath; ?>/css/images/logo-home.png" alt="<?php print t('Home'); ?>" class="header__logo-image svg-replace" />
					<img src="<?php print $themePath; ?>/css/images/logo-home.svg" alt="<?php print t('Home'); ?>" class="header__logo-image svg-replacement" />
				</div>
				<div class="dark-style">
					<img src="<?php print $themePath; ?>/css/images/logo-home-dark.png" alt="<?php print t('Home'); ?>" class="header__logo-image svg-replace" />
					<img src="<?php print $themePath; ?>/css/images/logo-home-dark.svg" alt="<?php print t('Home'); ?>" class="header__logo-image svg-replacement" />
				</div><?php endif; ?>
			</a>
		<?php endif; ?>

		<div id="navigation">
		  <?php print render($page['navigation']); ?>
		</div>

		<a href="http://app.<?php print $_SERVER['HTTP_HOST']; ?>/login" class="app-login-btn btn mobile-hidden">LOGIN and size your fish</a>
	</header>

	
	<div class="page-wrap">
		<div id="content_body" class="" role="main">

			<?php print render($page['highlighted']); ?>
			<?php if (false&& $title): ?>
				<h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
			<?php endif; ?>
			<?php print $messages; ?>
			<?php if ($action_links): ?>
				<ul class="action-links"><?php print render($action_links); ?></ul>
			<?php endif; ?>
			<?php print render($page['content']); ?>
			<?php print $feed_icons; ?>

			<?php print render($page['footer']); ?>
			
		</div>
	</div>

	<?php print render($page['bottom']); ?>
	
	<footer id="footer">
		<?php include('footr.php'); ?>
	</footer>