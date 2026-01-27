import { Component, OnInit, Renderer2 } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
   
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#btnScrollToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      });
    });

    // const script = `
    // var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    // (function () {
    //   var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    //   s1.async = true;
    //   s1.src = 'https://embed.tawk.to/65c2a8d38d261e1b5f5d1393/1hm066uh9';
    //   s1.charset = 'UTF-8';
    //   s1.setAttribute('crossorigin', '*');
    //   s0.parentNode.insertBefore(s1, s0);
    // })();`;
    // const el = this.renderer.createElement('script');
    // el.text = script;
    // this.renderer.appendChild(document.body, el);

  }
}
