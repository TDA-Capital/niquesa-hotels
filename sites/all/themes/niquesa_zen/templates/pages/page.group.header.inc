
<?php
if(!$ajax_req): ?>
	<div class="contact-nav">
		<div class="body">
			<a class="contact-btn" href="#" title="Phone">
				<img src="/assets/img/contact-nav-phone.png">
			</a>
			<a class="contact-btn" href="#" title="Email">
				<img src="/assets/img/contact-nav-email.png">
			</a>
			<a class="contact-btn" href="#" title="Location">
				<img src="/assets/img/contact-nav-location.png">
			</a>
		</div>
	</div>
	
	<header id="main-header" class="main-header">
		<div class="header-wrap">
			<div class="main-header-bar">
				<div class="container">
					<div class="row">
						<div class="col-xs-5">
						</div>
						<div class="col-xs-2 logo-container">
							<a href="#" class="logo">
								<img src="/assets/img/niquesa-logo.png" alt="NIQUESA Hotels &amp; Resorts">
							</a>
						</div>
						<div class="col-xs-5 main-header-user-panel">
							<a class="dropdown" href="#">ENG</a>
							<span class="vertical-divider"></span>
							<a href="#">| MY ACCOUNT |</a>
							<span class="vertical-divider"></span>
							<a href="#">LOGIN</a>
						</div>
					</div>
				</div>
			</div>

							
	
    			<?php
					 $group_menu=niquesa_ux_block_render("menu_block", 3);
					 print $group_menu;
					?>
		        
			<nav id="main-nav" class="main-nav">
			</nav>
			
		</div>
	</header>
	
<?php endif; ?>