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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0U7QUFDdEUsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxnRUFBZ0Y7QUFDaEYsNkNBQWlEO0FBQ2pELGlEQUErQztBQUMvQyw0REFBMEQ7QUFDMUQsaUZBQStFO0FBQy9FLHdDQUFxRDtBQUNyRCxpREFBOEM7QUFDOUMsMENBQXFEO0FBQ3JELHNFQUFvRTtBQUNwRSxtRUFBNkU7QUFFN0UsMkJBQWtCLENBQUMsWUFBSSxDQUFDLENBQUM7QUFpQnpCO0lBQUE7SUFBd0IsQ0FBQztJQUFaLFNBQVM7UUFmckIsZUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyx3Q0FBa0IsRUFBRSwrQkFBdUIsRUFBRSwwQ0FBNEIsRUFBRSw4QkFBZ0IsRUFBRSwyQkFBbUIsQ0FBQztZQUMzSCxZQUFZLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDBDQUFtQixDQUFDO1lBQ2pELFNBQVMsRUFBRTtnQkFDVCw4QkFBYTtnQkFDYix3Q0FBa0I7Z0JBQ2xCLDRCQUFrQjtnQkFDbEI7b0JBQ0UsT0FBTyxFQUFFLGdCQUFTO29CQUNsQixRQUFRLEVBQUUsT0FBTztpQkFDbEI7YUFDRjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxTQUFTLENBQUc7SUFBRCxnQkFBQztDQUFBLEFBQXpCLElBQXlCO0FBQVosOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50JztcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICd+L2FwcC5yb3V0aW5nJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJ34vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbnJvbGxTZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy9lbnJvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBFbnJvbGxtZW50Q29tcG9uZW50IH0gZnJvbSAnfi9tb2JpbGUvZW5yb2xsbWVudC9lbnJvbGxtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHB0QnIgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvcHQnO1xuaW1wb3J0IHsgcmVnaXN0ZXJMb2NhbGVEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vc2VydmljZXMvdHJhbnNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3MnO1xuXG5yZWdpc3RlckxvY2FsZURhdGEocHRCcik7XG5cbkBOZ01vZHVsZSh7XG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRNb2R1bGUsIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLCBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLCBBcHBSb3V0aW5nTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50LCBFbnJvbGxtZW50Q29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRW5yb2xsU2VydmljZSxcbiAgICBUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IExPQ0FMRV9JRCxcbiAgICAgIHVzZVZhbHVlOiAncHQtQlInXG4gICAgfVxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iXX0=