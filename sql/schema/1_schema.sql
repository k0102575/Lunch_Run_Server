-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- restaurant_category Table Create SQL
CREATE TABLE restaurant_category
(
    `id`     INT            NOT NULL    AUTO_INCREMENT, 
    `name`   VARCHAR(45)    NOT NULL, 
    `color`  VARCHAR(45)    NOT NULL, 
    PRIMARY KEY (id)
);


-- restaurant_category Table Create SQL
CREATE TABLE restaurant
(
    `id`               INT             NOT NULL    AUTO_INCREMENT, 
    `name`             VARCHAR(45)     NOT NULL, 
    `floor`            INT             NOT NULL, 
    `url`              VARCHAR(255)    NULL, 
    `lat`              FLOAT           NULL, 
    `lng`              FLOAT           NULL, 
    `address`          VARCHAR(255)    NULL, 
    `address_road`     VARCHAR(255)    NULL, 
    `delete_datetime`  DATETIME        NULL, 
    `category_id`      INT             NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE restaurant
    ADD CONSTRAINT FK_restaurant_category_id_restaurant_category_id FOREIGN KEY (category_id)
        REFERENCES restaurant_category (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- restaurant_category Table Create SQL
CREATE TABLE user
(
    `id`        INT            NOT NULL    AUTO_INCREMENT, 
    `email`     VARCHAR(45)    NOT NULL, 
    `password`  VARCHAR(45)    NOT NULL, 
    `alias`     VARCHAR(45)    NOT NULL, 
    `phone`     VARCHAR(45)    NOT NULL, 
    PRIMARY KEY (id)
);


-- restaurant_category Table Create SQL
CREATE TABLE review
(
    `id`               INT         NOT NULL    AUTO_INCREMENT, 
    `create_datetime`  DATETIME    NOT NULL, 
    `delete_datetime`  DATETIME    NULL, 
    `rating`           FLOAT       NOT NULL, 
    `comment`          TEXT        NULL, 
    `user_id`          INT         NOT NULL, 
    `restaurant_id`    INT         NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE review
    ADD CONSTRAINT FK_review_user_id_user_id FOREIGN KEY (user_id)
        REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE review
    ADD CONSTRAINT FK_review_restaurant_id_restaurant_id FOREIGN KEY (restaurant_id)
        REFERENCES restaurant (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- restaurant_category Table Create SQL
CREATE TABLE tag
(
    `id`    INT            NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(45)    NOT NULL, 
    PRIMARY KEY (id)
);


-- restaurant_category Table Create SQL
CREATE TABLE report_type
(
    `id`    INT            NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(45)    NULL, 
    PRIMARY KEY (id)
);


-- restaurant_category Table Create SQL
CREATE TABLE review_image
(
    `id`         INT             NOT NULL    AUTO_INCREMENT, 
    `url`        VARCHAR(255)    NOT NULL, 
    `review_id`  INT             NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE review_image
    ADD CONSTRAINT FK_review_image_review_id_review_id FOREIGN KEY (review_id)
        REFERENCES review (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- restaurant_category Table Create SQL
CREATE TABLE restaurant_tag
(
    `id`             INT    NOT NULL    AUTO_INCREMENT, 
    `tag_id`         INT    NOT NULL, 
    `restaurant_id`  INT    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE restaurant_tag
    ADD CONSTRAINT FK_restaurant_tag_tag_id_tag_id FOREIGN KEY (tag_id)
        REFERENCES tag (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE restaurant_tag
    ADD CONSTRAINT FK_restaurant_tag_restaurant_id_restaurant_id FOREIGN KEY (restaurant_id)
        REFERENCES restaurant (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- restaurant_category Table Create SQL
CREATE TABLE restaurant_favorite
(
    `id`             INT    NOT NULL    AUTO_INCREMENT, 
    `user_id`        INT    NOT NULL, 
    `restaurant_id`  INT    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE restaurant_favorite
    ADD CONSTRAINT FK_restaurant_favorite_user_id_user_id FOREIGN KEY (user_id)
        REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE restaurant_favorite
    ADD CONSTRAINT FK_restaurant_favorite_restaurant_id_restaurant_id FOREIGN KEY (restaurant_id)
        REFERENCES restaurant (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- restaurant_category Table Create SQL
CREATE TABLE restaurant_report
(
    `id`             INT     NOT NULL    AUTO_INCREMENT, 
    `content`        TEXT    NULL, 
    `user_id`        INT     NOT NULL, 
    `restaurant_id`  INT     NOT NULL, 
    `type_id`        INT     NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE restaurant_report
    ADD CONSTRAINT FK_restaurant_report_type_id_report_type_id FOREIGN KEY (type_id)
        REFERENCES report_type (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE restaurant_report
    ADD CONSTRAINT FK_restaurant_report_restaurant_id_restaurant_id FOREIGN KEY (restaurant_id)
        REFERENCES restaurant (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE restaurant_report
    ADD CONSTRAINT FK_restaurant_report_user_id_user_id FOREIGN KEY (user_id)
        REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


