<div class="row">
	<div class="col-xs-12 col-md-offset-2 col-md-8">
		<div class="page-heading">
			<h1 class="text-center"><?php echo $form['#node']->field_restaurant_book_header['und'][0]['value'] ?></h1>
			<hr class="horizontal-divider">
			<p><?php echo nl2br($form['#node']->field_restaurant_book_body['und'][0]['value']) ?></p>
		</div>
	</div>
</div>
<div class="row">
	<div class="col-xs-12 col-md-offset-4 col-md-4">
		<div class="row">
			<div class="col-xs-12 col-md-offset-1 col-md-10">
				<?php echo theme('status_messages') ?>
				<div class="row">
					<div class="col-xs-6">
						<?php echo render($form['submitted']['name']) ?>
					</div>
					<div class="col-xs-6">
						<?php echo render($form['submitted']['surname']) ?>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6">
						<?php echo render($form['submitted']['email']) ?>
					</div>
					<div class="col-xs-6">
						<?php echo render($form['submitted']['telephone']) ?>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6">
						<div class="input-prepend">
							<?php echo render($form['submitted']['time']) ?>
						</div>
					</div>
					<div class="col-xs-6">
						<?php echo render($form['submitted']['people']) ?>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<?php echo render($form['submitted']['request']) ?>
					</div>
				</div>
				<?php 
					foreach (element_children($form) as $child)
						echo render($form[$child]);
				?>
			</div>
		</div>
	</div>
</div>

<?php
	if (isAjaxReq()) {
		$js = drupal_add_js();
		echo drupal_get_js('header', array(
			'settings' => $js['settings']
		));
	}
?>
