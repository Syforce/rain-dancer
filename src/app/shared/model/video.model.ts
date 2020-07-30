import { AbstractModel } from '@shared/component/abstract.model';
import { Talent } from './talent.model';

export interface Video extends AbstractModel {
	path?: string;
	selectedThumbnail?: string;
	thumbnails?: Array<string>;
}