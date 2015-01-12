<?php
function isThisLocal($refresh = false){
	static $loc;
    if( $refresh || gettype($loc) !== "boolean" ){
        $loc = (substr($_SERVER['HTTP_HOST'], strrpos($_SERVER['HTTP_HOST'], '.')) == ".local")? true : false;
    }
    return $loc;
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

// this gives us user-login.tpl.php in our theme
function niquesa_zen_theme() {
	$items = array();
	// create custom user-login.tpl.php
	$items['user_login'] = array(
		'render element' => 'form',
		'path' => drupal_get_path('theme', 'niquesa_zen') . '/templates',
		'template' => 'user-login',
		'preprocess functions' => array(
			'niquesa_zen_preprocess_user_login'
		),
	);
	$items['niquesa_webform_cuisine'] = array(
		'render element' => 'form',
		'path' => drupal_get_path('theme', 'niquesa_zen') . '/templates',
		'template' => 'niquesa-webform-cuisine',
	);
	$items['niquesa_webform_business'] = array(
		'render element' => 'form',
		'path' => drupal_get_path('theme', 'niquesa_zen') . '/templates',
		'template' => 'niquesa-webform-business',
	);
    $items['niquesa_header_links'] = array(
        'variables' => array('nid' => null),
		'path' => drupal_get_path('theme', 'niquesa_zen') . '/templates',
        'template' => 'niquesa_header_links',
    );
	return $items;
}


function niquesa_zen_preprocess_html(&$variables, $hook) {
	$variables['themePath'] = base_path() . path_to_theme(); 
	$variables['ajax_req'] = isAjaxReq();
	$variables['isLocal'] = isThisLocal();
	
	$variables['titleClass'] = str_replace(' ', '-', strtolower(str_replace('&lt;br/&gt;', '', strip_tags(drupal_get_title()))));
}

function niquesa_zen_css_alter(&$css) { 
	unset($css[drupal_get_path('module','system').'/system.base.css']);
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

function niquesa_zen_preprocess_page(&$variables){
	$variables['themePath'] = base_path() . path_to_theme(); 
	$variables['ajax_req'] = isAjaxReq();
	$variables['isLocal'] = isThisLocal();

	if (isset($variables['node']) && is_object($variables['node'])){
		$node = $variables['node'];
		
		if ($node->type != "") {
			$variables['theme_hook_suggestions'][] = "page__" . $variables['node']->type;
		}
	}

	drupal_add_js(array(
		'themePath' => drupal_get_path('theme', 'niquesa_zen')
	), 'setting');
}

function niquesa_zen_preprocess_node(&$vars){
	$vars['themePath'] = base_path() . path_to_theme(); 
	$vars['ajax_req'] = isAjaxReq();
	$vars['isLocal'] = isThisLocal();

	$pathalias = drupal_get_path_alias($_GET['q']);
}

function niquesa_zen_form_alter(&$form, &$form_state, $form_id) {
	if (strpos($form_id, 'webform_client_form_') === 0) {
		if ($form['#node']->type == 'cuisine_landing_page')
			$form['#theme'] = 'niquesa_webform_cuisine';
		elseif ($form['#node']->type == 'busines_landing_page'
			|| $form['#node']->type == 'occasions_landing_page' || $form['#node']->type == 'greetings_page')
			$form['#theme'] = 'niquesa_webform_business';

		unset($form['#attributes']['enctype']);
		
		$form['actions']['submit']['#ajax'] = array(
			'callback' => 'niquesa_webform_js_submit',
			'wrapper' => $form['#id'],
			'method' => 'replace',
			'effect' => 'fade',
		);
		$form['actions']['submit']['#id'] = 'edit-submit--' . $form['#id'];
		$form['actions']['submit']['#attributes'] = array(
			'class' => array('submit', 'a-button', 'style-2', 'purple')
		);
	}

	elseif (isset($form['submitted']))
		foreach ($form['submitted'] as $key => $field)
			if (is_array($form['submitted'][$key]['#attributes'])) 
				$form['submitted'][$key]['#attributes']['placeholder'] = $field['#title'];
}

function niquesa_webform_js_submit($form, $form_state) {
	$sid = $form_state['values']['details']['sid'];

	if (!$sid)
		return $form;

	return array(
		'#type' => 'markup',
		'#markup' => check_markup(
			$form['#node']->webform['confirmation'],
			$form['#node']->webform['confirmation_format'],
			'',
			true
		),
	);
}

function get_prev_next_event($node, $next=false) {
	$operator = $next ? '>=' : '<=';
	$direction = $next ? 'ASC' : 'DESC';

	$query = new EntityFieldQuery();
	$result = $query
		->entityCondition('entity_type', 'node')
		->entityCondition('bundle', 'event')
		->propertyCondition('language', $node->language)
		->propertyCondition('nid', $node->nid, '<>')
		->fieldCondition('field_hotel', 'target_id', $node->field_hotel['und'][0]['target_id'])
		->fieldCondition('field_event_date', 'value', $node->field_event_date['und'][0]['value'], $operator)
		->fieldOrderBy('field_event_date', 'value', $direction)
		->fieldOrderBy('field_event_date', 'value2', $direction)
		->range(0, 1)
		->execute();
	$nids = array_keys($result['node']);
	return node_load($nids[0]);
}

function get_previous_event($node) {
	return get_prev_next_event($node);
}

function get_next_event($node) {
	return get_prev_next_event($node, true);
}

function get_prev_next_experience($node, $next=false) {
	$operator = $next ? '>' : '<';
	$direction = $next ? 'ASC' : 'DESC';
	
	$query = new EntityFieldQuery();
	$result = $query
		->entityCondition('entity_type', 'node')
		->entityCondition('bundle', 'experience')
		->propertyCondition('language', $node->language)
		->propertyCondition('nid', $node->nid, $operator)
		->fieldCondition('field_hotel', 'target_id', $node->field_hotel['und'][0]['target_id'])
		->propertyOrderBy('changed', 'DESC')
		->range(0, 1)
		->execute();
		
	$nids = array_keys($result['node']);
	return node_load($nids[0]);
}

function get_previous_experience($node) {
	return get_prev_next_experience($node);
}

function get_next_experience($node) {
	return get_prev_next_experience($node, true);
}

function get_prev_next_promotion($node, $next=false) {
	$operator = $next ? '<=' : '>=';
	$direction = $next ? 'DESC' : 'ASC';

	$query = new EntityFieldQuery();
	$result = $query
		->entityCondition('entity_type', 'node')
		->entityCondition('bundle', 'promotion')
		->propertyCondition('status', 1)
		->propertyCondition('language', $node->language)
		->propertyCondition('nid', $node->nid, '<>')
		->propertyCondition('created', $node->created, $operator)
		->fieldCondition('field_hotel', 'target_id', $node->field_hotel['und'][0]['target_id'])
		->propertyOrderBy('created', $direction)
		->range(0, 1)
		->execute();
	$nids = array_keys($result['node']);
	return node_load($nids[0]);
}

function get_previous_promotion($node) {
	return get_prev_next_promotion($node);
}

function get_next_promotion($node) {
	return get_prev_next_promotion($node, true);
}

function get_prev_next_room($node, $next=false) {
    $operator = $next ? '>=' : '<=';
    $direction = $next ? 'ASC' : 'DESC';

    $query = new EntityFieldQuery();
    $result = $query
        ->entityCondition('entity_type', 'node')
        ->entityCondition('bundle', 'room')
        ->propertyCondition('status', 1)
        ->propertyCondition('language', $node->language)
        ->propertyCondition('nid', $node->nid, '<>')
        ->propertyCondition('title', $node->title, $operator)
        ->fieldCondition('field_hotel', 'target_id', $node->field_hotel['und'][0]['target_id'])
        ->fieldCondition('field_room_type', 'value', $node->field_room_type['und'][0]['value'])
        ->propertyOrderBy('title', $direction)
        ->range(0, 1)
        ->execute();
    $nids = array_keys($result['node']);
    return node_load($nids[0]);
}

function get_previous_room($node) {
    return get_prev_next_room($node);
}

function get_next_room($node) {
    return get_prev_next_room($node, true);
}
