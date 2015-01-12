<?php $active = in_array('active', $element['#attributes']['class']) ?>
<li<?php if ($active): ?> class="active"<?php endif ?>>
	<?php echo l(
		str_replace('&amp; ', '&amp;&nbsp;', htmlspecialchars($element['#title'])),
		$element['#href'],
		array('html' => true)
	) ?>
</li>
