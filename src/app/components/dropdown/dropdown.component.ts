import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less'],
  animations: [
    trigger('toggleState', [
      // What happens when toggleState is true
      state('true', style({ maxHeight: '200px' })),
      // What happens when toggleState is false
      state('false', style({ maxHeight: 0, padding: 0, display: 'none' })),
      transition('true => false', animate('0ms')),
      transition('false => true', animate('300ms'))
    ])
  ]
})
export class DropdownComponent implements OnInit {

  @Input() data: any[];
  @Input() multiple: boolean;
  @Input() selectedData: any[];
  @Input() selectedItem: any[];
  @Input() placeholder: string;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.hideDropdown();
    }
  }

  public isDropdownVisible: string = 'false';
  public searchItem: string = "";
  public backspaceCount: number = 0;


  constructor(private el: ElementRef) {
    this.selectedData = [];
    this.selectedItem = ['', '', true];
  }


  public showDropdown() {
    this.focusToInput();
    this.isDropdownVisible = 'true';
  }
  public hideDropdown() {
    this.isDropdownVisible = 'false';
  }

  public focusToInput() {
    this.el.nativeElement.querySelector('.search-bar').focus();
  }
  public toggleSelectedItem(item) {

    var i = this.selectedData.indexOf(item);
    this.focusToInput();
    this.searchItem = '';
    if (this.multiple) {
      if (i === -1) {
        this.hideDropdown();
        item[2] = true;
        this.selectedData.push(item);
      }
      else {
        item[2] = false;
        this.selectedData.splice(i, 1);
      }
    } else {
      if (this.selectedItem[0] === item[0] && this.selectedItem[1] === item[1]) {
        this.selectedItem[0] = '';
        this.selectedItem[1] = '';
      } else {
        this.selectedItem[0] = item[0];
        this.selectedItem[1] = item[1];
        this.hideDropdown();
      }

    }

  }

  public searchInputKeyup(e) {
    let i: number = -1;
    if (this.searchItem && this.searchItem !== '') {
      this.showDropdown();
      this.backspaceCount = 0;
    } else if (this.searchItem === '' && e.keyCode === 8) {
      this.backspaceCount++;
      if (this.backspaceCount > 1) {
        console.log('do stuff');
        if (this.multiple && this.selectedData && this.selectedData.length) {

          i = this.data.indexOf(this.selectedData[this.selectedData.length - 1]);
          if (i > -1) {
            this.data[i][2] = false;
          }
          this.selectedData.pop();
        } else if (!this.multiple) {
          this.selectedItem[0] = '';
          this.selectedItem[1] = '';

        }
        this.backspaceCount = 0;
      }
    }

  }
  public deleteSelectedItem(item, e) {
    var i = this.selectedData.indexOf(item);
    if (i > -1) {
      this.selectedData.splice(i, 1);
      i = this.data.indexOf(item);
      if (i > -1) {
        this.data[i][2] = false;
      }
    }
  }

  ngOnInit() {

  }

}
