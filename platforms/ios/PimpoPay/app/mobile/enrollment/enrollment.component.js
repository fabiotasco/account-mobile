"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform/platform");
var Permissions = require("nativescript-permissions");
var nativescript_telephony_1 = require("nativescript-telephony");
var sim_card_data_1 = require("~/canonicals/sim-card-data");
var enroll_service_1 = require("~/services/enroll.service");
var page_1 = require("ui/page");
var EnrollmentComponent = /** @class */ (function () {
    function EnrollmentComponent(page, enrollService) {
        this.page = page;
        this.enrollService = enrollService;
    }
    EnrollmentComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
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
        var _this = this;
        nativescript_telephony_1.Telephony().then(function (result) {
            var json = JSON.stringify(result);
            console.log("SIM Card data resolved: " + json);
            var simCardData = Object.assign(new sim_card_data_1.SimCardData(), JSON.parse(json));
            if (simCardData.phoneNumber == null) {
                // TODO: requestPhoneNumber();
            }
            else {
                _this.enrollService.enroll(simCardData)
                    .subscribe(function (result) {
                    console.log("Phone enrolled: " + JSON.stringify(result));
                    // TODO: login()
                }, function (error) {
                    console.log(JSON.stringify(error));
                    // TODO: requestPhoneNumber();
                });
            }
        }).catch(function (error) {
            console.error("SIM Card data access threw an error: " + error);
            // TODO: requestPhoneNumber();
        });
    };
    EnrollmentComponent.prototype.onGetDataSuccess = function (res) {
    };
    EnrollmentComponent.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    };
    EnrollmentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-enrollment',
            templateUrl: './enrollment.component.html',
            styleUrls: ['./enrollment.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, enroll_service_1.EnrollService])
    ], EnrollmentComponent);
    return EnrollmentComponent;
}());
exports.EnrollmentComponent = EnrollmentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFDL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQUNuRCw0REFBeUQ7QUFDekQsNERBQTBEO0FBQzFELGdDQUErQjtBQVUvQjtJQUVDLDZCQUFvQixJQUFVLEVBQVUsYUFBNEI7UUFBaEQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQztJQUV6RSxzQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTywwREFBNEIsR0FBcEM7UUFBQSxpQkFxQkM7UUFwQkEsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZiw0RUFBNEU7WUFDNUUsSUFBSSx3QkFBd0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1RSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDckQsSUFBSSxDQUFDO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsV0FBVyxDQUFDLENBQUM7b0JBQ3BELEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxDQUFDLENBQUM7b0JBQ3JELDhCQUE4QjtnQkFDL0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsK0NBQStDO2dCQUMvQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsQ0FBQztRQUNGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLHFFQUFxRTtZQUNyRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNGLENBQUM7SUFFTyw2Q0FBZSxHQUF2QjtRQUFBLGlCQXNCQztRQXJCQSxrQ0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFL0MsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDJCQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyw4QkFBOEI7WUFDL0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztxQkFDcEMsU0FBUyxDQUFDLFVBQUMsTUFBTTtvQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3pELGdCQUFnQjtnQkFDakIsQ0FBQyxFQUFFLFVBQUMsS0FBSztvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDbkMsOEJBQThCO2dCQUMvQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtZQUM5RCw4QkFBOEI7UUFDL0IsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRU8sOENBQWdCLEdBQXhCLFVBQXlCLEdBQUc7SUFDNUIsQ0FBQztJQUVPLDRDQUFjLEdBQXRCLFVBQXVCLEtBQXFCO1FBQzNDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQS9EVyxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDekMsQ0FBQzt5Q0FHeUIsV0FBSSxFQUF5Qiw4QkFBYTtPQUZ4RCxtQkFBbUIsQ0FpRS9CO0lBQUQsMEJBQUM7Q0FBQSxBQWpFRCxJQWlFQztBQWpFWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybSc7XG5pbXBvcnQgKiBhcyBQZXJtaXNzaW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgVGVsZXBob255IH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVwaG9ueSc7XG5pbXBvcnQgeyBTaW1DYXJkRGF0YSB9IGZyb20gJ34vY2Fub25pY2Fscy9zaW0tY2FyZC1kYXRhJztcbmltcG9ydCB7IEVucm9sbFNlcnZpY2UgfSBmcm9tICd+L3NlcnZpY2VzL2Vucm9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2FwcC1lbnJvbGxtZW50Jyxcblx0dGVtcGxhdGVVcmw6ICcuL2Vucm9sbG1lbnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9lbnJvbGxtZW50LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFbnJvbGxtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZW5yb2xsU2VydmljZTogRW5yb2xsU2VydmljZSkgeyB9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdFx0dGhpcy5nZXRSZWFkU2ltQ2FyZERhdGFQZXJtaXNzaW9uKCk7XG5cdH1cblxuXHRwcml2YXRlIGdldFJlYWRTaW1DYXJkRGF0YVBlcm1pc3Npb24oKTogdm9pZCB7XG5cdFx0aWYgKGlzQW5kcm9pZCkge1xuXHRcdFx0Ly8gUGVybWlzc8OjbyBuZWNlc3PDoXJpYSBwYXJhIGxlciBvcyBkYWRvcyBkbyBTSU0gQ2FyZCBkbyBjbGllbnRlIG5vIEFuZHJvaWQuXG5cdFx0XHR2YXIgcmVhZFBob25lU3RhdGVQZXJtaXNzaW9uID0gYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfUEhPTkVfU1RBVEU7XG5cdFx0XHRpZiAoIVBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKSkge1xuXHRcdFx0XHRQZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbihyZWFkUGhvbmVTdGF0ZVBlcm1pc3Npb24pXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uICsgXCIgZ3JhbnRlZCFcIik7XG5cdFx0XHRcdFx0XHR0aGlzLnJlYWRTaW1DYXJkRGF0YSgpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uICsgXCIgZGVuaWVkIVwiKTtcblx0XHRcdFx0XHRcdC8vIFRPRE86IHJlcXVlc3RQaG9uZU51bWJlcigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU2UgYXBwIGrDoSBwb3NzdWkgYSBwZXJtaXNzw6NvLCBmYXogYSBsZWl0dXJhLlxuXHRcdFx0XHR0aGlzLnJlYWRTaW1DYXJkRGF0YSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBOw6NvIMOpIG5lY2Vzc8OhcmlvIHNvbGljaXRhciBwZXJtaXNzw7VlcyBubyBpT1MsIGVudMOjbyBmYXogYSBsZWl0dXJhLlxuXHRcdFx0dGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlYWRTaW1DYXJkRGF0YSgpOiB2b2lkIHtcblx0XHRUZWxlcGhvbnkoKS50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcblx0XHRcdGNvbnNvbGUubG9nKFwiU0lNIENhcmQgZGF0YSByZXNvbHZlZDogXCIgKyBqc29uKTtcblxuXHRcdFx0bGV0IHNpbUNhcmREYXRhID0gT2JqZWN0LmFzc2lnbihuZXcgU2ltQ2FyZERhdGEoKSwgSlNPTi5wYXJzZShqc29uKSk7XG5cdFx0XHRpZiAoc2ltQ2FyZERhdGEucGhvbmVOdW1iZXIgPT0gbnVsbCkge1xuXHRcdFx0XHQvLyBUT0RPOiByZXF1ZXN0UGhvbmVOdW1iZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZW5yb2xsU2VydmljZS5lbnJvbGwoc2ltQ2FyZERhdGEpXG5cdFx0XHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlBob25lIGVucm9sbGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuXHRcdFx0XHRcdFx0Ly8gVE9ETzogbG9naW4oKVxuXHRcdFx0XHRcdH0sIChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcblx0XHRcdFx0XHRcdC8vIFRPRE86IHJlcXVlc3RQaG9uZU51bWJlcigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pLmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIlNJTSBDYXJkIGRhdGEgYWNjZXNzIHRocmV3IGFuIGVycm9yOiBcIiArIGVycm9yKVxuXHRcdFx0Ly8gVE9ETzogcmVxdWVzdFBob25lTnVtYmVyKCk7XG5cdFx0fSlcblx0fVxuXG5cdHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcblx0fVxuXG5cdHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG5cdFx0Y29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCBcIlwiO1xuXHRcdGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG5cdFx0Y29uc29sZS5sb2coXCJvbkdldERhdGFFcnJvcjogXCIgKyBlcnIpO1xuXHR9XG5cbn0iXX0=