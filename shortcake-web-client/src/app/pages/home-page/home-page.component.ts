import { Code } from './../../Model/code';
import { UrlService } from '../../url.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  formUrl = new FormControl('');
  code: Code | undefined;
  copyText: string = "Copy to clipboard";
  errorMessage: string | undefined;

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
  }

  createUrl() {
    this.urlService.createUrl(this.formUrl.value).subscribe((data: Code) => {
      this.code = data;
      this.errorMessage = undefined;
    }, (error) => {
      this.code = undefined;
      this.errorMessage = error.error;
    });
  }

  copyToClipboard() {
    if(this.code?.url != undefined) {
      navigator.clipboard.writeText(this.code?.url);
      this.copyText = "Copied!";
    }
  }

  navigateToHome() {
    window.location.href = "/";
  }

}
