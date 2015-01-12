<?php

function isThisLocal($refresh = false){
	static $loc;
    if( $refresh || gettype($loc) !== "boolean" ){
        $loc = (substr($_SERVER['HTTP_HOST'], strrpos($_SERVER['HTTP_HOST'], '.')) == ".local")? true : false;
    }
    return $loc;
}

if(isThisLocal()){
	system_rebuild_theme_data(); drupal_theme_rebuild();
}

function isAjaxReq(){
	return (isset($_REQUEST['ajaxReq']) && $_REQUEST['ajaxReq'] == 1);
}


function curPageURL() {
	$pageURL = 'http';
	if ( isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on" ) { 
		$pageURL .= "s"; 
	}
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	} else {
		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	return $pageURL;
}

function mof_preprocess_html(&$variables, $hook) {
	
	$variables['themePath'] = base_path() . path_to_theme(); 
	$variables['ajax_req'] = isAjaxReq();
	$variables['isLocal'] = isThisLocal();
	
	$variables['titleClass'] = str_replace(' ', '-', strtolower(str_replace('&lt;br/&gt;', '', strip_tags(drupal_get_title()))));
	
	//$variables['region_footer'] = block_get_blocks_by_region('footer');
}

function mof_css_alter(&$css) { 
	//unset($css[drupal_get_path('module','system').'/system.base.css']);
	unset($css[drupal_get_path('module','system').'/system.menus.css']);
	unset($css[drupal_get_path('module','system').'/system.theme.css']);
	unset($css[drupal_get_path('module','ctools').'/css/ctools.css']);
	unset($css[drupal_get_path('module','ckeditor').'/ckeditor.css']);
	unset($css[drupal_get_path('module','field_collection').'/field_collection.theme.css']);
	unset($css[drupal_get_path('module','user').'/user.css']);
	unset($css[drupal_get_path('module','node').'/node.css']);
	unset($css[drupal_get_path('module','views').'/css/views.css']);
	unset($css[drupal_get_path('module','field').'/theme/field.css']);
	unset($css[drupal_get_path('module','comment').'/comment.css']);
}

function mof_preprocess_page(&$variables){
	
	$variables['themePath'] = base_path() . path_to_theme(); 
	$variables['ajax_req'] = isAjaxReq();
	$variables['isLocal'] = isThisLocal();

	if (isset($variables['node']) && is_object($variables['node'])){
		$node = $variables['node'];
		//$variables['splash_image'] = field_get_items('node', $node, 'field_splash_image');
		
		if ($node->type != "") {
			$variables['theme_hook_suggestions'][] = "page__type__" . $variables['node']->type;
		}
	}
	//var_dump($variables['theme_hook_suggestions']);
}

function mof_preprocess_node(&$variables){
	
	$variables['themePath'] = base_path() . path_to_theme(); 
	
	$pathalias = drupal_get_path_alias($_GET['q']);

	$template_filename = 'node-';
	foreach (explode('/', $pathalias) as $path_part) {
		$template_filename .= '-' . $path_part;
	}
	$variables['classes'][] = $template_filename;
	$variables['theme_hook_suggestions'][] = str_replace('-', '_', $template_filename);

    // Add unique class for each page.
    $path = drupal_get_path_alias($_GET['q']);
    // Add unique class for each website section.
    list($section, ) = explode('/', $path, 2);
    $arg = explode('/', $_GET['q']);
    if ($arg[0] == 'node' && isset($arg[1])) {
      if ($arg[1] == 'add') {
        $section = 'node-add';
      }
      elseif (isset($arg[2]) && is_numeric($arg[1]) && ($arg[2] == 'edit' || $arg[2] == 'delete')) {
        $section = 'node-' . $arg[2];
      }
    }
    $variables['classes_array'][] = drupal_html_class('sect-' . $section);


	//var_dump($variables['theme_hook_suggestions']);
}

function mof_menu_tree__main_menu($variables) {
  return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

function mof_menu_link__main_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  if($element['#href'] == 'http://nolink') {     
    $output = '<span class="seperator">'.check_plain($element['#title']).'</span>';  
  }else{
    $output = l($element['#title'], $element['#href'], $element['#localized_options']);
	//$output = str_replace("href=\"", "href=\"#!", $output);		//Only use this if the site uses escape fragments
  }
  
  if($element['#original_link']['depth'] == "1"){
    //$element['#attributes']['class'][] = "col g2of10";	//This beautiful line makes the main menu links customizable!
  }
  //$element['#attributes']['class'][] = "sax-link";
  return '<li' . drupal_attributes($element['#attributes']) . ' data-page="' .strtolower(str_replace(' ', '-', drupal_get_path_alias($element['#href']))).'">' . $output . $sub_menu . "</li>\n";
}

function mof_form_alter(&$form, &$form_state, $form_id) {
  //var_dump($form_id);
  //var_dump($form['submitted']);
  if(isset($form['submitted'])){
	  foreach($form['submitted'] as $key=>$field){
		if(is_array($form['submitted'][$key]['#attributes'])) 
			$form['submitted'][$key]['#attributes']['placeholder'] = $field['#title'];
	  }
  }
}

?>
<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function mof_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  mof_preprocess_html($variables, $hook);
  mof_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function mof_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function mof_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function mof_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // mof_preprocess_node_page() or mof_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function mof_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function mof_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function mof_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];

  // By default, Zen will use the block--no-wrapper.tpl.php for the main
  // content. This optional bit of code undoes that:
  //if ($variables['block_html_id'] == 'block-system-main') {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('block__no_wrapper'));
  //}
}
// */
