import { Component, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform/platform';
import { AndroidPermissionService } from '~/mobile/services/android-permission.service';
import { AndroidPermissionCallback } from '~/mobile/callbacks/android-permission.callback';
import { ReadSimCardDataService } from '~/mobile/services/read-sim-card-data.service';
import { ReadSimCardDataCallback } from '~/mobile/callbacks/read-sim-card-data-callback';
import { hasPermission } from 'nativescript-permissions';
import * as Permissions from 'nativescript-permissions';
import { Telephony } from 'nativescript-telephony';

declare var android: any;

@Component({
	moduleId: module.id,
	selector: 'app-enrollment',
	templateUrl: './enrollment.component.html',
	styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		this.getSimCardDataPermission();
	}

	private getSimCardDataPermission(): void {
		// Permissão necessária para ler os dados do SIM Card do cliente no Android.
		var readPhoneStatePermission = android.Manifest.permission.READ_PHONE_STATE;
		if (isAndroid && !Permissions.hasPermission(readPhoneStatePermission)) {
			Permissions.requestPermission(readPhoneStatePermission)
				.then(() => {
					console.log(readPhoneStatePermission + " granted!");
					this.readSimCardData();
				}).catch(() => {
					console.error(readPhoneStatePermission + " denied!");
					// TODO: requestPhoneNumber();
				});
		} else {
			this.readSimCardData();
		}
	}

	private readSimCardData(): void {
		Telephony().then(function (resolved) {
			console.log("SIM Card data access resolved!");
			console.log(JSON.stringify(resolved));
		}).catch(function (error) {
			console.error("SIM Card data access threw an error: " + error)
			// TODO: requestPhoneNumber();
		})
	}

}