"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var http_client_1 = require("nativescript-angular/http-client");
var app_routing_1 = require("~/app.routing");
var app_component_1 = require("~/app.component");
var enroll_service_1 = require("~/services/enroll.service");
var enrollment_component_1 = require("~/mobile/enrollment/enrollment.component");
var forms_2 = require("@angular/forms");
var pt_1 = require("@angular/common/locales/pt");
var common_1 = require("@angular/common");
var transaction_service_1 = require("~/services/transaction.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var global_event_manager_1 = require("~/services/global-event-manager");
common_1.registerLocaleData(pt_1.default);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            imports: [nativescript_module_1.NativeScriptModule, forms_1.NativeScriptFormsModule, http_client_1.NativeScriptHttpClientModule, app_routing_1.AppRoutingModule, forms_2.ReactiveFormsModule],
            declarations: [app_component_1.AppComponent, enrollment_component_1.EnrollmentComponent],
            providers: [
                enroll_service_1.EnrollService,
                transaction_service_1.TransactionService,
                dialogs_1.ModalDialogService,
                global_event_manager_1.GlobalEventManager,
                {
                    provide: core_1.LOCALE_ID,
                    useValue: 'pt-BR'
                }
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0U7QUFDdEUsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxnRUFBZ0Y7QUFFaEYsNkNBQWlEO0FBQ2pELGlEQUErQztBQUMvQyw0REFBMEQ7QUFDMUQsaUZBQStFO0FBQy9FLHdDQUFxRDtBQUNyRCxpREFBOEM7QUFDOUMsMENBQXFEO0FBQ3JELHNFQUFvRTtBQUNwRSxtRUFBNkU7QUFDN0Usd0VBQXFFO0FBRXJFLDJCQUFrQixDQUFDLFlBQUksQ0FBQyxDQUFDO0FBa0J6QjtJQUFBO0lBQXdCLENBQUM7SUFBWixTQUFTO1FBaEJyQixlQUFRLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLHdDQUFrQixFQUFFLCtCQUF1QixFQUFFLDBDQUE0QixFQUFFLDhCQUFnQixFQUFFLDJCQUFtQixDQUFDO1lBQzNILFlBQVksRUFBRSxDQUFDLDRCQUFZLEVBQUUsMENBQW1CLENBQUM7WUFDakQsU0FBUyxFQUFFO2dCQUNULDhCQUFhO2dCQUNiLHdDQUFrQjtnQkFDbEIsNEJBQWtCO2dCQUNsQix5Q0FBa0I7Z0JBQ2xCO29CQUNFLE9BQU8sRUFBRSxnQkFBUztvQkFDbEIsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0Y7WUFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztTQUM1QixDQUFDO09BQ1csU0FBUyxDQUFHO0lBQUQsZ0JBQUM7Q0FBQSxBQUF6QixJQUF5QjtBQUFaLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIExPQ0FMRV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudCc7XG5cbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICd+L2FwcC5yb3V0aW5nJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJ34vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbnJvbGxTZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy9lbnJvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBFbnJvbGxtZW50Q29tcG9uZW50IH0gZnJvbSAnfi9tb2JpbGUvZW5yb2xsbWVudC9lbnJvbGxtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHB0QnIgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvcHQnO1xuaW1wb3J0IHsgcmVnaXN0ZXJMb2NhbGVEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vc2VydmljZXMvdHJhbnNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3MnO1xuaW1wb3J0IHsgR2xvYmFsRXZlbnRNYW5hZ2VyIH0gZnJvbSAnfi9zZXJ2aWNlcy9nbG9iYWwtZXZlbnQtbWFuYWdlcic7XG5cbnJlZ2lzdGVyTG9jYWxlRGF0YShwdEJyKTtcblxuQE5nTW9kdWxlKHtcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW05hdGl2ZVNjcmlwdE1vZHVsZSwgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsIEFwcFJvdXRpbmdNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnQsIEVucm9sbG1lbnRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFbnJvbGxTZXJ2aWNlLFxuICAgIFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgR2xvYmFsRXZlbnRNYW5hZ2VyLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IExPQ0FMRV9JRCxcbiAgICAgIHVzZVZhbHVlOiAncHQtQlInXG4gICAgfVxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iXX0=