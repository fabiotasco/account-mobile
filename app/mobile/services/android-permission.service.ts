import { Injectable } from '@angular/core';
import * as Permissions from 'nativescript-permissions';
import { AndroidPermissionCallback } from '~/mobile/callbacks/android-permission.callback';

@Injectable()
export class AndroidPermissionService {

	constructor() { }

	public requestPermission(permission, androidPermissionCallback: AndroidPermissionCallback) {
		if (!Permissions.hasPermission(permission)) {
			Permissions.requestPermission(permission)
				.then(() => {
					console.log(permission + " granted!");
					androidPermissionCallback.onComplete(true);
				}).catch(() => {
					console.error(permission + " denied!");
					androidPermissionCallback.onComplete(false);
				});
		}
	}

}
