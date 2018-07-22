import { Component, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform/platform';
import { AndroidPermissionService } from '~/mobile/services/android-permission.service';
import { AndroidPermissionCallback } from '~/mobile/callbacks/android-permission.callback';

declare var android: any;

@Component({
	moduleId: module.id,
	selector: 'app-enrollment',
	templateUrl: './enrollment.component.html',
	styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

	private androidPermissionCallback: AndroidPermissionCallback;

	constructor(private androidPermissionService: AndroidPermissionService) { }

	ngOnInit() {
		if (isAndroid) {
			this.androidPermissionService.requestPermission(android.Manifest.permission.READ_PHONE_STATE, this.androidPermissionCallback = {
				onComplete(hasPermission) {
					console.log("Permission granted? " + hasPermission);
				}
			});
		}
	}

}