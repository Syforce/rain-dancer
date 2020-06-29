import { Component } from '@angular/core';

import * as ClassicEditor from 'asdasd123qwe';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class App {
	public Editor = ClassicEditor;

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
	}
}