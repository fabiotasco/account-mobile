"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform/platform");
var Permissions = require("nativescript-permissions");
var nativescript_telephony_1 = require("nativescript-telephony");
var sim_card_data_1 = require("~/canonicals/sim-card-data");
var enroll_service_1 = require("~/services/enroll.service");
var page_1 = require("tns-core-modules/ui/page/page");
var forms_1 = require("@angular/forms");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var constants_1 = require("~/canonicals/constants");
var Toast = require("nativescript-toast");
var platform_2 = require("tns-core-modules/platform/platform");
var nativescript_exit_1 = require("nativescript-exit");
var EnrollmentComponent = /** @class */ (function () {
    function EnrollmentComponent(fb, page, enrollService, router) {
        this.fb = fb;
        this.page = page;
        this.enrollService = enrollService;
        this.router = router;
        this.loading = true;
    }
    EnrollmentComponent.prototype.ngOnInit = function () {
        this.permissionDenied = false;
        this.page.actionBarHidden = true;
        this.enrollForm = this.fb.group({
            phoneDDI: ['', forms_1.Validators.required],
            phoneNumber: ['', forms_1.Validators.required]
        });
        var userSessionPan = application_settings_1.getString(constants_1.userSession, '');
        if (!userSessionPan) {
            this.getReadSimCardDataPermission();
            return;
        }
        var simData = new sim_card_data_1.SimCardData();
        simData.phoneNumber = userSessionPan;
        this.doEnroll(simData);
    };
    EnrollmentComponent.prototype.sendToEnroll = function () {
        if (this.enrollForm.valid) {
            var simCardData = new sim_card_data_1.SimCardData();
            var formValues = this.enrollForm.value;
            simCardData.phoneNumber = "+" + formValues.phoneDDI + formValues.phoneNumber;
            simCardData.deviceId = platform_2.device.uuid;
            simCardData.deviceSoftwareVersion = platform_2.device.osVersion;
            this.permissionDenied = false;
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
            application_settings_1.setString(constants_1.userSession, result.pan);
            _this.goToDashBoard();
        }, function (error) {
            Toast.makeText('Não foi possivel conectar-se ao servidor. Tente mais tarde.', '5000').show();
            _this.permissionDenied = false;
            setTimeout(function () {
                nativescript_exit_1.exit();
            }, 5000);
        });
    };
    EnrollmentComponent.prototype.goToDashBoard = function () {
        this.router.navigate(['dashboard'], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFDL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQUNuRCw0REFBeUQ7QUFDekQsNERBQTBEO0FBQzFELHNEQUFxRDtBQUNyRCx3Q0FBb0U7QUFDcEUsc0RBQStEO0FBQy9ELG1HQUFrRztBQUNsRyxvREFBcUU7QUFDckUsMENBQTRDO0FBQzVDLCtEQUE0RDtBQUk1RCx1REFBeUM7QUFVekM7SUFLRSw2QkFBb0IsRUFBZSxFQUFVLElBQVUsRUFBVSxhQUE0QixFQUFVLE1BQXdCO1FBQTNHLE9BQUUsR0FBRixFQUFFLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUYvSCxZQUFPLEdBQVksSUFBSSxDQUFDO0lBRTBHLENBQUM7SUFFbkksc0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWpDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDOUIsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ25DLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztTQUN2QyxDQUFDLENBQUM7UUFFSCxJQUFNLGNBQWMsR0FBRyxnQ0FBUyxDQUFDLHVCQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyw0QkFB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WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDMUMsQ0FBQzt5Q0FNd0IsbUJBQVcsRUFBZ0IsV0FBSSxFQUF5Qiw4QkFBYSxFQUFrQix5QkFBZ0I7T0FMcEgsbUJBQW1CLENBMkcvQjtJQUFELDBCQUFDO0NBQUEsQUEzR0QsSUEyR0M7QUEzR1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0vcGxhdGZvcm0nO1xuaW1wb3J0ICogYXMgUGVybWlzc2lvbnMgZnJvbSAnbmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zJztcbmltcG9ydCB7IFRlbGVwaG9ueSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcGhvbnknO1xuaW1wb3J0IHsgU2ltQ2FyZERhdGEgfSBmcm9tICd+L2Nhbm9uaWNhbHMvc2ltLWNhcmQtZGF0YSc7XG5pbXBvcnQgeyBFbnJvbGxTZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy9lbnJvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IHVzZXJTZXNzaW9uLCBzaW1EYXRhU2Vzc2lvbiB9IGZyb20gJ34vY2Fub25pY2Fscy9jb25zdGFudHMnO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcbmltcG9ydCB7IGRldmljZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0vcGxhdGZvcm0nO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vbW9kZWxzL2FjY291bnQnO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBleGl0IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWV4aXQnO1xuXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1lbnJvbGxtZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Vucm9sbG1lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lbnJvbGxtZW50LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFbnJvbGxtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZW5yb2xsRm9ybTogRm9ybUdyb3VwO1xuICBwZXJtaXNzaW9uRGVuaWVkOiBib29sZWFuO1xuICBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGVucm9sbFNlcnZpY2U6IEVucm9sbFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGVybWlzc2lvbkRlbmllZCA9IGZhbHNlO1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgdGhpcy5lbnJvbGxGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBwaG9uZURESTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHBob25lTnVtYmVyOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyU2Vzc2lvblBhbiA9IGdldFN0cmluZyh1c2VyU2Vzc2lvbiwgJycpO1xuICAgIGlmICghdXNlclNlc3Npb25QYW4pIHtcbiAgICAgIHRoaXMuZ2V0UmVhZFNpbUNhcmREYXRhUGVybWlzc2lvbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNpbURhdGEgPSBuZXcgU2ltQ2FyZERhdGEoKTtcbiAgICBzaW1EYXRhLnBob25lTnVtYmVyID0gdXNlclNlc3Npb25QYW47XG4gICAgdGhpcy5kb0Vucm9sbChzaW1EYXRhKTtcbiAgfVxuXG4gIHNlbmRUb0Vucm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbnJvbGxGb3JtLnZhbGlkKSB7XG4gICAgICBjb25zdCBzaW1DYXJkRGF0YSA9IG5ldyBTaW1DYXJkRGF0YSgpO1xuICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IHRoaXMuZW5yb2xsRm9ybS52YWx1ZTtcbiAgICAgIHNpbUNhcmREYXRhLnBob25lTnVtYmVyID0gYCske2Zvcm1WYWx1ZXMucGhvbmVEREl9JHtmb3JtVmFsdWVzLnBob25lTnVtYmVyfWA7XG4gICAgICBzaW1DYXJkRGF0YS5kZXZpY2VJZCA9IGRldmljZS51dWlkO1xuICAgICAgc2ltQ2FyZERhdGEuZGV2aWNlU29mdHdhcmVWZXJzaW9uID0gZGV2aWNlLm9zVmVyc2lvbjtcbiAgICAgIHRoaXMucGVybWlzc2lvbkRlbmllZCA9IGZhbHNlO1xuICAgICAgdGhpcy5kb0Vucm9sbChzaW1DYXJkRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFRvYXN0Lm1ha2VUZXh0KCdPIE7Dum1lcm8gaW5mb3JtYWRvIMOpIGludmFsaWRvLiBUZW50ZSBub3ZhbWVudGUnLCAnMzAwMCcpLnNob3coKTtcbiAgfVxuXG4gIHRvTmV4dEZpZWxkKGZpZWxkTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChmaWVsZE5hbWUpO1xuICAgIGZpZWxkLmZvY3VzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFJlYWRTaW1DYXJkRGF0YVBlcm1pc3Npb24oKTogdm9pZCB7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdmFyIHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbiA9IGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX1BIT05FX1NUQVRFO1xuICAgICAgaWYgKCFQZXJtaXNzaW9ucy5oYXNQZXJtaXNzaW9uKHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbikpIHtcbiAgICAgICAgUGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNlIGFwcCBqw6EgcG9zc3VpIGEgcGVybWlzc8OjbywgZmF6IGEgbGVpdHVyYS5cbiAgICAgICAgdGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTsOjbyDDqSBuZWNlc3PDoXJpbyBzb2xpY2l0YXIgcGVybWlzc8O1ZXMgbm8gaU9TLCBlbnTDo28gZmF6IGEgbGVpdHVyYS5cbiAgICAgIHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWFkU2ltQ2FyZERhdGEoKTogdm9pZCB7XG4gICAgVGVsZXBob255KClcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcblxuICAgICAgICBsZXQgc2ltQ2FyZERhdGEgPSBPYmplY3QuYXNzaWduKG5ldyBTaW1DYXJkRGF0YSgpLCBKU09OLnBhcnNlKGpzb24pKTtcbiAgICAgICAgaWYgKHNpbUNhcmREYXRhLnBob25lTnVtYmVyID09IG51bGwpIHtcbiAgICAgICAgICBUb2FzdC5tYWtlVGV4dCgnTsOjbyBmb2kgcG9zc2l2ZWwgb2J0ZXIgb3MgZGFkb3MgZG8gc2V1IGRpc3Bvc2l0aXZvJywgJzMwMDAnKS5zaG93KCk7XG4gICAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRvRW5yb2xsKHNpbUNhcmREYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KCdOw6NvIGZvaSBwb3NzaXZlbCBvYnRlciBvcyBkYWRvcyBkbyBzZXUgZGlzcG9zaXRpdm8nLCAnMzAwMCcpLnNob3coKTtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0Vucm9sbChzaW1DYXJkRGF0YTogU2ltQ2FyZERhdGEpOiB2b2lkIHtcbiAgICB0aGlzLmVucm9sbFNlcnZpY2UuZW5yb2xsKHNpbUNhcmREYXRhKS5zdWJzY3JpYmUoXG4gICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgc2V0U3RyaW5nKHVzZXJTZXNzaW9uLCByZXN1bHQucGFuKTtcbiAgICAgICAgdGhpcy5nb1RvRGFzaEJvYXJkKCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICBUb2FzdC5tYWtlVGV4dCgnTsOjbyBmb2kgcG9zc2l2ZWwgY29uZWN0YXItc2UgYW8gc2Vydmlkb3IuIFRlbnRlIG1haXMgdGFyZGUuJywgJzUwMDAnKS5zaG93KCk7XG4gICAgICAgIHRoaXMucGVybWlzc2lvbkRlbmllZCA9IGZhbHNlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBleGl0KCk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9EYXNoQm9hcmQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydkYXNoYm9hcmQnXSwge1xuICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==