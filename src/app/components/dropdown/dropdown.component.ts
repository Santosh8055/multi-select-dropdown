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
export class DropdownComponent {

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
    // initializing the data
    this.selectedData = [];
    this.selectedItem = ['', '', true];
  }

  // shows the dropdown
  public showDropdown() {
    this.focusToInput();
    this.isDropdownVisible = 'true';
  }

  //hides the dropdown
  public hideDropdown() {
    this.isDropdownVisible = 'false';
  }

  // focus goes to the input and allows typing
  public focusToInput() {
    this.el.nativeElement.querySelector('.search-bar').focus();
  }

  // Toggles the selection of item
  public toggleSelectedItem(item) {
    var i = this.selectedData.indexOf(item);
    this.focusToInput();
    this.searchItem = '';


    if (this.multiple) {
      // In case multiple is enabled
      if (i === -1) {
        // selecting
        this.hideDropdown();
        item[2] = true;
        this.selectedData.push(item);
      }
      else {
        // deselecting
        item[2] = false;
        this.selectedData.splice(i, 1);
      }
    } else {
      // In case multiple is disabled
      if (this.selectedItem[0] === item[0] && this.selectedItem[1] === item[1]) {
        // deselecting    
        this.selectedItem[0] = '';
        this.selectedItem[1] = '';
      } else {
        // selecting
        this.selectedItem[0] = item[0];
        this.selectedItem[1] = item[1];
        this.hideDropdown();
      }

    }

  }
  
  // When user starts typing
  public searchInputKeyup(e) {
    let i: number = -1;
    if (this.searchItem && this.searchItem !== '') {
      this.showDropdown();
      this.backspaceCount = 0;
    } else if (this.searchItem === '' && e.keyCode === 8) {
      // In case of backspace click when the search input is empty
      this.backspaceCount++;
      if (this.backspaceCount > 1) {
        // Deselecting when backspace is pressed twice
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

  // when 'x' is clicked on the selected item in case of multiple
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


}
