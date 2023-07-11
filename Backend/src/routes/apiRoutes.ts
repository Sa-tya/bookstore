import { masterRoutes } from "./masterRoutes";
import { BaseRoutes } from "./BaseRoutes";

/**
 * @description Defines routing for the app
 */

class ApiRoutes extends BaseRoutes {

    public path = '/api';
    public appPath = "/"
    constructor() {
        super();
        this.init();
    }

    private init() {

        // Mount Version 1 routes on this path
        this.router.use(masterRoutes.path, masterRoutes.routerinstance);
        this.router.use(masterRoutes.routerinstance);
    }
}

export const appAPI = new ApiRoutes();