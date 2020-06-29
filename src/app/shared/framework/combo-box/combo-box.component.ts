import { Component, Input } from '@angular/core';

import { AbstractModel } from '@shared/component/abstract.model';

import { ComboBoxConfig } from '@shared/framework/combo-box/combo-box.config';

@Component({
	selector: 'combo-box',
	templateUrl: './combo-box.component.html',
	styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent {
	@Input('items')
	public items: Array<AbstractModel> = new Array<AbstractModel>();
	@Input('config')
	public config: ComboBoxConfig;

	public selectedItem: AbstractModel;
	public inputText: string = '';
	public listHidden: boolean = true;

	public showList() {
		this.listHidden = false;
	}

	public hideList() {
		setTimeout(() => {
			this.listHidden = true;
		}, 150);
	}

	public selectItem(item: AbstractModel) {
		this.selectedItem = item;
		this.inputText = item.title;
		this.config.targetData[this.config.targetKey] = item._id;
	}
}