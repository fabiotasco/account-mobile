"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var http_client_1 = require("nativescript-angular/http-client");
var app_routing_1 = require("~/app.routing");
var app_component_1 = require("~/app.component");
var enroll_service_1 = require("~/services/enroll.service");
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
                http_client_1.NativeScriptHttpClientModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_1.navigatableComponents),
            providers: [
                enroll_service_1.EnrollService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxnRUFBZ0Y7QUFFaEYsNkNBQXdFO0FBQ3hFLGlEQUErQztBQUMvQyw0REFBMEQ7QUF1QjFEO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFyQnJCLGVBQVEsQ0FBQztZQUNULFNBQVMsRUFBRTtnQkFDViw0QkFBWTthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNSLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwwQ0FBNEI7Z0JBQzVCLDhCQUFnQjthQUNoQjtZQUNELFlBQVk7Z0JBQ1gsNEJBQVk7cUJBQ1QsbUNBQXFCLENBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNWLDhCQUFhO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ1IsdUJBQWdCO2FBQ2hCO1NBQ0QsQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwifi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIn4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRW5yb2xsU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2Vucm9sbC5zZXJ2aWNlXCI7XG5cbkBOZ01vZHVsZSh7XG5cdGJvb3RzdHJhcDogW1xuXHRcdEFwcENvbXBvbmVudFxuXHRdLFxuXHRpbXBvcnRzOiBbXG5cdFx0TmF0aXZlU2NyaXB0TW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG5cdFx0QXBwUm91dGluZ01vZHVsZVxuXHRdLFxuXHRkZWNsYXJhdGlvbnM6IFtcblx0XHRBcHBDb21wb25lbnQsXG5cdFx0Li4ubmF2aWdhdGFibGVDb21wb25lbnRzXG5cdF0sXG5cdHByb3ZpZGVyczogW1xuXHRcdEVucm9sbFNlcnZpY2Vcblx0XSxcblx0c2NoZW1hczogW1xuXHRcdE5PX0VSUk9SU19TQ0hFTUFcblx0XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9Il19