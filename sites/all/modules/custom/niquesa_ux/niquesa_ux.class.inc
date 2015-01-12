<?php
class NiquesaUX {
	private $language;
	private $hotel_nid;

	public function __construct($language, $hotel_nid=null) {
		$this->language = $language;
		$this->hotel_nid = $hotel_nid;
	}

	public function setLanguage($language) {
		$this->language = $language;
	}

	public function getLanguage() {
		return $this->language;
	}

	public function setHotelNid($hotel_nid) {
		$this->hotel_nid = $hotel_nid;
	}

	public function getHotelNid() {
		return $this->hotel_nid;
	}

	public function getPromotions() {
		$query = new EntityFieldQuery();
		$query->entityCondition('entity_type', 'node')
			->propertyCondition('status', 1)
			->propertyCondition('type', 'promotion')
			->propertyCondition('language', $this->language->language)
			->fieldCondition('field_hotel', 'target_id', $this->hotel_nid);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');

		$promotions = array();
		foreach ($nodes as $node) {
			$image_uri = $node->field_promotion_image['und'][0]['uri'];
			$promotions[] = array(
				'image' => array(
					'uri' => file_create_url($image_uri),
					'alt' => $node->field_promotion_image['und'][0]['alt'],
					'title' => $node->field_promotion_image['und'][0]['title'],
				),
				'title' => $node->title,
				'url' => url("node/{$node->nid}"),
			);
		}

		return $promotions;
	}

	public function getRestaurants() {
		$query = new EntityFieldQuery();
		$query->entityCondition('entity_type', 'node')
			->entityCondition('bundle', 'restaurant')
			->propertyCondition('status', 1)
			->propertyCondition('language', $this->language->language)
			->fieldCondition('field_hotel', 'target_id', $this->hotel_nid)
			->range(0, 1);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');

		$restaurants = array();
		foreach ($nodes as $node)
			$restaurants[$node->nid] = $node;

		return $restaurants;
	}

	public function getBar() {
		$query = new EntityFieldQuery();
		$query->entityCondition('entity_type', 'node')
			->entityCondition('bundle', 'bar')
			->propertyCondition('status', 1)
			->propertyCondition('language', $this->language->language)
			->fieldCondition('field_hotel', 'target_id', $this->hotel_nid)
			->range(0, 1);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');

		return current($nodes);
	}

	public function getCuisineHighlights() {
		$query = new EntityFieldQuery();
		$query->entityCondition('entity_type', 'node')
			->entityCondition('bundle', 'cuisine')
			->propertyCondition('status', 1)
			->propertyCondition('language', $this->language->language)
			->fieldCondition('field_hotel', 'target_id', $this->hotel_nid)
			->range(0, 4);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');

		$cuisine = array();
		foreach ($nodes as $node) {
			$cuisine[$node->nid]['image'] = array(
				'uri' => $node->field_cuisine_image['und'][0]['uri'],
				'alt' => $node->field_cuisine_image['und'][0]['alt'],
				'title' => $node->field_cuisine_image['und'][0]['title'],
			);
			$cuisine[$node->nid]['title'] = $node->title;

			if (isset($node->field_cuisine_pdf['und'])) {
				$cuisine[$node->nid]['link'] = file_create_url($node->field_cuisine_pdf['und'][0]['uri']);
				$cuisine[$node->nid]['target'] = '_blank';
			}
			elseif (isset($node->field_cuisine_link['und']))
				$cuisine[$node->nid]['link'] = $node->field_cuisine_link['und'][0]['url'];
		}

		return $cuisine;
	}

	public function getDestinationHighlights() {
		$query = new EntityFieldQuery();
		$query->entityCondition('entity_type', 'node')
			->entityCondition('bundle', 'destination')
			->propertyCondition('status', 1)
			->propertyCondition('language', $this->language->language)
			->fieldCondition('field_hotel', 'target_id', $this->hotel_nid);

		$result = $query->execute();
		$nodes = node_load_multiple(array_keys($result['node']), '');

		$destinations = array();
		foreach ($nodes as $node) {
			$dtid = $node->field_destination_type['und'][0]['tid'];
			$tax = taxonomy_term_load($dtid);

			$icon = array(
				'#theme' => 'icon',
				'#bundle' => $tax->field_destination_icon['und'][0]['bundle'],
				'#icon' => $tax->field_destination_icon['und'][0]['icon'],
				'#attributes' => array(
					'class' => array('white')
				),
			);

			$icon_hover = array(
				'#theme' => 'icon',
				'#bundle' => $tax->field_destination_icon_hover['und'][0]['bundle'],
				'#icon' => $tax->field_destination_icon_hover['und'][0]['icon'],
				'#attributes' => array(
					'class' => array('black')
				),
			);

			$destinations[$node->nid] = array(
				'title' => $node->title,
				'link' => url("node/{$node->nid}"),
				'image' => $node->field_destination_image['und'][0]['uri'],
				'icon' => render($icon),
				'icon_hover' => render($icon_hover),
			);
		}

		return $destinations;
	}

