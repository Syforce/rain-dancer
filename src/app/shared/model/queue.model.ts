import { AbstractModel } from '@shared/component/abstract.model';

export interface Queue extends AbstractModel {
    progress: number;
}