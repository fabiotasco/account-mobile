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
            Toast.makeText('Não foi possivel conectar-se ao servidor. Tente mais tarde.', '5000').show();
            _this.permissionDenied = false;
            setTimeout(function () {
                nativescript_exit_1.exit();
            }, 4000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFDL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQUNuRCw0REFBeUQ7QUFDekQsNERBQTBEO0FBQzFELHNEQUFxRDtBQUNyRCx3Q0FBb0U7QUFDcEUsc0RBQStEO0FBQy9ELG1HQUFrRztBQUNsRyxvREFBcUU7QUFDckUsMENBQTRDO0FBQzVDLCtEQUE0RDtBQUk1RCx1REFBeUM7QUFVekM7SUFLRSw2QkFBb0IsRUFBZSxFQUFVLElBQVUsRUFBVSxhQUE0QixFQUFVLE1BQXdCO1FBQTNHLE9BQUUsR0FBRixFQUFFLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUYvSCxZQUFPLEdBQVksSUFBSSxDQUFDO0lBRTBHLENBQUM7SUFFbkksc0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWpDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDOUIsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ25DLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztTQUN2QyxDQUFDLENBQUM7UUFFSCxJQUFNLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLHVCQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyw0QkFB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QUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUUsSUFBSTthQUNqQjtZQUNELFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFoSFUsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzFDLENBQUM7eUNBTXdCLG1CQUFXLEVBQWdCLFdBQUksRUFBeUIsOEJBQWEsRUFBa0IseUJBQWdCO09BTHBILG1CQUFtQixDQWlIL0I7SUFBRCwwQkFBQztDQUFBLEFBakhELElBaUhDO0FBakhZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtL3BsYXRmb3JtJztcbmltcG9ydCAqIGFzIFBlcm1pc3Npb25zIGZyb20gJ25hdGl2ZXNjcmlwdC1wZXJtaXNzaW9ucyc7XG5pbXBvcnQgeyBUZWxlcGhvbnkgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXBob255JztcbmltcG9ydCB7IFNpbUNhcmREYXRhIH0gZnJvbSAnfi9jYW5vbmljYWxzL3NpbS1jYXJkLWRhdGEnO1xuaW1wb3J0IHsgRW5yb2xsU2VydmljZSB9IGZyb20gJ34vc2VydmljZXMvZW5yb2xsLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyB1c2VyU2Vzc2lvbiwgc2ltRGF0YVNlc3Npb24gfSBmcm9tICd+L2Nhbm9uaWNhbHMvY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtL3BsYXRmb3JtJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L21vZGVscy9hY2NvdW50JztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgZXhpdCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1leGl0JztcblxuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhcHAtZW5yb2xsbWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9lbnJvbGxtZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZW5yb2xsbWVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW5yb2xsbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGVucm9sbEZvcm06IEZvcm1Hcm91cDtcbiAgcGVybWlzc2lvbkRlbmllZDogYm9vbGVhbjtcbiAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBlbnJvbGxTZXJ2aWNlOiBFbnJvbGxTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucykge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBlcm1pc3Npb25EZW5pZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblxuICAgIHRoaXMuZW5yb2xsRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgcGhvbmVEREk6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBwaG9uZU51bWJlcjogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckxvZ2dlZCA9IGdldFN0cmluZyh1c2VyU2Vzc2lvbiwgJycpO1xuICAgIGlmICghdXNlckxvZ2dlZCkge1xuICAgICAgdGhpcy5nZXRSZWFkU2ltQ2FyZERhdGFQZXJtaXNzaW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWNjb3VudDogQWNjb3VudCA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKHVzZXJTZXNzaW9uLCAnJykpO1xuICAgIGNvbnN0IHNpbURhdGEgPSBuZXcgU2ltQ2FyZERhdGEoKTtcbiAgICBzaW1EYXRhLnBob25lTnVtYmVyID0gYWNjb3VudC5wYW47XG4gICAgdGhpcy5kb0Vucm9sbChzaW1EYXRhKTtcbiAgfVxuXG4gIHNlbmRUb0Vucm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbnJvbGxGb3JtLnZhbGlkKSB7XG4gICAgICBjb25zdCBzaW1DYXJkRGF0YSA9IG5ldyBTaW1DYXJkRGF0YSgpO1xuICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IHRoaXMuZW5yb2xsRm9ybS52YWx1ZTtcbiAgICAgIHNpbUNhcmREYXRhLnBob25lTnVtYmVyID0gYCske2Zvcm1WYWx1ZXMucGhvbmVEREl9JHtmb3JtVmFsdWVzLnBob25lTnVtYmVyfWA7XG4gICAgICBzaW1DYXJkRGF0YS5kZXZpY2VJZCA9IGRldmljZS51dWlkO1xuICAgICAgc2ltQ2FyZERhdGEuZGV2aWNlU29mdHdhcmVWZXJzaW9uID0gZGV2aWNlLm9zVmVyc2lvbjtcblxuICAgICAgdGhpcy5kb0Vucm9sbChzaW1DYXJkRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFRvYXN0Lm1ha2VUZXh0KCdPIE7Dum1lcm8gaW5mb3JtYWRvIMOpIGludmFsaWRvLiBUZW50ZSBub3ZhbWVudGUnLCAnMzAwMCcpLnNob3coKTtcbiAgfVxuXG4gIHRvTmV4dEZpZWxkKGZpZWxkTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChmaWVsZE5hbWUpO1xuICAgIGZpZWxkLmZvY3VzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFJlYWRTaW1DYXJkRGF0YVBlcm1pc3Npb24oKTogdm9pZCB7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdmFyIHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbiA9IGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX1BIT05FX1NUQVRFO1xuICAgICAgaWYgKCFQZXJtaXNzaW9ucy5oYXNQZXJtaXNzaW9uKHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbikpIHtcbiAgICAgICAgUGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNlIGFwcCBqw6EgcG9zc3VpIGEgcGVybWlzc8OjbywgZmF6IGEgbGVpdHVyYS5cbiAgICAgICAgdGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTsOjbyDDqSBuZWNlc3PDoXJpbyBzb2xpY2l0YXIgcGVybWlzc8O1ZXMgbm8gaU9TLCBlbnTDo28gZmF6IGEgbGVpdHVyYS5cbiAgICAgIHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWFkU2ltQ2FyZERhdGEoKTogdm9pZCB7XG4gICAgVGVsZXBob255KClcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcblxuICAgICAgICBsZXQgc2ltQ2FyZERhdGEgPSBPYmplY3QuYXNzaWduKG5ldyBTaW1DYXJkRGF0YSgpLCBKU09OLnBhcnNlKGpzb24pKTtcbiAgICAgICAgaWYgKHNpbUNhcmREYXRhLnBob25lTnVtYmVyID09IG51bGwpIHtcbiAgICAgICAgICBUb2FzdC5tYWtlVGV4dCgnTsOjbyBmb2kgcG9zc2l2ZWwgb2J0ZXIgb3MgZGFkb3MgZG8gc2V1IGRpc3Bvc2l0aXZvJywgJzMwMDAnKS5zaG93KCk7XG4gICAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRvRW5yb2xsKHNpbUNhcmREYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KCdOw6NvIGZvaSBwb3NzaXZlbCBvYnRlciBvcyBkYWRvcyBkbyBzZXUgZGlzcG9zaXRpdm8nLCAnMzAwMCcpLnNob3coKTtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0Vucm9sbChzaW1DYXJkRGF0YTogU2ltQ2FyZERhdGEpOiB2b2lkIHtcbiAgICB0aGlzLmVucm9sbFNlcnZpY2UuZW5yb2xsKHNpbUNhcmREYXRhKS5zdWJzY3JpYmUoXG4gICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgc2V0U3RyaW5nKHVzZXJTZXNzaW9uLCBKU09OLnN0cmluZ2lmeShyZXN1bHQuY29udGVudCkpO1xuICAgICAgICBzZXRTdHJpbmcoc2ltRGF0YVNlc3Npb24sIEpTT04uc3RyaW5naWZ5KHNpbUNhcmREYXRhKSk7XG4gICAgICAgIHRoaXMuZ29Ub0Rhc2hCb2FyZChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KCdOw6NvIGZvaSBwb3NzaXZlbCBjb25lY3Rhci1zZSBhbyBzZXJ2aWRvci4gVGVudGUgbWFpcyB0YXJkZS4nLCAnNTAwMCcpLnNob3coKTtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVuaWVkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZXhpdCgpO1xuICAgICAgICB9LCA0MDAwKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvRGFzaEJvYXJkKHVzZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnZGFzaGJvYXJkJ10sIHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIHVzZXJMb2dnZWQ6IHVzZXJcbiAgICAgIH0sXG4gICAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuIl19