"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var app_routing_1 = require("~/app.routing");
var app_component_1 = require("~/app.component");
var android_permission_service_1 = require("~/mobile/services/android-permission.service");
var read_sim_card_data_service_1 = require("~/mobile/services/read-sim-card-data.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_1.navigatableComponents),
            providers: [
                android_permission_service_1.AndroidPermissionService,
                read_sim_card_data_service_1.ReadSimCardDataService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFFbkUsNkNBQXdFO0FBQ3hFLGlEQUErQztBQUMvQywyRkFBd0Y7QUFDeEYsMkZBQXNGO0FBd0J0RjtJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBdEJyQixlQUFRLENBQUM7WUFDVCxTQUFTLEVBQUU7Z0JBQ1YsNEJBQVk7YUFDWjtZQUNELE9BQU8sRUFBRTtnQkFDUix3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDdkIsNkJBQXNCO2dCQUN0Qiw4QkFBZ0I7YUFDaEI7WUFDRCxZQUFZO2dCQUNYLDRCQUFZO3FCQUNULG1DQUFxQixDQUN4QjtZQUNELFNBQVMsRUFBRTtnQkFDVixxREFBd0I7Z0JBQ3hCLG1EQUFzQjthQUN0QjtZQUNELE9BQU8sRUFBRTtnQkFDUix1QkFBZ0I7YUFDaEI7U0FDRCxDQUFDO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSwgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIn4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFuZHJvaWRQZXJtaXNzaW9uU2VydmljZSB9IGZyb20gXCJ+L21vYmlsZS9zZXJ2aWNlcy9hbmRyb2lkLXBlcm1pc3Npb24uc2VydmljZVwiO1xuaW1wb3J0IHsgUmVhZFNpbUNhcmREYXRhU2VydmljZSB9IGZyb20gXCJ+L21vYmlsZS9zZXJ2aWNlcy9yZWFkLXNpbS1jYXJkLWRhdGEuc2VydmljZVwiO1xuXG5ATmdNb2R1bGUoe1xuXHRib290c3RyYXA6IFtcblx0XHRBcHBDb21wb25lbnRcblx0XSxcblx0aW1wb3J0czogW1xuXHRcdE5hdGl2ZVNjcmlwdE1vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuXHRcdEFwcFJvdXRpbmdNb2R1bGVcblx0XSxcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0QXBwQ29tcG9uZW50LFxuXHRcdC4uLm5hdmlnYXRhYmxlQ29tcG9uZW50c1xuXHRdLFxuXHRwcm92aWRlcnM6IFtcblx0XHRBbmRyb2lkUGVybWlzc2lvblNlcnZpY2UsXG5cdFx0UmVhZFNpbUNhcmREYXRhU2VydmljZVxuXHRdLFxuXHRzY2hlbWFzOiBbXG5cdFx0Tk9fRVJST1JTX1NDSEVNQVxuXHRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH0iXX0=