DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_restaurant_list`$$

CREATE PROCEDURE `sp_restaurant_list`()

BEGIN

	SELECT * 
	FROM restaurant
	LIMIT 0, 10;

END$$

DELIMITER ;