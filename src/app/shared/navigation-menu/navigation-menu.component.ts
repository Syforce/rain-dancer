import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {
	private router: Router;

	constructor(router: Router) {
		this.router = router;
	}

	public navigate(item: string) {
		this.router.navigate([item]);
	}
}