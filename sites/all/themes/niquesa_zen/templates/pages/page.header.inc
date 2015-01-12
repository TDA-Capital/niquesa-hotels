
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
							<a class="dropdown" href="#">HOTEL D"INGHILTERRA</a>

					<?php
					// leave out the jump menu for now..
					//		if (module_exists('jump_menu')) {
					//		print render(jump_menu('menu-niquesahotels',1,FALSE,1,''));
					//		}
					?>

						</div>
						<div class="col-xs-2 logo-container">
							<a href="/" class="logo">
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
            
            <nav class="brand-nav">
                <ul class="menu container">
                    <li><a href="#">OUR HOTELS</a></li>
                    <li><a href="/occasions">OCCASIONS</a></li>
                    <li><a href="/business">BUSINESS</a></li>
                    <li><a href="/destinations">DESTINATIONS</a></li>
                    <li><a href="/experiences">EXPERIENCES</a></li>
                </ul>
            </nav>
            
			<nav id="main-nav" class="main-nav"></nav>
		</div>
	</header>
	
<?php endif; ?>