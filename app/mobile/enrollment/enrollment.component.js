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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFDL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQUNuRCw0REFBeUQ7QUFDekQsNERBQTBEO0FBQzFELGdDQUErQjtBQUMvQix3Q0FBb0U7QUFDcEUsc0RBQStEO0FBQy9ELDhFQUE2RTtBQUU3RSxvREFBcUU7QUFDckUsMENBQTRDO0FBQzVDLHNEQUFtRDtBQWFuRDtJQUlFLDZCQUFvQixFQUFlLEVBQVUsSUFBVSxFQUFVLGFBQTRCLEVBQVUsTUFBd0I7UUFBM0csT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUVuSSxzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUM5QixRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3ZDLENBQUMsQ0FBQztRQUVILElBQU0sVUFBVSxHQUFHLGdDQUFTLENBQUMsdUJBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDO1FBQ1QsQ0FBQztR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QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBM0dVLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUMxQyxDQUFDO3lDQUt3QixtQkFBVyxFQUFnQixXQUFJLEVBQXlCLDhCQUFhLEVBQWtCLHlCQUFnQjtPQUpwSCxtQkFBbUIsQ0E0Ry9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVHRCxJQTRHQztBQTVHWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybSc7XG5pbXBvcnQgKiBhcyBQZXJtaXNzaW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgVGVsZXBob255IH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVwaG9ueSc7XG5pbXBvcnQgeyBTaW1DYXJkRGF0YSB9IGZyb20gJ34vY2Fub25pY2Fscy9zaW0tY2FyZC1kYXRhJztcbmltcG9ydCB7IEVucm9sbFNlcnZpY2UgfSBmcm9tICd+L3NlcnZpY2VzL2Vucm9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgdXNlclNlc3Npb24sIHNpbURhdGFTZXNzaW9uIH0gZnJvbSAnfi9jYW5vbmljYWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tICduYXRpdmVzY3JpcHQtdG9hc3QnO1xuaW1wb3J0IHsgZGV2aWNlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L21vZGVscy9hY2NvdW50JztcbmltcG9ydCAqIGFzIGRpYWxvZyBmcm9tICd1aS9kaWFsb2dzJztcblxuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhcHAtZW5yb2xsbWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9lbnJvbGxtZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZW5yb2xsbWVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW5yb2xsbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGVucm9sbEZvcm06IEZvcm1Hcm91cDtcbiAgcGVybWlzc2lvbkRlbmllZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGVucm9sbFNlcnZpY2U6IEVucm9sbFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGVybWlzc2lvbkRlbmllZCA9IGZhbHNlO1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgdGhpcy5lbnJvbGxGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBwaG9uZURESTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHBob25lTnVtYmVyOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyTG9nZ2VkID0gZ2V0U3RyaW5nKHVzZXJTZXNzaW9uLCAnJyk7XG4gICAgaWYgKCF1c2VyTG9nZ2VkKSB7XG4gICAgICB0aGlzLmdldFJlYWRTaW1DYXJkRGF0YVBlcm1pc3Npb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gSlNPTi5wYXJzZShnZXRTdHJpbmcodXNlclNlc3Npb24sICcnKSk7XG4gICAgY29uc3Qgc2ltRGF0YSA9IG5ldyBTaW1DYXJkRGF0YSgpO1xuICAgIHNpbURhdGEucGhvbmVOdW1iZXIgPSBhY2NvdW50LnBhbjtcbiAgICB0aGlzLmRvRW5yb2xsKHNpbURhdGEpO1xuICB9XG5cbiAgc2VuZFRvRW5yb2xsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVucm9sbEZvcm0udmFsaWQpIHtcbiAgICAgIGNvbnN0IHNpbUNhcmREYXRhID0gbmV3IFNpbUNhcmREYXRhKCk7XG4gICAgICBjb25zdCBmb3JtVmFsdWVzID0gdGhpcy5lbnJvbGxGb3JtLnZhbHVlO1xuICAgICAgc2ltQ2FyZERhdGEucGhvbmVOdW1iZXIgPSBgKyR7Zm9ybVZhbHVlcy5waG9uZURESX0ke2Zvcm1WYWx1ZXMucGhvbmVOdW1iZXJ9YDtcbiAgICAgIHNpbUNhcmREYXRhLmRldmljZUlkID0gZGV2aWNlLnV1aWQ7XG4gICAgICBzaW1DYXJkRGF0YS5kZXZpY2VTb2Z0d2FyZVZlcnNpb24gPSBkZXZpY2Uub3NWZXJzaW9uO1xuXG4gICAgICB0aGlzLmRvRW5yb2xsKHNpbUNhcmREYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgVG9hc3QubWFrZVRleHQoJ08gTsO6bWVybyBpbmZvcm1hZG8gw6kgaW52YWxpZG8uIFRlbnRlIG5vdmFtZW50ZScsICczMDAwJykuc2hvdygpO1xuICB9XG5cbiAgdG9OZXh0RmllbGQoZmllbGROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKGZpZWxkTmFtZSk7XG4gICAgZmllbGQuZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVhZFNpbUNhcmREYXRhUGVybWlzc2lvbigpOiB2b2lkIHtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB2YXIgcmVhZFBob25lU3RhdGVQZXJtaXNzaW9uID0gYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfUEhPTkVfU1RBVEU7XG4gICAgICBpZiAoIVBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKSkge1xuICAgICAgICBQZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbihyZWFkUGhvbmVTdGF0ZVBlcm1pc3Npb24pXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25EZW5pZWQgPSB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2UgYXBwIGrDoSBwb3NzdWkgYSBwZXJtaXNzw6NvLCBmYXogYSBsZWl0dXJhLlxuICAgICAgICB0aGlzLnJlYWRTaW1DYXJkRGF0YSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOw6NvIMOpIG5lY2Vzc8OhcmlvIHNvbGljaXRhciBwZXJtaXNzw7VlcyBubyBpT1MsIGVudMOjbyBmYXogYSBsZWl0dXJhLlxuICAgICAgdGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlYWRTaW1DYXJkRGF0YSgpOiB2b2lkIHtcbiAgICBUZWxlcGhvbnkoKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuXG4gICAgICAgIGxldCBzaW1DYXJkRGF0YSA9IE9iamVjdC5hc3NpZ24obmV3IFNpbUNhcmREYXRhKCksIEpTT04ucGFyc2UoanNvbikpO1xuICAgICAgICBpZiAoc2ltQ2FyZERhdGEucGhvbmVOdW1iZXIgPT0gbnVsbCkge1xuICAgICAgICAgIFRvYXN0Lm1ha2VUZXh0KCdOw6NvIGZvaSBwb3NzaXZlbCBvYnRlciBvcyBkYWRvcyBkbyBzZXUgZGlzcG9zaXRpdm8nLCAnMzAwMCcpLnNob3coKTtcbiAgICAgICAgICB0aGlzLnBlcm1pc3Npb25EZW5pZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZG9FbnJvbGwoc2ltQ2FyZERhdGEpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgVG9hc3QubWFrZVRleHQoJ07Do28gZm9pIHBvc3NpdmVsIG9idGVyIG9zIGRhZG9zIGRvIHNldSBkaXNwb3NpdGl2bycsICczMDAwJykuc2hvdygpO1xuICAgICAgICB0aGlzLnBlcm1pc3Npb25EZW5pZWQgPSB0cnVlO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRvRW5yb2xsKHNpbUNhcmREYXRhOiBTaW1DYXJkRGF0YSk6IHZvaWQge1xuICAgIHRoaXMuZW5yb2xsU2VydmljZS5lbnJvbGwoc2ltQ2FyZERhdGEpLnN1YnNjcmliZShcbiAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBzZXRTdHJpbmcodXNlclNlc3Npb24sIEpTT04uc3RyaW5naWZ5KHJlc3VsdC5jb250ZW50KSk7XG4gICAgICAgIHNldFN0cmluZyhzaW1EYXRhU2Vzc2lvbiwgSlNPTi5zdHJpbmdpZnkoc2ltQ2FyZERhdGEpKTtcbiAgICAgICAgdGhpcy5nb1RvRGFzaEJvYXJkKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgVG9hc3QubWFrZVRleHQoJ07Do28gZm9pIHBvc3NpdmVsIG9idGVyIG9zIGRhZG9zIGRvIHNldSBkaXNwb3NpdGl2bycsICczMDAwJykuc2hvdygpO1xuICAgICAgICB0aGlzLnBlcm1pc3Npb25EZW5pZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9EYXNoQm9hcmQodXNlcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydkYXNoYm9hcmQnXSwge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgdXNlckxvZ2dlZDogdXNlclxuICAgICAgfSxcbiAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG4iXX0=