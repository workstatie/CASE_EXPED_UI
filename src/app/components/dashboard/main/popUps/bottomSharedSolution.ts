import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: './bottomSharedSolution.html',
  })
  export class SolutionBottomSheet {
    constructor(
      private _bottomSheetRef: MatBottomSheetRef<SolutionBottomSheet>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public solutions: any) {
      }
    
      itemClick : EventEmitter<any> = new EventEmitter<any>();

    openLink(item): void {

      this._bottomSheetRef.dismiss(item);
      this.itemClick.emit(item);
    }
  }