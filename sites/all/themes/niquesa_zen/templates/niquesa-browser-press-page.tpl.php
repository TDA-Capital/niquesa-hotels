<?php
	global $language;
	include 'node.header.inc';
?>

<div id="content_body" class="press-page group-level-page">
	<?php if (isset($form)): ?>
		<div class="hero-module hero-about">
			<div class="hero-module-head">
				<div class="center-content">
					<div class="center-content-td">
						<div class="box-about">
							<div class="orange-box">
								<h1 class="text-center"><?php echo t('Press') ?></h1>
								<span class="horizontal-divider orange"></span>
								<?php echo t('To access this section you need to enter your name and email in the form below.') ?>
								<?php
                                    echo render($form) ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php else: ?>
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-offset-3 col-md-6">
					<div class="page-heading">
						<h1 class="text-center"><?php echo t('Press') ?></h1>
						<hr class="horizontal-divider dark">
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-4 col-md-2">
					<a href="#" class="back-button" onclick="window.history.back();return false;"><?php echo t('BACK') ?></a>
				</div>
				<div class="col-xs-12 col-sm-8 col-md-10">
					<div class="breadcrumbs">
						<?php echo l(t('Press'), 'press') ?>
						<?php foreach ($breadcrumbs as $breadcrumb): ?>
							<span class="divider">/</span>
							<?php echo l($breadcrumb['title'], $breadcrumb['url'], $breadcrumb['arguments']) ?>
						<?php endforeach ?>
					</div>
				</div>
			</div>
		</div>

		<div class="container niquesa-file-browser">
			<div class="row">
				<?php foreach ($items as $item): ?>
					<div class="col-xs-12 col-sm-4 col-md-3">
						<div class="unit <?php echo $item['type'] ?>">
							<?php echo l($item['name'], $item['path'], $item['arguments']) ?>
						</div>
					</div>
				<?php endforeach ?>
			</div>
		</div>
	<?php endif ?>

	<div class="hidden-region">
        <?php echo theme('niquesa_header_links', array('nid' => null)) ?>
		<?php echo niquesa_ux_block_render('menu_block', 3) ?>
	</div>
	<?php include 'nodes/node.group.footer.inc' ?>
</div>