	public function getHighlights() {
		$tax = taxonomy_get_term_by_name('highlights', 'tags');

		$vocabulary = taxonomy_vocabulary_machine_name_load('tags');
		if ($vocabulary)
			foreach (taxonomy_get_tree($vocabulary->vid) as $term)
				if (strtolower($term->name) == 'highlights') {
					$highlights_tid = $term->tid;
					break;
				}

		$query = new EntityFieldQuery();
		$entities = $query->entityCondition('entity_type', 'node')
			->entityCondition('bundle', array('bar', 'restaurant', 'room', 'function_rooms'))
			->propertyCondition('status', 1)
			->propertyCondition('language', $this->language->language)
			->fieldCondition('field_hotel', 'target_id', $this->hotel_nid)
			->fieldCondition('field_tag', 'tid', $highlights_tid);

		$entities->execute();

		$nids = array();
		foreach ($entities->ordered_results as $entity)
			$nids[] = $entity->entity_id;

		$highlights = array();
		foreach (node_load_multiple($nids) as $node) {
			foreach (array('restaurant', 'bar', 'function_room', 'room') as $type) {
				$field = "field_{$type}_image";
				if (isset($node->$field)) {
					$image_uri = $node->{$field}['und'][0]['uri'];
					break;
				}
			}

			$highlights[$node->nid] = array(
				'image' => $image_uri,
				'title' => $node->title,
				'text' => $node->field_highlight_text['und'][0]['value'],
			);

			if (isset($node->field_highlight_url['und']))
				$highlights[$node->nid]['link'] = $node->field_highlight_url['und'][0]['value'];
			else
				$highlights[$node->nid]['link'] = url("node/{$node->nid}");
		}

		return $highlights;
	}

	public function getExperiences() {
		$query = db_select('node', 'node');

		$query->join('field_data_field_experience_image', 'field_image', 'field_image.entity_id = node.nid');
		$query->join('file_managed', 'image', 'image.fid = field_image.field_experience_image_fid');
		$query->join('weight_weights', 'weight', 'weight.entity_id = node.nid');

		$query = $query->fields('node', array('nid', 'title'))
			->fields('image', array('uri'))
			->condition('node.status', 1)
			->condition('node.type', 'experience')
			->condition('node.language', $this->language->language);

		if ($this->hotel_nid) {
			$query->join('field_data_field_hotel', 'hotel', 'hotel.entity_id = node.nid');
			$query = $query->condition('hotel.field_hotel_target_id', $this->hotel_nid);
		}

		$result = $query->orderBy('weight.weight', 'ASC')
			->orderBy('node.title', 'ASC')
			->execute();

		$experiences = array();
		foreach ($result as $row)
			$experiences[] = array(
				'image' => image_style_url('experience_highlights', $row->uri),
				'title' => $row->title,
				'url' => url("node/{$row->nid}"),
			);

		return $experiences;
	}

	public function getHotels() {
		$query = db_select('node', 'node');

		$query->join('field_data_field_hotel_city', 'city', 'city.entity_id = node.nid');
		$query->join('taxonomy_term_data', 'term', 'term.tid = city.field_hotel_city_target_id');
		$query->join('weight_weights', 'weight', 'weight.entity_id = node.nid');

		$result = $query->fields('node', array('nid', 'title'))
			->fields('term', array('name'))
			->condition('node.status', 1)
			->condition('node.type', 'hotel')
			->condition('node.language', $this->language->language)
			->orderBy('term.weight', 'ASC')
			->orderBy('weight.weight', 'ASC')
			->orderBy('node.title', 'ASC')
			->execute();

		$hotels = array();
		foreach ($result as $row)
			$hotels[$row->name][] = array(
				'nid' => $row->nid,
				'name' => $row->title,
				'path' => url("node/{$row->nid}"),
			);

		return $hotels;
	}
}
