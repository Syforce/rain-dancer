import { Component } from '@angular/core';

import * as ClassicEditor from 'asdasd123qwe';
import { MessengerService } from '@shared/service/message.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class App {
    public Editor = ClassicEditor;
    public visibleOverlay: boolean = true;
    private messageSubscription: Subscription;

    constructor(private messengerService: MessengerService) { 
        this.messengerService = messengerService;
     }

	ngOnInit() {
		ClassicEditor
            .create(document.querySelector('#editor'), {
                plugins: [],
                // image: {
                //     toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side']
                // },
                // fontFamily: {
                //     options: [
                //         'default',
                //         'Ubuntu, Arial, sans-serif',
                //         'Ubuntu Mono, Courier New, Courier, monospace'
                //     ]
                // }
                toolbar: []
                // simpleUpload: {
                //     // The URL that the images are uploaded to.
                //     uploadUrl: 'https://res.cloudinary.com/corinadragosin',
                //     // Headers sent along with the XMLHttpRequest to the upload server.
                //     headers: {
                //         // 'X-CSRF-TOKEN': 'CSFR-Token',
                //         // Authorization: 'Bearer <JSON Web Token>'
                //     }
                // }
            })
            .then(() => {
                console.log('photoooooooo');
            })
            .catch(() => {
                console.log('photoooooooo caaatchhhhh');
            });

            this.messageSubscription = this.messengerService.message.subscribe(message => {
                this.visibleOverlay = !this.visibleOverlay;
                console.log(this.visibleOverlay);
            });
	}
}