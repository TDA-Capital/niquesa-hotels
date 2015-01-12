<?php
	global $language;

	if (isset($node->field_hotel['und']))
		$hotel_nid = $node->field_hotel['und'][0]['target_id'];
	elseif ($node->type == 'hotel')
		$hotel_nid = $node->nid;
?>
	
<header id="main-header" class="main-header">
	<div class="header-wrap">
		<div class="main-header-bar">
			<div class="container">
				<div class="row">
				
					<div class="col-sm-5 col-xs-6 main-header-user-panel">
						<?php
							$languages = array();
							foreach (language_list() as $code => $lang)
								if ($lang->enabled)
									$languages[$code] = $lang;
										
								if (count($languages) > 1): ?>
							<div class="fakeDrop header-drop dropdown lang-select">
								 <div class="hxd">
									<?php echo strtoupper($language->language) ?>
								</div>
								<div class="bxd">
									<ul>
										<?php foreach ($languages as $code => $lang): ?>
											<?php if ($code != $language->language): ?>
												<li>
													<?php echo l(strtoupper($code), '<front>', array(
														'language' => $lang
													)) ?>
												</li>
											<?php endif ?>
										<?php endforeach ?>
									</ul>
								</div>
							</div>
						<?php endif ?>
					</div>
					
					<div class="col-sm-2 col-xs-6 logo-container">
						<a href="<?php echo url('<front>') ?>" class="logo">
							<img src="<?php echo base_path(), path_to_theme() ?>/img/niquesa-logo.png" alt="NIQUESA Hotels &amp; Resorts">
						</a>
					</div>
					
					<div class="col-sm-5 hotel-select-panel hidden-xs">

						<div class="header-links"></div>

						<div class="fakeDrop header-drop dropdown hotels-list">
							<div class="hxd">
								<?php echo t('Select Hotel') ?>
							</div>
			
							<div class="bxd">
								<ul>
									<?php foreach (niquesa_ux_hotel_list() as $title => $path): ?>
										<li><?php echo l($title, $path) ?></li>
									<?php endforeach ?>
								</ul>
							 </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<nav class="brand-nav"></nav>
		
		<nav id="main-nav" class="main-nav"></nav>
	</div>
</header>
