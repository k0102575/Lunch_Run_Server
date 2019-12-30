ALTER TABLE restaurant_favorite ADD UNIQUE `unique_index`( `user_id`, `restaurant_id`);

ALTER TABLE restaurant_tag ADD UNIQUE `unique_index`( `restaurant_id`, `tag_id`);

ALTER TABLE restaurant_report ADD UNIQUE `unique_index`( `user_id`, `restaurant_id`, `type_id`);

