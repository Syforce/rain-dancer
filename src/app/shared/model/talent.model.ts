import { AbstractModel } from '@shared/component/abstract.model';

export interface Talent extends AbstractModel {
	title?: string;
	published?: boolean;
	twitter?: string;
	instagram?: string;
	facebook?: string;
	linkedin?: string;
	website?: string;
	about?: string;
	listingImage?: string;
	profileImage?: string;
	listingCroppedImage?: string;
	profileCroppedImage?: string;
}