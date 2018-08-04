import { Component, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform/platform';
import * as Permissions from 'nativescript-permissions';
import { Telephony } from 'nativescript-telephony';
import { SimCardData } from '~/canonicals/sim-card-data';
import { EnrollService } from '~/services/enroll.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';

declare var android: any;

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {}
