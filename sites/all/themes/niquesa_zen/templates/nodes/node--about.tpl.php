<?php
include('node.header.inc');
global $language;

if (isset($node->field_hotel["und"])) {
	$hotel_nid=$node->field_hotel["und"][0]["target_id"];
}

if (!isset($node->field_hotel["und"])) {
		$extra="group-level-page";
	} else {
		$extra="";
	}

?>



<div id="content_body" class="terms-page <?php print $extra; ?>">
    
	<div class="hero-module hero-about">
		<div class="hero-module-head">
			<div class="center-content">
			<div class="center-content-td">
				
				<div class="box-about">
					<div class="orange-box">
						<h1><?php print $node->title;?></h1>
						
						<span class="horizontal-divider orange"></span>
						
						<h4><?php print $node->field_subheading["und"][0]["value"]; ?></h4>
						
						<?php print $node->body["und"][0]["value"]; ?>
						
						<div class="text-center"><a href="<?php print $node->field_button["und"][0]["url"]; ?>" class="a-button black"><?php print $node->field_button["und"][0]["title"]; ?></a></div>
					</div>
				</div>
				
			</div>
			</div>
				
			<img class="background-img hide" data-imgsrc="<?php print file_create_url($node->field_image["und"][0]["uri"]); ?>"/>
		</div>
	</div>
	  
	<?php
	// hotel set - implies we're looking an article at hotel level
	if (isset($node->field_hotel["und"])) {
		?>
  <div class="hidden-region">
    <?php echo theme('niquesa_header_links', array('nid' => $node->field_hotel['und'][0]['target_id'])) ?>

  <?php
    $navigation_menu=niquesa_ux_block_render("menu_block", 1);
    print $navigation_menu;
  ?>

  </div>
  <?php include('node.footer.inc'); ?>  
	<?php } ?>
 

 <?php
	// no hotel nid set - implies we're looking at an article at group level	
	if (!isset($node->field_hotel["und"])) {
	?>
	<div class="hidden-region">
        <?php echo theme('niquesa_header_links', array('nid' => null)) ?>
				<?php
					$group_menu=niquesa_ux_block_render("menu_block", 3);
					print $group_menu;
					
				?>
	</div>
	
	<?php
	include ('node.group.footer.inc'); 
	}
	?>            
        
    </div> <!-- content-body -->
