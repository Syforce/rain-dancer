import { AbstractModel } from '@shared/component/abstract.model';

export interface Image extends AbstractModel {
	originalImage: string;
	thumbnailImage: string;
}