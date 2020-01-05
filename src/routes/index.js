const addRouter = (router) => {
    return require(`./${router}`).default;
};

module.exports = {
    "auth": addRouter('AuthRouter'),
    "report/type": addRouter('ReportTypeRouter'),
    "restaurant/category": addRouter('RestaurantCategoryRouter'),
    "restaurant/favorite": addRouter('RestaurantFavoriteRouter'),
    "restaurant/point": addRouter('RestaurantPointRouter'),
    "restaurant/report": addRouter('RestaurantReportRouter'),
    "restaurant": addRouter('RestaurantRouter'),
    "review": addRouter('ReviewRouter'),
    "tag": addRouter('TagRouter'),
    "/": addRouter('ViewRouter'),
};

