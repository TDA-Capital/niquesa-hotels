<?php $active = in_array('active', $element['#attributes']['class']) ?>
<li<?php if ($active): ?> class="active"<?php endif ?>>
	<?php echo l($element['#title'], $element['#href']) ?>
</li>
