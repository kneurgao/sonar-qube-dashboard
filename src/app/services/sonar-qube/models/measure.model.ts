import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export class Measure {
  name: string;
  value: number;
  rating: string;
  icon: IconDefinition;

  constructor(name: string, value: number, rating: string, icon: IconDefinition) {
    this.name = name;
    this.value = value;
    this.rating = rating;
    this.icon = icon;
  }
}
