"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform/platform");
var Permissions = require("nativescript-permissions");
var nativescript_telephony_1 = require("nativescript-telephony");
var EnrollmentComponent = /** @class */ (function () {
    function EnrollmentComponent() {
    }
    EnrollmentComponent.prototype.ngOnInit = function () {
        this.getSimCardDataPermission();
    };
    EnrollmentComponent.prototype.getSimCardDataPermission = function () {
        var _this = this;
        // Permissão necessária para ler os dados do SIM Card do cliente no Android.
        var readPhoneStatePermission = android.Manifest.permission.READ_PHONE_STATE;
        if (platform_1.isAndroid && !Permissions.hasPermission(readPhoneStatePermission)) {
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
            this.readSimCardData();
        }
    };
    EnrollmentComponent.prototype.readSimCardData = function () {
        nativescript_telephony_1.Telephony().then(function (resolved) {
            console.log("SIM Card data access resolved!");
            console.log(JSON.stringify(resolved));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFNL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQVVuRDtJQUVDO0lBQWdCLENBQUM7SUFFakIsc0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxzREFBd0IsR0FBaEM7UUFBQSxpQkFlQztRQWRBLDRFQUE0RTtRQUM1RSxJQUFJLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDckQsSUFBSSxDQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsV0FBVyxDQUFDLENBQUM7Z0JBQ3BELEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFDckQsOEJBQThCO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDRixDQUFDO0lBRU8sNkNBQWUsR0FBdkI7UUFDQyxrQ0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsUUFBUTtZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSztZQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxHQUFHLEtBQUssQ0FBQyxDQUFBO1lBQzlELDhCQUE4QjtRQUMvQixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFqQ1csbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7O09BQ1csbUJBQW1CLENBbUMvQjtJQUFELDBCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0vcGxhdGZvcm0nO1xuaW1wb3J0IHsgQW5kcm9pZFBlcm1pc3Npb25TZXJ2aWNlIH0gZnJvbSAnfi9tb2JpbGUvc2VydmljZXMvYW5kcm9pZC1wZXJtaXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5kcm9pZFBlcm1pc3Npb25DYWxsYmFjayB9IGZyb20gJ34vbW9iaWxlL2NhbGxiYWNrcy9hbmRyb2lkLXBlcm1pc3Npb24uY2FsbGJhY2snO1xuaW1wb3J0IHsgUmVhZFNpbUNhcmREYXRhU2VydmljZSB9IGZyb20gJ34vbW9iaWxlL3NlcnZpY2VzL3JlYWQtc2ltLWNhcmQtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlYWRTaW1DYXJkRGF0YUNhbGxiYWNrIH0gZnJvbSAnfi9tb2JpbGUvY2FsbGJhY2tzL3JlYWQtc2ltLWNhcmQtZGF0YS1jYWxsYmFjayc7XG5pbXBvcnQgeyBoYXNQZXJtaXNzaW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zJztcbmltcG9ydCAqIGFzIFBlcm1pc3Npb25zIGZyb20gJ25hdGl2ZXNjcmlwdC1wZXJtaXNzaW9ucyc7XG5pbXBvcnQgeyBUZWxlcGhvbnkgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXBob255JztcblxuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdhcHAtZW5yb2xsbWVudCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9lbnJvbGxtZW50LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vZW5yb2xsbWVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW5yb2xsbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0Y29uc3RydWN0b3IoKSB7IH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmdldFNpbUNhcmREYXRhUGVybWlzc2lvbigpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRTaW1DYXJkRGF0YVBlcm1pc3Npb24oKTogdm9pZCB7XG5cdFx0Ly8gUGVybWlzc8OjbyBuZWNlc3PDoXJpYSBwYXJhIGxlciBvcyBkYWRvcyBkbyBTSU0gQ2FyZCBkbyBjbGllbnRlIG5vIEFuZHJvaWQuXG5cdFx0dmFyIHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbiA9IGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX1BIT05FX1NUQVRFO1xuXHRcdGlmIChpc0FuZHJvaWQgJiYgIVBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKSkge1xuXHRcdFx0UGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uICsgXCIgZ3JhbnRlZCFcIik7XG5cdFx0XHRcdFx0dGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcblx0XHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uICsgXCIgZGVuaWVkIVwiKTtcblx0XHRcdFx0XHQvLyBUT0RPOiByZXF1ZXN0UGhvbmVOdW1iZXIoKTtcblx0XHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSByZWFkU2ltQ2FyZERhdGEoKTogdm9pZCB7XG5cdFx0VGVsZXBob255KCkudGhlbihmdW5jdGlvbiAocmVzb2x2ZWQpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiU0lNIENhcmQgZGF0YSBhY2Nlc3MgcmVzb2x2ZWQhXCIpO1xuXHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzb2x2ZWQpKTtcblx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTSU0gQ2FyZCBkYXRhIGFjY2VzcyB0aHJldyBhbiBlcnJvcjogXCIgKyBlcnJvcilcblx0XHRcdC8vIFRPRE86IHJlcXVlc3RQaG9uZU51bWJlcigpO1xuXHRcdH0pXG5cdH1cblxufSJdfQ==