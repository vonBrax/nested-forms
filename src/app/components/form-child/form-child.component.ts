import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

@Input() step;
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
    console.log('Child - constructor()');
    /*this.childGroup = fb.group({
      name: fb.control(this.step.name),
      event: fb.control('')
    });*/
    this.childGroup = fb.group({
      name: '',
      event: ''
    });
  }

   writeValue(value: any) {
    if(value) {
      //this.childGroup.setValue(value);
      this.childGroup.patchValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void ) {
    this.childGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched() {}

  ngOnInit() {
    console.log('Child - ngOnInit()');
    this.filteredOptions = this.childGroup.get('event').valueChanges
      .startWith(null)
      .map(val => val ? this.optionsFilter(val) : this.options.slice() );
    if(this.step && this.step.event && this.step.filter) {
      this.callMe(null);
      this.showMore();
      this.onPropSelected(null);
      this.childGroup.setValue(this.step);
    }  
  }

  optionsFilter(val: string): string[] {
   return this.options.filter(option => new RegExp(`${val}`, 'gi').test(option));
  }

  callMe(evt) {
    this.itemSelected = true;
  }

  onPropSelected(evt) {
    this.propertySelected = true;
    if(this.viewProperties) {
      this.childGroup.addControl('constraint', this.fb.control(''));
      this.childGroup.addControl('filter', this.fb.control(''));
      this.filteredFilters = this.childGroup.get('filter').valueChanges
        .startWith(null)
        .map( val => val ? this.optionsFilter(val) : this.filters.slice());
    } 
  }

  showMore() {
    this.viewProperties = !this.viewProperties;
    this.btnValue = this.viewProperties ? '<' : '>';
    if(this.viewProperties) {
      this.childGroup.addControl('property', this.fb.control(''));
      this.filteredProps = this.childGroup.get('property').valueChanges
        .startWith(null)
        .map(val => val ? this.optionsFilter(val) : this.props.slice());
    } else {
      this.filteredFilters = null;
      this.filteredProps = null;
      this.propertySelected = false;
      this.childGroup.removeControl('filter');
      this.childGroup.removeControl('constraint');
      this.childGroup.removeControl('property');
    }
  }

}
