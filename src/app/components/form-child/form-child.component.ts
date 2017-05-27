import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/*export class Step {
  name: string;
  event: string;

  constructor(name?: string, event?: string) {
    this.name = new FormControl(name);
    this.event = new FormControl(event);
  }
}*/

@Component({
  selector: 'app-form-child',
  templateUrl: './form-child.component.html',
  styleUrls: ['./form-child.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormChildComponent,
      multi: true
    }
  ]
})
export class FormChildComponent implements OnInit, ControlValueAccessor {

@Input() childGroup: FormGroup;
 
  options = ['One','Two','Three','Four','Five'];
  filteredOptions: Observable<string[]>;
  props = ['Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  filteredProps: Observable<string[]>;
  queryParams = ['equals', 'does not equal', 'contains', 'does not contain', 'is set', 'is not set'];
  filters = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen'];
  filteredFilters: Observable<string[]>;

  itemSelected = false;
  viewProperties = false;
  btnValue = '>';
  propertySelected = false;

  constructor(private fb: FormBuilder ) {
    this.childGroup = fb.group({
      name: fb.control(''),
      event: fb.control('')
    });
  }

   writeValue(value: any) {
    if(value) {
      this.childGroup.setValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void ) {
    this.childGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched() {}

  ngOnInit() {
    this.filteredOptions = this.childGroup.get('event').valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.options.slice() );
  }

  filter(val: string): string[] {
   return this.options.filter(option => new RegExp(`${val}`, 'gi').test(option));
  }

  callMe(evt) {
    this.itemSelected = true;
  }

  onPropSelected(evt) {
    console.log('Hallo!');
    this.propertySelected = true;
    if(this.viewProperties) {
      this.childGroup.addControl('actions', this.fb.control(''));
      this.childGroup.addControl('filterValue', this.fb.control(''));
      this.filteredFilters = this.childGroup.get('filterValue').valueChanges
        .startWith(null)
        .map( val => val ? this.filter(val) : this.filters.slice());
    } 
  }

  showMore() {
    this.viewProperties = !this.viewProperties;
    this.btnValue = this.viewProperties ? '<' : '>';
    if(this.viewProperties) {
      this.childGroup.addControl('properties', this.fb.control(''));
      this.filteredProps = this.childGroup.get('properties').valueChanges
        .startWith(null)
        .map(val => val ? this.filter(val) : this.props.slice());
    } else {
      this.filteredFilters = null;
      this.filteredProps = null;
      this.propertySelected = false;
      this.childGroup.removeControl('filterValue');
      this.childGroup.removeControl('actions');
      this.childGroup.removeControl('properties');
    }
  }

}
