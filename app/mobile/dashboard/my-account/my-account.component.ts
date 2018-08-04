import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '~/mobile/base.component';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { RouterExtensions } from 'nativescript-angular/router';
import * as appversion from 'nativescript-appversion';
import { exit } from 'nativescript-exit';
import * as utilsModule from 'utils/utils';

@Component({
  moduleId: module.id,
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent extends BaseComponent implements OnInit {
  version: string;

  constructor(protected vcRef: ViewContainerRef, protected modalService: ModalDialogService, protected router: RouterExtensions) {
    super(modalService, vcRef, router);
  }

  ngOnInit() {
    super.ngOnInit();

    appversion.getVersionCode().then((v: string) => {
      this.version = v;
    });
  }

  goToUserTerms(): void {
    utilsModule.openUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }

  exit(): void {
    this.dialogsHelper
      .confirm({
        title: 'Sair do app',
        message: 'O aplicativo será encerrado, deseja realmente sair?',
        okButtonText: 'SIM',
        cancelButtonText: 'NÃO'
      })
      .then(result => {
        if (result) {
          exit();
        }
      });
  }
}
