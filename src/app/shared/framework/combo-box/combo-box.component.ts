import { Component, Input } from '@angular/core';

import { AbstractModel } from '@shared/component/abstract.model';

import { ComboBoxConfig } from '@shared/framework/combo-box/combo-box.config';

@Component({
	selector: 'combo-box',
	templateUrl: './combo-box.component.html',
	styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent {
	public _items: Array<AbstractModel> = new Array<AbstractModel>();

	@Input('items')
	set items(values) {
		this._items = values;
		this.updateDefaultValue();
	}

	get items() {
		return this._items;
	}

	private _config: ComboBoxConfig;

	@Input('config')
	set config(value) {
		this._config = value;
		this.updateDefaultValue();
	}

	get config() {
		return this._config;
	}

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
		console.log(this.config);
	}

	private updateDefaultValue() {
		if (this.config && this.items) {
			if (this.config.targetData[this.config.targetKey]) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i]._id === this.config.targetData[this.config.targetKey]) {
						this.inputText = this.items[i].title;
						this.selectedItem = this.items[i];
						break;
					}
				}
			}
		}
	}
}