import { Component, Inject, LOCALE_ID, Renderer2 } from "@angular/core";
import { ConfigService } from "../@vex/services/config.service";
import { Settings } from "luxon";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { NavigationService } from "../@vex/services/navigation.service";
import icLayers from "@iconify/icons-ic/twotone-layers";
import icAssigment from "@iconify/icons-ic/twotone-assignment";
import icContactSupport from "@iconify/icons-ic/twotone-contact-support";
import icDateRange from "@iconify/icons-ic/twotone-date-range";
import icChat from "@iconify/icons-ic/twotone-chat";
import icContacts from "@iconify/icons-ic/twotone-contacts";
import icAssessment from "@iconify/icons-ic/twotone-assessment";
import icLock from "@iconify/icons-ic/twotone-lock";
import icWatchLater from "@iconify/icons-ic/twotone-watch-later";
import icError from "@iconify/icons-ic/twotone-error";
import icAttachMoney from "@iconify/icons-ic/twotone-attach-money";
import icPersonOutline from "@iconify/icons-ic/twotone-person-outline";
import icReceipt from "@iconify/icons-ic/twotone-receipt";
import icHelp from "@iconify/icons-ic/twotone-help";
import icBook from "@iconify/icons-ic/twotone-book";
import icBubbleChart from "@iconify/icons-ic/twotone-bubble-chart";
import icFormatColorText from "@iconify/icons-ic/twotone-format-color-text";
import icStar from "@iconify/icons-ic/twotone-star";
import icViewCompact from "@iconify/icons-ic/twotone-view-compact";
import icPictureInPicture from "@iconify/icons-ic/twotone-picture-in-picture";
import icSettings from "@iconify/icons-ic/twotone-settings";
import { LayoutService } from "../@vex/services/layout.service";
import icUpdate from "@iconify/icons-ic/twotone-update";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { SplashScreenService } from "../@vex/services/splash-screen.service";
import { Style, StyleService } from "../@vex/services/style.service";
import icChromeReaderMode from "@iconify/icons-ic/twotone-chrome-reader-mode";
import { ConfigName } from "../@vex/interfaces/config-name.model";
import icMail from "@iconify/icons-ic/twotone-mail";
import icHome from "@iconify/icons-ic/twotone-home";
import icMoney from "@iconify/icons-ic/twotone-money";
import icPayement from "@iconify/icons-ic/twotone-payment";

import * as firebase from "firebase";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "vex";

  constructor(
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService
  ) {
    var firebaseConfig = {
      apiKey: "AIzaSyC3Cecq8IgWUrEkyExFxodtGFfuO9L9DmQ",
      authDomain: "noworri-68a5b.firebaseapp.com",
      databaseURL: "https://noworri-68a5b.firebaseio.com",
      projectId: "noworri-68a5b",
      storageBucket: "noworri-68a5b.appspot.com",
      messagingSenderId: "257724171600",
      appId: "1:257724171600:web:d30e0841d7d56702a95855",
      measurementId: "G-8KMPML1P4R",
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap
      .pipe(
        filter((queryParamMap) => queryParamMap.has("rtl")),
        map((queryParamMap) => coerceBooleanProperty(queryParamMap.get("rtl")))
      )
      .subscribe((isRtl) => {
        this.configService.updateConfig({
          rtl: isRtl,
        });
      });

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("layout")))
      .subscribe((queryParamMap) =>
        this.configService.setConfig(queryParamMap.get("layout") as ConfigName)
      );

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.styleService.setStyle(queryParamMap.get("style") as Style)
      );

    /**
     * Add your own routes here
     */
    this.navigationService.items = [
      {
        type: "subheading",
        label: "",
        children: [
          {
            type: "link",
            label: "Home",
            route: "/dashboards",
            icon: icHome,
          },
          {
            type: "link",
            label: "Transactions",
            route: "/dashboards/transactions",
            icon: icMoney,
          },
          {
            type: "link",
            label: "Payouts",
            route: "/dashboards/payouts",
            icon: icPayement,
          },
           {
            type: "link",
            label: "API document ",
            route: "/dashboards/api",
            icon: icPayement,
          },


          // {
          //   type: "link",
          //   label: "Further Help",
          //   icon: icBook,
          //   route: "/documentation/further-help",
          //   fragment: "further-help",
          //   routerLinkActiveOptions: { exact: true },
          // },
        ],
      },

      // {
      //   type: "link",
      //   label: "Configuration",
      //   route: () => this.layoutService.openConfigpanel(),
      //   icon: icSettings,
      // },
    ];
  }
}
