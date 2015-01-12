<?php 
	$host = $_SERVER['HTTP_HOST'];
	if(!$ajax_req):
		$usingCookies = false;    //Set this variable to true if you are using cookie caching
		include("mobile_detect.php");
		$detected = $detect;
		$isMobile = $detected->isMobile();
		$isTablet = $detected->isTablet();
?><!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7 no-js <?php print $deviceInfo .'"'. $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7 no-js <?php print $deviceInfo .'"'. $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8 no-js <?php print $deviceInfo .'"'. $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie9 no-js <?php print $deviceInfo .'"'. $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)><html class="gte-ie9 no-js <?php print $deviceInfo .'"'. $html_attributes; ?>><![endif]-->
<!--[if !IE]><!--> <html class="not-ie no-js <?php print $deviceInfo .'"'. $html_attributes; ?>> <!--<![endif]-->
<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
	
  <script type="text/javascript"> var _SAXIFY=true,_p=window.location.pathname; _SAXIFY&&_p&&!(/^(\/|\/admin|\/user)$/.test(_p))&&(window.location="/#!"+_p); _SAXIFY&&(document.documentElement.className += ' rfl-load');</script>

  <meta name="MobileOptimized" content="width">
  <meta name="HandheldFriendly" content="true">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
  <meta http-equiv="cleartype" content="on">

  <?php print $styles; ?>

  <script src="<?php print $themePath . "/js/lib/"; ?>modernizr.js" type="text/javascript"></script>
  <link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
<?php endif; ?>

	<?php print $page_top; ?>
	
	<?php print $page; ?>
	
	<?php print $page_bottom; ?>
	
<?php if(!$ajax_req): ?>  
  <?php print $scripts; ?>
</body>
</html>
<?php endif; ?>
<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */
?>