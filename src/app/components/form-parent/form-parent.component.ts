import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export class Step {
  name: string;
  event: string;

  constructor(name?, event?) {
    this.name = name || '';
    this.event = event || '';
  }
}

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css']
})
export class FormParentComponent implements OnInit, OnChanges {
 //stepsCounter: number[] = [0];
 funnelForm: FormGroup;
 @Input() funnel: any;

  stepChangeLog = [];

  constructor( private fb: FormBuilder ) {
    this.createForm();
    this.logStepChanges();
  }

  ngOnInit() { }

  createForm(): void {
    this.funnelForm = this.fb.group({
      steps: this.fb.array([])
    });
  }

  ngOnChanges() {
    console.log('Parent - ngOnChanges');
    this.setSteps(this.funnel.step);
  }

  get steps(): FormArray {
    //console.log('Parent: get steps()');
    return this.funnelForm.get('steps') as FormArray;
  }

  setSteps(steps: Step[]): void {
    console.log('Parent: setSteps()');
    const stepFormGroup = steps.map(step => this.fb.group(step));
    const stepFormArray = this.fb.array(stepFormGroup);
    this.funnelForm.setControl('steps', stepFormArray);
  }

  addStep(): void {
    //this.stepsCounter.push(this.stepsCounter.length);
    //this.steps.push(this.fb.group(new Step('Step ' + (this.steps.length+1) )));
    //this.steps.push(this.fb.group({name: '', event: ''}));
    this.steps.push( this.fb.control({name: '', event: ''}) );
  }

  removeStep(index: number): void {
    //this.stepsCounter.splice(index,1);
    this.steps.removeAt(index);
  }

  onSubmit(): void {
    this.ngOnChanges();
  }

  revert(): void {
    this.ngOnChanges();
  }

  logStepChanges() {
    const stepControl = this.funnelForm.get('steps');
    stepControl.valueChanges.forEach( val => this.stepChangeLog = val );
  }

}