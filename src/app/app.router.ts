import { Routes } from '@angular/router';

import { TalentDashboardComponent } from '@talent/talent-dashboard.component';
import { TalentListComponent } from '@talent/talent-list/talent-list.component';
import { TalentComponent } from '@talent/talent/talent.component';

import { ImageDashboardComponent } from '@image/image-dashboard.component';
import { ImageListComponent } from '@image/image-list/image-list.component';
import { ImageComponent } from '@image/image/image.component';

import { VideoDashboardComponent } from '@video/video-dashboard.component';
import { VideoListComponent } from '@video/video-list/video-list.component';
import { VideoComponent } from '@video/video/video.component';

import { QueueDashboardComponent } from './queue/queue-dashboard.component';
import { QueueListComponent } from './queue/queue-list/queue-list.component';

export const ROUTES: Routes = [{
	path: 'talent',
	component: TalentDashboardComponent,
	children: [{
		path: '',
		component: TalentListComponent
	}, {
		path: 'new',
		component: TalentComponent,
	}, {
		path: ':id',
		component: TalentComponent
	}]
}, {
	path: 'image',
	component: ImageDashboardComponent,
	children: [{
		path: '',
		component: ImageListComponent
	}, {
		path: 'new',
		component: ImageComponent
	}, {
		path: ':id',
		component: ImageComponent
	}]
}, {
	path: 'video',
	component: VideoDashboardComponent,
	children: [{
		path: '',
		component: VideoListComponent
	}, {
		path: 'new',
		component: VideoComponent
	}, {
		path: ':id',
		component: VideoComponent
	}]
}, {
    path: 'queue',
    component: QueueDashboardComponent,
    children: [{
        path: '',
        component: QueueListComponent
    }]
}];