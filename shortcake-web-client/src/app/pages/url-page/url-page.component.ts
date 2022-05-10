import { Code } from './../../Model/code';
import { UrlService } from '../../url.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-url-page',
  templateUrl: './url-page.component.html',
  styleUrls: ['./url-page.component.scss']
})
export class UrlPageComponent implements OnInit {
  href: string | undefined = "";
  message: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private urlService: UrlService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

    	this.urlService.getUrl(params['code'])
			.subscribe((data: Code) => {

				if(data.url != undefined) {
					this.href = data.url;

					setTimeout(() => {
						if(this.href != undefined) {
							window.location.href = this.href;
						}
					}, 3000);
				} else {
					this.message = "Code not found.";
				}
			}, (error) => {
				this.message = "Code not found.";
			})
			
    	}
		
	);
  }
}
