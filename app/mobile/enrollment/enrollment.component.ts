import { Component, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform/platform';
import * as Permissions from 'nativescript-permissions';
import { Telephony } from 'nativescript-telephony';
import { SimCardData } from '~/canonicals/sim-card-data';

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
		this.getReadSimCardDataPermission();
	}

	private getReadSimCardDataPermission(): void {
		if (isAndroid) {
			// Permissão necessária para ler os dados do SIM Card do cliente no Android.
			var readPhoneStatePermission = android.Manifest.permission.READ_PHONE_STATE;
			if (!Permissions.hasPermission(readPhoneStatePermission)) {
				Permissions.requestPermission(readPhoneStatePermission)
					.then(() => {
						console.log(readPhoneStatePermission + " granted!");
						this.readSimCardData();
					}).catch(() => {
						console.error(readPhoneStatePermission + " denied!");
						// TODO: requestPhoneNumber();
					});
			} else {
				// Se app já possui a permissão, faz a leitura.
				this.readSimCardData();
			}
		} else {
			// Não é necessário solicitar permissões no iOS, então faz a leitura.
			this.readSimCardData();
		}
	}

	private readSimCardData(): void {
		Telephony().then(function (result) {
			var json = JSON.stringify(result);
			console.log("SIM Card data resolved: " + json);

			let simCardData = Object.assign(new SimCardData(), JSON.parse(json));
			if (simCardData.phoneNumber == null) {
				// TODO: requestPhoneNumber();
			} else {
				// TODO: Verifica a conta na API!
			}
		}).catch(function (error) {
			console.error("SIM Card data access threw an error: " + error)
			// TODO: requestPhoneNumber();
		})
	}

}