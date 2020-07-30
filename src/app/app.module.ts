import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng5SliderModule } from 'ng5-slider';

import { App } from './app.component';

import { TalentDashboardComponent } from '@talent/talent-dashboard.component';
import { TalentListComponent } from '@talent/talent-list/talent-list.component';
import { TalentComponent } from '@talent/talent/talent.component';
import { TalentService } from '@talent/talent.service';

import { ImageDashboardComponent } from '@image/image-dashboard.component';
import { ImageListComponent } from '@image/image-list/image-list.component';
import { ImageComponent } from '@image/image/image.component';
import { ImageService } from '@image/image.service';

import { VideoDashboardComponent } from '@video/video-dashboard.component';
import { VideoListComponent } from '@video/video-list/video-list.component';
import { VideoComponent } from '@video/video/video.component';
import { VideoService } from '@video/video.service';
import { ThumbnailListComponent } from '@video/thumbnail-list/thumbnail-list.component';

import { QueueDashboardComponent } from './queue/queue-dashboard.component';
import { QueueService } from './queue/queue.service';

import { TableComponent } from '@shared/table/table.component';
import { TableHeaderComponent } from '@shared/table-header/table-header.component';
import { TableFooterComponent } from '@shared/table-footer/table-footer.component';

import { MediaService } from '@media/media.service';

import { NavigationMenuComponent } from '@shared/navigation-menu/navigation-menu.component';
import { ComboBoxComponent } from '@shared/framework/combo-box/combo-box.component';

import { HttpService } from '@shared/service/http.service';

import { ROUTES } from './app.router';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QueueListComponent } from './queue/queue-list/queue-list.component';

@NgModule({
	declarations: [
		App,
		NavigationMenuComponent,
		ComboBoxComponent,

		TalentDashboardComponent,
		TalentListComponent,
		TalentComponent,

		ImageDashboardComponent,
		ImageListComponent,
		ImageComponent,

		VideoDashboardComponent,
		VideoListComponent,
		VideoComponent,
		ThumbnailListComponent,
		
		QueueDashboardComponent,
		QueueListComponent,

		TableComponent,
		TableHeaderComponent,
		TableFooterComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		RouterModule.forRoot(ROUTES),
		HttpClientModule,
		FormsModule,
		ImageCropperModule,
		CKEditorModule,
		Ng5SliderModule
	],
	providers: [
		HttpService,
		TalentService,
		ImageService,
		VideoService,
		MediaService,
		QueueService,
	],
	bootstrap: [App]
})
export class AppModule {}