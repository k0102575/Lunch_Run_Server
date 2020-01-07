import AuthMiddlewareService from "./AuthMiddlewareService";
import DatabaseService from "./server/DatabaseService";
import ErrorService from "./server/ErrorService";
import ServerService from "./server/ServerService";
import RestaurantService from './RestaurantService';
import RestaurantPointService from './RestaurantPointService'
import ReportTypeService from "./ReportTypeService";
import RestaurantCategoryService from './RestaurantCategoryService';
import TagService from './TagService';
import ReviewService from './ReviewService';
import RestaurantReportService from './RestaurantReportService'
import RestaurantFavoriteService from './RestaurantFavoriteService'

export const authMiddlewareService = new AuthMiddlewareService();
export const dbService = new DatabaseService();
export const errorService = new ErrorService();
export const serverService = new ServerService();

export const restaurantService = new RestaurantService();
export const restaurantPointService = new RestaurantPointService();
export const reportTypeService = new ReportTypeService();
export const restaurantCategoryService = new RestaurantCategoryService();
export const tagService = new TagService();
export const reviewService = new ReviewService();
export const restaurantReportService = new RestaurantReportService();
export const restaurantFavoriteService = new RestaurantFavoriteService();