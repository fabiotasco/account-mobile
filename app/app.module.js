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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0U7QUFDdEUsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxnRUFBZ0Y7QUFFaEYsNkNBQWlEO0FBQ2pELGlEQUErQztBQUMvQyw0REFBMEQ7QUFDMUQsaUZBQStFO0FBQy9FLHdDQUFxRDtBQUNyRCxpREFBOEM7QUFDOUMsMENBQXFEO0FBQ3JELHNFQUFvRTtBQUNwRSxtRUFBNkU7QUFFN0UsMkJBQWtCLENBQUMsWUFBSSxDQUFDLENBQUM7QUFpQnpCO0lBQUE7SUFBd0IsQ0FBQztJQUFaLFNBQVM7UUFmckIsZUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyx3Q0FBa0IsRUFBRSwrQkFBdUIsRUFBRSwwQ0FBNEIsRUFBRSw4QkFBZ0IsRUFBRSwyQkFBbUIsQ0FBQztZQUMzSCxZQUFZLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDBDQUFtQixDQUFDO1lBQ2pELFNBQVMsRUFBRTtnQkFDVCw4QkFBYTtnQkFDYix3Q0FBa0I7Z0JBQ2xCLDRCQUFrQjtnQkFDbEI7b0JBQ0UsT0FBTyxFQUFFLGdCQUFTO29CQUNsQixRQUFRLEVBQUUsT0FBTztpQkFDbEI7YUFDRjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxTQUFTLENBQUc7SUFBRCxnQkFBQztDQUFBLEFBQXpCLElBQXlCO0FBQVosOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50JztcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gJ34vYXBwLnJvdXRpbmcnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnfi9hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IEVucm9sbFNlcnZpY2UgfSBmcm9tICd+L3NlcnZpY2VzL2Vucm9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IEVucm9sbG1lbnRDb21wb25lbnQgfSBmcm9tICd+L21vYmlsZS9lbnJvbGxtZW50L2Vucm9sbG1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgcHRCciBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy9wdCc7XG5pbXBvcnQgeyByZWdpc3RlckxvY2FsZURhdGEgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy90cmFuc2FjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9ncyc7XG5cbnJlZ2lzdGVyTG9jYWxlRGF0YShwdEJyKTtcblxuQE5nTW9kdWxlKHtcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW05hdGl2ZVNjcmlwdE1vZHVsZSwgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsIEFwcFJvdXRpbmdNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnQsIEVucm9sbG1lbnRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFbnJvbGxTZXJ2aWNlLFxuICAgIFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTE9DQUxFX0lELFxuICAgICAgdXNlVmFsdWU6ICdwdC1CUidcbiAgICB9XG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==