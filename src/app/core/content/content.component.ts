import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css'],
 	encapsulation: ViewEncapsulation.None
})
export class ContentComponent {
	onActivate(componentRef: any) {
		if (!componentRef) {
			console.log(componentRef);
		}
	}
	onDeactivate(componentRef: any) {
		if (!componentRef) {

		}
	}
	onAttach(componentRef: any) {
		if (!componentRef) {

		}
	}
	onDetach(componentRef: any) {
		if (!componentRef) {

		}
	}
}
