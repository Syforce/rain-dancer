import { AbstractModel } from '@shared/component/abstract.model';

export interface Thumbnail extends AbstractModel {
    url?: string;
	selected?: boolean;
}