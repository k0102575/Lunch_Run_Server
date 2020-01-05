import AuthMiddlewareService from "./AuthMiddlewareService";
import DatabaseService from "./server/DatabaseService";
import ErrorService from "./server/ErrorService";
import ServerService from "./server/ServerService";
import RestaurantService from './RestaurantService';
import RestaurantPointService from './RestaurantPointService'

export const authMiddlewareService = new AuthMiddlewareService();
export const dbService = new DatabaseService();
export const errorService = new ErrorService();
export const serverService = new ServerService();

export const restaurantService = new RestaurantService();
export const restaurantPointService = new RestaurantPointService();