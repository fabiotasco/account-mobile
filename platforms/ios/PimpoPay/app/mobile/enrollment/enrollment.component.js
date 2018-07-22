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
                // Se Android permitiu, faz a leitura.
                this.readSimCardData();
            }
        }
        else {
            // Não é necessário solicitar permissões no iOS, então faz a leitura.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBK0Q7QUFNL0Qsc0RBQXdEO0FBQ3hELGlFQUFtRDtBQVVuRDtJQUVDO0lBQWdCLENBQUM7SUFFakIsc0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTywwREFBNEIsR0FBcEM7UUFBQSxpQkFxQkM7UUFwQkEsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZiw0RUFBNEU7WUFDNUUsSUFBSSx3QkFBd0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1RSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDckQsSUFBSSxDQUFDO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsV0FBVyxDQUFDLENBQUM7b0JBQ3BELEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxDQUFDLENBQUM7b0JBQ3JELDhCQUE4QjtnQkFDL0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1Asc0NBQXNDO2dCQUN0QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsQ0FBQztRQUNGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLHFFQUFxRTtZQUNyRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNGLENBQUM7SUFFTyw2Q0FBZSxHQUF2QjtRQUNDLGtDQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxRQUFRO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLEdBQUcsS0FBSyxDQUFDLENBQUE7WUFDOUQsOEJBQThCO1FBQy9CLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQXZDVyxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDekMsQ0FBQzs7T0FDVyxtQkFBbUIsQ0F5Qy9CO0lBQUQsMEJBQUM7Q0FBQSxBQXpDRCxJQXlDQztBQXpDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBBbmRyb2lkUGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICd+L21vYmlsZS9zZXJ2aWNlcy9hbmRyb2lkLXBlcm1pc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBBbmRyb2lkUGVybWlzc2lvbkNhbGxiYWNrIH0gZnJvbSAnfi9tb2JpbGUvY2FsbGJhY2tzL2FuZHJvaWQtcGVybWlzc2lvbi5jYWxsYmFjayc7XG5pbXBvcnQgeyBSZWFkU2ltQ2FyZERhdGFTZXJ2aWNlIH0gZnJvbSAnfi9tb2JpbGUvc2VydmljZXMvcmVhZC1zaW0tY2FyZC1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhZFNpbUNhcmREYXRhQ2FsbGJhY2sgfSBmcm9tICd+L21vYmlsZS9jYWxsYmFja3MvcmVhZC1zaW0tY2FyZC1kYXRhLWNhbGxiYWNrJztcbmltcG9ydCB7IGhhc1Blcm1pc3Npb24gfSBmcm9tICduYXRpdmVzY3JpcHQtcGVybWlzc2lvbnMnO1xuaW1wb3J0ICogYXMgUGVybWlzc2lvbnMgZnJvbSAnbmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zJztcbmltcG9ydCB7IFRlbGVwaG9ueSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcGhvbnknO1xuXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2FwcC1lbnJvbGxtZW50Jyxcblx0dGVtcGxhdGVVcmw6ICcuL2Vucm9sbG1lbnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9lbnJvbGxtZW50LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFbnJvbGxtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRjb25zdHJ1Y3RvcigpIHsgfVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2V0UmVhZFNpbUNhcmREYXRhUGVybWlzc2lvbigpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRSZWFkU2ltQ2FyZERhdGFQZXJtaXNzaW9uKCk6IHZvaWQge1xuXHRcdGlmIChpc0FuZHJvaWQpIHtcblx0XHRcdC8vIFBlcm1pc3PDo28gbmVjZXNzw6FyaWEgcGFyYSBsZXIgb3MgZGFkb3MgZG8gU0lNIENhcmQgZG8gY2xpZW50ZSBubyBBbmRyb2lkLlxuXHRcdFx0dmFyIHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbiA9IGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX1BIT05FX1NUQVRFO1xuXHRcdFx0aWYgKCFQZXJtaXNzaW9ucy5oYXNQZXJtaXNzaW9uKHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbikpIHtcblx0XHRcdFx0UGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24ocmVhZFBob25lU3RhdGVQZXJtaXNzaW9uKVxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbiArIFwiIGdyYW50ZWQhXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5yZWFkU2ltQ2FyZERhdGEoKTtcblx0XHRcdFx0XHR9KS5jYXRjaCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKHJlYWRQaG9uZVN0YXRlUGVybWlzc2lvbiArIFwiIGRlbmllZCFcIik7XG5cdFx0XHRcdFx0XHQvLyBUT0RPOiByZXF1ZXN0UGhvbmVOdW1iZXIoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFNlIEFuZHJvaWQgcGVybWl0aXUsIGZheiBhIGxlaXR1cmEuXG5cdFx0XHRcdHRoaXMucmVhZFNpbUNhcmREYXRhKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIE7Do28gw6kgbmVjZXNzw6FyaW8gc29saWNpdGFyIHBlcm1pc3PDtWVzIG5vIGlPUywgZW50w6NvIGZheiBhIGxlaXR1cmEuXG5cdFx0XHR0aGlzLnJlYWRTaW1DYXJkRGF0YSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmVhZFNpbUNhcmREYXRhKCk6IHZvaWQge1xuXHRcdFRlbGVwaG9ueSgpLnRoZW4oZnVuY3Rpb24gKHJlc29sdmVkKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlNJTSBDYXJkIGRhdGEgYWNjZXNzIHJlc29sdmVkIVwiKTtcblx0XHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc29sdmVkKSk7XG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU0lNIENhcmQgZGF0YSBhY2Nlc3MgdGhyZXcgYW4gZXJyb3I6IFwiICsgZXJyb3IpXG5cdFx0XHQvLyBUT0RPOiByZXF1ZXN0UGhvbmVOdW1iZXIoKTtcblx0XHR9KVxuXHR9XG5cbn0iXX0=