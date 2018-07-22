"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform/platform");
var android_permission_service_1 = require("~/mobile/services/android-permission.service");
var EnrollmentComponent = /** @class */ (function () {
    function EnrollmentComponent(androidPermissionService) {
        this.androidPermissionService = androidPermissionService;
    }
    EnrollmentComponent.prototype.ngOnInit = function () {
        if (platform_1.isAndroid) {
            this.androidPermissionService.requestPermission(android.Manifest.permission.READ_PHONE_STATE, this.androidPermissionCallback = {
                onComplete: function (hasPermission) {
                    console.log("Permission granted? " + hasPermission);
                }
            });
        }
    };
    EnrollmentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-enrollment',
            templateUrl: './enrollment.component.html',
            styleUrls: ['./enrollment.component.css']
        }),
        __metadata("design:paramtypes", [android_permission_service_1.AndroidPermissionService])
    ], EnrollmentComponent);
    return EnrollmentComponent;
}());
exports.EnrollmentComponent = EnrollmentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFDL0QsMkZBQXdGO0FBV3hGO0lBSUMsNkJBQW9CLHdCQUFrRDtRQUFsRCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQUksQ0FBQztJQUUzRSxzQ0FBUSxHQUFSO1FBQ0MsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixHQUFHO2dCQUM5SCxVQUFVLFlBQUMsYUFBYTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxhQUFhLENBQUMsQ0FBQztnQkFDckQsQ0FBQzthQUNELENBQUMsQ0FBQztRQUNKLENBQUM7SUFDRixDQUFDO0lBZFcsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7eUNBSzZDLHFEQUF3QjtPQUoxRCxtQkFBbUIsQ0FnQi9CO0lBQUQsMEJBQUM7Q0FBQSxBQWhCRCxJQWdCQztBQWhCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBBbmRyb2lkUGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICd+L21vYmlsZS9zZXJ2aWNlcy9hbmRyb2lkLXBlcm1pc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBBbmRyb2lkUGVybWlzc2lvbkNhbGxiYWNrIH0gZnJvbSAnfi9tb2JpbGUvY2FsbGJhY2tzL2FuZHJvaWQtcGVybWlzc2lvbi5jYWxsYmFjayc7XG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnYXBwLWVucm9sbG1lbnQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vZW5yb2xsbWVudC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2Vucm9sbG1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVucm9sbG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHByaXZhdGUgYW5kcm9pZFBlcm1pc3Npb25DYWxsYmFjazogQW5kcm9pZFBlcm1pc3Npb25DYWxsYmFjaztcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGFuZHJvaWRQZXJtaXNzaW9uU2VydmljZTogQW5kcm9pZFBlcm1pc3Npb25TZXJ2aWNlKSB7IH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiAoaXNBbmRyb2lkKSB7XG5cdFx0XHR0aGlzLmFuZHJvaWRQZXJtaXNzaW9uU2VydmljZS5yZXF1ZXN0UGVybWlzc2lvbihhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uUkVBRF9QSE9ORV9TVEFURSwgdGhpcy5hbmRyb2lkUGVybWlzc2lvbkNhbGxiYWNrID0ge1xuXHRcdFx0XHRvbkNvbXBsZXRlKGhhc1Blcm1pc3Npb24pIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlBlcm1pc3Npb24gZ3JhbnRlZD8gXCIgKyBoYXNQZXJtaXNzaW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cbn0iXX0=