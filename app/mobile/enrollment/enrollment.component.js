"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform/platform");
var Permissions = require("nativescript-permissions");
var nativescript_telephony_1 = require("nativescript-telephony");
var sim_card_data_1 = require("~/canonicals/sim-card-data");
var enroll_service_1 = require("~/services/enroll.service");
var page_1 = require("ui/page");
var forms_1 = require("@angular/forms");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("tns-core-modules/application-settings");
var constants_1 = require("~/canonicals/constants");
var Toast = require("nativescript-toast");
var platform_2 = require("tns-core-modules/platform");
var EnrollmentComponent = /** @class */ (function () {
    function EnrollmentComponent(fb, page, enrollService, router) {
        this.fb = fb;
        this.page = page;
        this.enrollService = enrollService;
        this.router = router;
    }
    EnrollmentComponent.prototype.ngOnInit = function () {
        this.permissionDenied = false;
        this.page.actionBarHidden = true;
        this.enrollForm = this.fb.group({
            phoneDDI: ['', forms_1.Validators.required],
            phoneNumber: ['', forms_1.Validators.required]
        });
        var userLogged = application_settings_1.getString(constants_1.userSession, '');
        if (!userLogged) {
            this.getReadSimCardDataPermission();
            return;
        }
        var account = JSON.parse(application_settings_1.getString(constants_1.userSession, ''));
        var simData = new sim_card_data_1.SimCardData();
        simData.phoneNumber = account.pan;
        this.doEnroll(simData);
    };
    EnrollmentComponent.prototype.sendToEnroll = function () {
        if (this.enrollForm.valid) {
            var simCardData = new sim_card_data_1.SimCardData();
            var formValues = this.enrollForm.value;
            simCardData.phoneNumber = "+" + formValues.phoneDDI + formValues.phoneNumber;
            simCardData.deviceId = platform_2.device.uuid;
            simCardData.deviceSoftwareVersion = platform_2.device.osVersion;
            this.doEnroll(simCardData);
            return;
        }
        Toast.makeText('O Número informado é invalido. Tente novamente', '3000').show();
    };
    EnrollmentComponent.prototype.toNextField = function (fieldName) {
        var field = this.page.getViewById(fieldName);
        field.focus();
    };
    EnrollmentComponent.prototype.getReadSimCardDataPermission = function () {
        var _this = this;
        if (platform_1.isAndroid) {
            var readPhoneStatePermission = android.Manifest.permission.READ_PHONE_STATE;
            if (!Permissions.hasPermission(readPhoneStatePermission)) {
                Permissions.requestPermission(readPhoneStatePermission)
                    .then(function () {
                    _this.readSimCardData();
                })
                    .catch(function () {
                    _this.permissionDenied = true;
                });
            }
            else {
                // Se app já possui a permissão, faz a leitura.
                this.readSimCardData();
            }
        }
        else {
            // Não é necessário solicitar permissões no iOS, então faz a leitura.
            this.readSimCardData();
        }
    };
    EnrollmentComponent.prototype.readSimCardData = function () {
        var _this = this;
        nativescript_telephony_1.Telephony()
            .then(function (result) {
            var json = JSON.stringify(result);
            var simCardData = Object.assign(new sim_card_data_1.SimCardData(), JSON.parse(json));
            if (simCardData.phoneNumber == null) {
                Toast.makeText('Não foi possivel obter os dados do seu dispositivo', '3000').show();
                _this.permissionDenied = true;
            }
            else {
                _this.doEnroll(simCardData);
            }
        })
            .catch(function (error) {
            Toast.makeText('Não foi possivel obter os dados do seu dispositivo', '3000').show();
            _this.permissionDenied = true;
        });
    };
    EnrollmentComponent.prototype.doEnroll = function (simCardData) {
        var _this = this;
        this.enrollService.enroll(simCardData).subscribe(function (result) {
            application_settings_1.setString(constants_1.userSession, JSON.stringify(result.content));
            application_settings_1.setString(constants_1.simDataSession, JSON.stringify(simCardData));
            _this.goToDashBoard(JSON.stringify(result));
        }, function (error) {
            Toast.makeText('Não foi possivel obter os dados do seu dispositivo', '3000').show();
            _this.permissionDenied = true;
        });
    };
    EnrollmentComponent.prototype.goToDashBoard = function (user) {
        this.router.navigate(['dashboard'], {
            queryParams: {
                userLogged: user
            },
            clearHistory: true
        });
    };
    EnrollmentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-enrollment',
            templateUrl: './enrollment.component.html',
            styleUrls: ['./enrollment.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, page_1.Page, enroll_service_1.EnrollService, router_1.RouterExtensions])
    ], EnrollmentComponent);
    return EnrollmentComponent;
}());
exports.EnrollmentComponent = EnrollmentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFDL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQUNuRCw0REFBeUQ7QUFDekQsNERBQTBEO0FBQzFELGdDQUErQjtBQUMvQix3Q0FBb0U7QUFDcEUsc0RBQStEO0FBQy9ELDhFQUE2RTtBQUU3RSxvREFBcUU7QUFDckUsMENBQTRDO0FBQzVDLHNEQUFtRDtBQVduRDtJQUlFLDZCQUFvQixFQUFlLEVBQVUsSUFBVSxFQUFVLGFBQTRCLEVBQVUsTUFBd0I7UUFBM0csT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUVuSSxzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUM5QixRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3ZDLENBQUMsQ0FBQztRQUVILElBQU0sVUFBVSxHQUFHLGdDQUFTLENBQUMsdUJBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDO1FBQ1QsQ0FBQztR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QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBM0dVLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUMxQyxDQUFDO3lDQUt3QixtQkFBVyxFQUFnQixXQUFJLEVBQXlCLDhCQUFhLEVBQWtCLHlCQUFnQjtPQUpwSCxtQkFBbUIsQ0E0Ry9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVHRCxJQTRHQztBQTVHWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybSc7XG5pbXBvcnQgKiBhcyBQZXJtaXNzaW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgVGVsZXBob255IH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVwaG9ueSc7XG5pbXBvcnQgeyBTaW1DYXJkRGF0YSB9IGZyb20gJ34vY2Fub25pY2Fscy9zaW0tY2FyZC1kYXRhJztcbmltcG9ydCB7IEVucm9sbFNlcnZpY2UgfSBmcm9tICd+L3NlcnZpY2VzL2Vucm9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgdXNlclNlc3Npb24sIHNpbURhdGFTZXNzaW9uIH0gZnJvbSAnfi9jYW5vbmljYWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tICduYXRpdmVzY3JpcHQtdG9hc3QnO1xuaW1wb3J0IHsgZGV2aWNlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L21vZGVscy9hY2NvdW50JztcbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXBwLWVucm9sbG1lbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZW5yb2xsbWVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Vucm9sbG1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVucm9sbG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlbnJvbGxGb3JtOiBGb3JtR3JvdXA7XG4gIHBlcm1pc3Npb25EZW5pZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBlbnJvbGxTZXJ2aWNlOiBFbnJvbGxTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucykge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBlcm1pc3Npb25EZW5pZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblxuICAgIHRoaXMuZW5yb2xsRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgcGhvbmVEREk6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBwaG9uZU51bWJlcjogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckxvZ2dlZCA9IGdldFN0cmluZyh1c2VyU2Vzc2lvbiwgJycpO1xuICAgIGlmICghdXNlckxvZ2dlZCkge1xuICAgICAgdGhpcy5nZXRSZWFkU2ltQ2FyZERhdGFQZXJtaXNzaW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWNjb3VudDogQWNjb3VudCA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKHVzZXJTZXNzaW9uLCAnJykpO1xuICAgIGNvbnN0IHNpbURhdGEgPSBuZXcgU2ltQ2FyZERhdGEoKTtcbiAgICBzaW1EYXRhLnBob25lTnVtYmVyID0gYWNjb3VudC5wYW47XG4gICAgdGhpcy5kb0Vucm9sbChzaW1EYXRhKTtcbiAgfVxuXG4gIHNlbmRUb0Vucm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbnJvbGxGb3JtLnZhbGlkKSB7XG4gICAgICBjb25zdCBzaW1DYXJkRGF0YSA9IG5ldyBTaW1DYXJkRGF0YSgpO1xuICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IHRoaXMuZW5yb2xsRm9ybS52YWx1ZTtcbiAgICAgIHNpbUNhcmREYXRhLnBob25lTnVtYmVyID0gYCske2Zvcm1WYWx1ZXMucGhvbmVEREl9JHtmb3JtVmFsdWVzLnBob25lTnVtYmVyfWA7XG4gICAgICBzaW1DYXJkRGF0YS5kZXZpY2VJZCA9IGRldmljZS51dWlkO1xuICAgICAgc2ltQ2FyZERhdGEuZGV2aWNlU29mdHdhcmVWZXJzaW9uID0gZGV2aWNlLm9zVmVyc2lvbjtcblxuICAgICAgdGhpcy5kb0Vucm9sbChzaW1DYXJkRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFRvYXN0Lm1ha2VUZXh0KCdPIE7Dum1lcm8gaW5mb3JtYWRvIMOpIGludmFsaWRvLiBUZW50ZSBub3ZhbWVudGUnLCAnMzAwMCcpLnNob3coKTtcbiAgfVxuXG4gIHRvTmV4dEZpZWxkKGZpZWxkTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChmaWVsZE5hbWUpO1xuICAgIGZpZWxkLmZvY3VzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFJlYWRTaW1DYXJkRGF0YVBlcm1pc3Npb24oKTogdm9pZCB7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdmFyIHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbiA9IGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX1BIT05FX1NUQVRFO1xuICAgICAgaWYgKCFQZXJtaXNzaW9ucy5oYXNQZXJtaXNzaW9uKHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbikpIHtcbiAgICAgICAgUGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNlIGFwcCBqw6EgcG9zc3VpIGEgcGVybWlzc8OjbywgZmF6IGEgbGVpdHVyYS5cbiAgICAgICAgdGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTsOjbyDDqSBuZWNlc3PDoXJpbyBzb2xpY2l0YXIgcGVybWlzc8O1ZXMgbm8gaU9TLCBlbnTDo28gZmF6IGEgbGVpdHVyYS5cbiAgICAgIHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWFkU2ltQ2FyZERhdGEoKTogdm9pZCB7XG4gICAgVGVsZXBob255KClcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcblxuICAgICAgICBsZXQgc2ltQ2FyZERhdGEgPSBPYmplY3QuYXNzaWduKG5ldyBTaW1DYXJkRGF0YSgpLCBKU09OLnBhcnNlKGpzb24pKTtcbiAgICAgICAgaWYgKHNpbUNhcmREYXRhLnBob25lTnVtYmVyID09IG51bGwpIHtcbiAgICAgICAgICBUb2FzdC5tYWtlVGV4dCgnTsOjbyBmb2kgcG9zc2l2ZWwgb2J0ZXIgb3MgZGFkb3MgZG8gc2V1IGRpc3Bvc2l0aXZvJywgJzMwMDAnKS5zaG93KCk7XG4gICAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRvRW5yb2xsKHNpbUNhcmREYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KCdOw6NvIGZvaSBwb3NzaXZlbCBvYnRlciBvcyBkYWRvcyBkbyBzZXUgZGlzcG9zaXRpdm8nLCAnMzAwMCcpLnNob3coKTtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0Vucm9sbChzaW1DYXJkRGF0YTogU2ltQ2FyZERhdGEpOiB2b2lkIHtcbiAgICB0aGlzLmVucm9sbFNlcnZpY2UuZW5yb2xsKHNpbUNhcmREYXRhKS5zdWJzY3JpYmUoXG4gICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgc2V0U3RyaW5nKHVzZXJTZXNzaW9uLCBKU09OLnN0cmluZ2lmeShyZXN1bHQuY29udGVudCkpO1xuICAgICAgICBzZXRTdHJpbmcoc2ltRGF0YVNlc3Npb24sIEpTT04uc3RyaW5naWZ5KHNpbUNhcmREYXRhKSk7XG4gICAgICAgIHRoaXMuZ29Ub0Rhc2hCb2FyZChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KCdOw6NvIGZvaSBwb3NzaXZlbCBvYnRlciBvcyBkYWRvcyBkbyBzZXUgZGlzcG9zaXRpdm8nLCAnMzAwMCcpLnNob3coKTtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvRGFzaEJvYXJkKHVzZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnZGFzaGJvYXJkJ10sIHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIHVzZXJMb2dnZWQ6IHVzZXJcbiAgICAgIH0sXG4gICAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuIl19