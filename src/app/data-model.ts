export class Funnel {
  name: string;
  steps: Step[];

  constructor(name = 'Test Funnel', steps = [new Step(), new Step()]) {
    this.name = name;
    this.steps = steps;
  }
}

export class Step {
  name: string;
  event: string;
  property: string;
  constraint: string;
  filter: string;

  constructor(data = {name: 'Step 1', event: 'One', property: 'Six', constraint: 'equals', filter: 'Eleven'}) {
    this.name = data.name;
    this.event = data.event;
    this.property = data.property;
    this.constraint = data.constraint;
    this.filter = data.filter;
  }
}