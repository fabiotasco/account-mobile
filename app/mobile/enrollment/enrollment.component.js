"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform/platform");
var Permissions = require("nativescript-permissions");
var nativescript_telephony_1 = require("nativescript-telephony");
var sim_card_data_1 = require("~/canonicals/sim-card-data");
var EnrollmentComponent = /** @class */ (function () {
    function EnrollmentComponent() {
    }
    EnrollmentComponent.prototype.ngOnInit = function () {
        this.getReadSimCardDataPermission();
    };
    EnrollmentComponent.prototype.getReadSimCardDataPermission = function () {
        var _this = this;
        if (platform_1.isAndroid) {
            // Permissão necessária para ler os dados do SIM Card do cliente no Android.
            var readPhoneStatePermission = android.Manifest.permission.READ_PHONE_STATE;
            if (!Permissions.hasPermission(readPhoneStatePermission)) {
                Permissions.requestPermission(readPhoneStatePermission)
                    .then(function () {
                    console.log(readPhoneStatePermission + " granted!");
                    _this.readSimCardData();
                }).catch(function () {
                    console.error(readPhoneStatePermission + " denied!");
                    // TODO: requestPhoneNumber();
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
        nativescript_telephony_1.Telephony().then(function (result) {
            var json = JSON.stringify(result);
            console.log("SIM Card data resolved: " + json);
            var simCardData = Object.assign(new sim_card_data_1.SimCardData(), JSON.parse(json));
            if (simCardData.phoneNumber == null) {
                // TODO: requestPhoneNumber();
            }
            else {
                // TODO: Verifica a conta na API!
            }
        }).catch(function (error) {
            console.error("SIM Card data access threw an error: " + error);
            // TODO: requestPhoneNumber();
        });
    };
    EnrollmentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-enrollment',
            templateUrl: './enrollment.component.html',
            styleUrls: ['./enrollment.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], EnrollmentComponent);
    return EnrollmentComponent;
}());
exports.EnrollmentComponent = EnrollmentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFDL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQUNuRCw0REFBeUQ7QUFVekQ7SUFFQztJQUFnQixDQUFDO0lBRWpCLHNDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU8sMERBQTRCLEdBQXBDO1FBQUEsaUJBcUJDO1FBcEJBLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2YsNEVBQTRFO1lBQzVFLElBQUksd0JBQXdCLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7WUFDNUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxXQUFXLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLENBQUM7cUJBQ3JELElBQUksQ0FBQztvQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLFdBQVcsQ0FBQyxDQUFDO29CQUNwRCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLFVBQVUsQ0FBQyxDQUFDO29CQUNyRCw4QkFBOEI7Z0JBQy9CLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLCtDQUErQztnQkFDL0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDRixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxxRUFBcUU7WUFDckUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDRixDQUFDO0lBRU8sNkNBQWUsR0FBdkI7UUFDQyxrQ0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTTtZQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFL0MsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDJCQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyw4QkFBOEI7WUFDL0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLGlDQUFpQztZQUNsQyxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSztZQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxHQUFHLEtBQUssQ0FBQyxDQUFBO1lBQzlELDhCQUE4QjtRQUMvQixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUE5Q1csbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7O09BQ1csbUJBQW1CLENBZ0QvQjtJQUFELDBCQUFDO0NBQUEsQUFoREQsSUFnREM7QUFoRFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0vcGxhdGZvcm0nO1xuaW1wb3J0ICogYXMgUGVybWlzc2lvbnMgZnJvbSAnbmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zJztcbmltcG9ydCB7IFRlbGVwaG9ueSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcGhvbnknO1xuaW1wb3J0IHsgU2ltQ2FyZERhdGEgfSBmcm9tICd+L2Nhbm9uaWNhbHMvc2ltLWNhcmQtZGF0YSc7XG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnYXBwLWVucm9sbG1lbnQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vZW5yb2xsbWVudC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2Vucm9sbG1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVucm9sbG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdGNvbnN0cnVjdG9yKCkgeyB9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5nZXRSZWFkU2ltQ2FyZERhdGFQZXJtaXNzaW9uKCk7XG5cdH1cblxuXHRwcml2YXRlIGdldFJlYWRTaW1DYXJkRGF0YVBlcm1pc3Npb24oKTogdm9pZCB7XG5cdFx0aWYgKGlzQW5kcm9pZCkge1xuXHRcdFx0Ly8gUGVybWlzc8OjbyBuZWNlc3PDoXJpYSBwYXJhIGxlciBvcyBkYWRvcyBkbyBTSU0gQ2FyZCBkbyBjbGllbnRlIG5vIEFuZHJvaWQuXG5cdFx0XHR2YXIgcmVhZFBob25lU3RhdGVQZXJtaXNzaW9uID0gYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfUEhPTkVfU1RBVEU7XG5cdFx0XHRpZiAoIVBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKSkge1xuXHRcdFx0XHRQZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbihyZWFkUGhvbmVTdGF0ZVBlcm1pc3Npb24pXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uICsgXCIgZ3JhbnRlZCFcIik7XG5cdFx0XHRcdFx0XHR0aGlzLnJlYWRTaW1DYXJkRGF0YSgpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uICsgXCIgZGVuaWVkIVwiKTtcblx0XHRcdFx0XHRcdC8vIFRPRE86IHJlcXVlc3RQaG9uZU51bWJlcigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU2UgYXBwIGrDoSBwb3NzdWkgYSBwZXJtaXNzw6NvLCBmYXogYSBsZWl0dXJhLlxuXHRcdFx0XHR0aGlzLnJlYWRTaW1DYXJkRGF0YSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBOw6NvIMOpIG5lY2Vzc8OhcmlvIHNvbGljaXRhciBwZXJtaXNzw7VlcyBubyBpT1MsIGVudMOjbyBmYXogYSBsZWl0dXJhLlxuXHRcdFx0dGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlYWRTaW1DYXJkRGF0YSgpOiB2b2lkIHtcblx0XHRUZWxlcGhvbnkoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcblx0XHRcdGNvbnNvbGUubG9nKFwiU0lNIENhcmQgZGF0YSByZXNvbHZlZDogXCIgKyBqc29uKTtcblxuXHRcdFx0bGV0IHNpbUNhcmREYXRhID0gT2JqZWN0LmFzc2lnbihuZXcgU2ltQ2FyZERhdGEoKSwgSlNPTi5wYXJzZShqc29uKSk7XG5cdFx0XHRpZiAoc2ltQ2FyZERhdGEucGhvbmVOdW1iZXIgPT0gbnVsbCkge1xuXHRcdFx0XHQvLyBUT0RPOiByZXF1ZXN0UGhvbmVOdW1iZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFRPRE86IFZlcmlmaWNhIGEgY29udGEgbmEgQVBJIVxuXHRcdFx0fVxuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIlNJTSBDYXJkIGRhdGEgYWNjZXNzIHRocmV3IGFuIGVycm9yOiBcIiArIGVycm9yKVxuXHRcdFx0Ly8gVE9ETzogcmVxdWVzdFBob25lTnVtYmVyKCk7XG5cdFx0fSlcblx0fVxuXG59Il19