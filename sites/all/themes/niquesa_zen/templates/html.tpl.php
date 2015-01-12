<?php
	$ajax_req = (isset($_REQUEST['ajaxReq']) && $_REQUEST['ajaxReq'] == 1);
	$host = $_SERVER['HTTP_HOST'];
	if(!$ajax_req):
		$usingCookies = false;    //Set this variable to true if you are using cookie caching
		include("mobile_detect.php");
    if (isset($detect)) {
 		$detected = $detect;
		//$isMobile = $detected->isMobile();
		//$isTablet = $detected->isTablet();
    }
?>
<!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7 no-js <?php print $deviceInfo; ?>"><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7 no-js <?php print $deviceInfo; ?>"><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="ie7 lt-ie9 lt-ie8 no-js <?php print $deviceInfo; ?>"><![endif]-->
<!--[if IE 8]><html class="ie8 lt-ie9 no-js <?php print $deviceInfo; ?>"><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><html class="gte-ie9 no-js <?php print $deviceInfo; ?>"><![endif]-->
<!--[if !IE]><!--> <html class="not-ie no-js <?php print $deviceInfo; ?>"> <!--<![endif]-->
<head>
  <title><?php echo $head_title; ?></title>
	<?php
    $languages= language_list();
    $lang=array();

    foreach ($languages as $installed_language) {
      $lang[]=$installed_language->language;  
    }

    $counter=0;
    $sax_root_string="";    
    foreach ($lang as $key=>$value) {
    if ($key==0) {
  	 $sax_root_string="[\"$value\"";
    }

    if ($key>0 && $key<=count($lang)-1) {
      $sax_root_string.=",\"$value\"";
    }
	
    if ($key==count($lang)-1) {
    	$sax_root_string.="]";
    }
    $counter++;
  }
  
?>
  
		<script type="text/javascript">
		var _SAXIFY=true, 
			_RFLload=false,
			_p=window.location.pathname,
			_SAX_VETO = /^(\/|\/admin|\/user)$/,
			_SAX_ROOTS = <?php print $sax_root_string;//["it"]; ?>;	//configure $.Sax before the page loads - like a BOSS.
		//(function(){var b,d,e,a=""+window.location.pathname,g=-1,f=a&&"/"==a,c=!1;if(!f){for(;!c&&++g<_SAX_ROOTS.length;)b=_SAX_ROOTS[g],d=0==a.indexOf("/"+b+"/"),b=e="/"+b+(d?"/":""),d=a.substring(0,e.length),e=a.replace(e,""),f=f?f:d===a,c=c?c:d===b,_SAXIFY&&c&&!f&&(window.location=b+"#!/"+e+window.location.hash);!_SAXIFY||c||_SAX_VETO.test(_p)||(window.location="/#!"+a+window.location.hash)}})();
		_SAXIFY&&(document.documentElement.className += ' rfl-load');
	</script>

  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="cleartype" content="on">

  <?php echo $styles ?>
  <?php echo $head ?>
  
  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  
  <script src="<?php print $themePath . "/js/lib/"; ?>modernizr.js" type="text/javascript"></script>

  <!-- Typekit -->
  <script type="text/javascript">
        (function(d)
        {
            var config = {
                kitId: 'qbl5jro',
                scriptTimeout: 3000
            },
                h = d.documentElement,
                t = setTimeout(function()
                {
                    h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
                }, config.scriptTimeout),
                tk = d.createElement("script"),
                f = false,
                s = d.getElementsByTagName("script")[0],
                a;
            h.className += " wf-loading";
            tk.src = '//use.typekit.net/' + config.kitId + '.js';
            tk.async = true;
            tk.onload = tk.onreadystatechange = function()
            {
                a = this.readyState;
                if (f || a && a != "complete" && a != "loaded") return;
                f = true;
                clearTimeout(t);
                try
                {
                    Typekit.load(config)
                }
                catch (e)
                {}
            };
            s.parentNode.insertBefore(tk, s)
        })(document);
  </script>

    

</head>
<body>

	<!--[if lt IE 8]>
		<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    	<![endif]-->
<?php //print $page_top; ?>
<?php endif; ?>
	
	
	<?php print $page; ?>
  	
	
<?php if(!$ajax_req): ?>

<?php //print $page_bottom; ?>


	<?php if ($gtm_id = variable_get('niquesa_gtm_id')): ?>
		 <!-- Google Tag Manager -->
		<noscript><iframe src="//www.googletagmanager.com/ns.html?id=<?php echo htmlspecialchars($gtm_id) ?>"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
		{'gtm.start': new Date().getTime(),event:'gtm.js'}
		);var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','<?php echo $gtm_id ?>');</script>
		<!-- End Google Tag Manager -->
	<?php endif ?>
		
	<script type="text/javascript">
		/* <![CDATA[ */
		var google_conversion_id = 965471912;
		var google_custom_params = window.google_tag_params;
		var google_remarketing_only = true;
		/* ]]> */
	</script>
	<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>
	<noscript>
		<div style="display:inline;">
			<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/965471912/?value=0&guid=ON&script=0"/>
		</div>
	</noscript>
	
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
		{ (i[r].q=i[r].q||[]).push(arguments)}
			,i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-6991931-3', 'auto');
		ga('require', 'displayfeatures');
		ga('send', 'pageview');
	</script>

	<?php print $scripts; ?>

</body>
</html>
<?php endif; ?>
