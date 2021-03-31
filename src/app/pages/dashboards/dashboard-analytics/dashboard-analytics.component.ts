import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import icGroup from "@iconify/icons-ic/twotone-group";
import icPageView from "@iconify/icons-ic/twotone-pageview";
import icCloudOff from "@iconify/icons-ic/twotone-cloud-off";
import icTimer from "@iconify/icons-ic/twotone-timer";
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";
import {
  Order,
  tableSalesData,
} from "../../../../static-data/table-sales-data";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { Router } from "@angular/router";
import { NoworriSearchService } from "src/app/services/noworri-search.service";
import { DisputeDataService } from "src/app/services/dispute-data.service";
import { TransactionsService } from "src/app/services/transactions.service";
import { range, Subject } from "rxjs";
import { UserTransactionsSummary } from "src/app/Models/interfaces";
import { BUSINESS_DATA_KEY, SESSION_STORAGE_KEY, USER_SESSION_KEY } from "src/app/Models/constants";
import { BusinessService } from "src/app/services/business.service";
import { takeUntil } from "rxjs/operators";
import { ApexOptions } from "src/@vex/components/chart/chart.component";

@Component({
  selector: "vex-dashboard-analytics",
  templateUrl: "./dashboard-analytics.component.html",
  styleUrls: ["./dashboard-analytics.component.scss"],
})
export class DashboardAnalyticsComponent implements OnInit {
  userId: string;
  summaryData: UserTransactionsSummary = {
    totalAmountLocked: 0,
    totalTransactions: 0,
    totalRevenue: 0,
    totalPayouts: 0,
    monthlyTransactions: []
  };
  hasBusinessAccount: boolean;
  isBusinessAccount: boolean;
  menuItemsList: any;
  accountTypeData: any;
  businessAccountData: any;
  businessPp: string;
  profilePic: string;
  userData: any;
  currentMonthSales: any;

  unsubscribe$ = new Subject();

  tableColumns: TableColumn<Order>[] = [
    {
      label: "",
      property: "status",
      type: "badge",
    },
    {
      label: "PRODUCT",
      property: "name",
      type: "text",
    },
    {
      label: "$ PRICE",
      property: "price",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: "DATE",
      property: "timestamp",
      type: "text",
      cssClasses: ["text-secondary"],
    },
  ];
  tableData = tableSalesData;

  series: ApexAxisChartSeries = [
    {
      name: "Subscribers",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44],
    },
  ];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: "Users",
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60],
    },
    {
      name: "Sessions",
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50],
    },
  ];

  salesSeries: ApexAxisChartSeries = [
    {
      name: "Sales",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87],
    },
  ];

  pageViewsSeries: ApexAxisChartSeries = [
    {
      name: "Page Views",
      data: [405, 800, 200, 600, 105, 788, 600, 204],
    },
  ];

  uniqueUsersSeries: ApexAxisChartSeries = [
    {
      name: "Unique Users",
      data: [356, 806, 600, 754, 432, 854, 555, 1004],
    },
  ];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: "area",
      height: 100,
    },
    colors: ["#ff9800"],
  });

  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;

  dateArray: string[];
  options: ApexOptions;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private searchService: NoworriSearchService,
    private dataService: DisputeDataService,
    private transactionService: TransactionsService,
    private businessService: BusinessService
    ) {

      this.accountTypeData = JSON.parse(
        localStorage.getItem("selected_account_type")
      );
      const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
      this.userData = sessionData;
      this.userId = sessionData.user_uid;
      this.profilePic =
        sessionData.photo === null
          ? "./../../../assets/profilPhotoAnimation.gif"
          : `https://noworri.com/api/public/uploads/images/pp/${sessionData.photo}`;
  
    }

  ngOnInit() {
    this.getTransactionsSummaryData(this.userId);
    this.getTransactionsSummaryCurrentMonthData()
    this.getBusinessAccountDetails();
    this.isBusinessAccount = this.accountTypeData
      ? this.accountTypeData.isBusinessAccount
      : this.isBusinessAccount;
    setTimeout(() => {
      const temp = [
        {
          name: "Subscribers",
          data: [55, 213, 55, 0, 213, 55, 33, 55],
        },
        {
          name: "",
        },
      ];
    }, 3000);
  }

  getTransactionsSummaryData(userId: string) {
    this.transactionService
      .getUserTransactionSummary(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((summaryData: UserTransactionsSummary) => {
        if(summaryData) {
          this.summaryData = summaryData;
          localStorage.setItem("summary_data", JSON.stringify(this.summaryData));  
        }
        return summaryData;
      });
  }

  getTransactionsSummaryCurrentMonthData() {
    var date = new Date();
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const range = {
      from: startDate,
      to: endDate
    }
    this.transactionService
      .getUserTransactionSummary(this.userId, range)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((summaryData: UserTransactionsSummary) => {
        if(summaryData) {
          this.currentMonthSales = summaryData.totalRevenue;
          const seriesData = [];
          this.dateArray = Object.keys(summaryData.monthlyTransactions);
          Object.keys(summaryData.monthlyTransactions).forEach(date => {
            const dailyTransactions = summaryData.monthlyTransactions[date].map((transaction: any) => transaction.price)
            let dailyRevenue = dailyTransactions.reduce((acc, cur) => acc + Number(cur), 0);
            dailyRevenue = parseFloat(dailyRevenue).toFixed(2)
            seriesData.push(dailyRevenue);
          });
          this.salesSeries = [
            {
              name: "Sales",
              data: seriesData,
            },
          ]

          this.options = defaultChartOptions({
            grid: {
              show: true,
              strokeDashArray: 3,
              padding: {
                left: 16
              }
            },
            chart: {
              type: 'bar',
              height: 300,
              sparkline: {
                enabled: false
              },
              zoom: {
                enabled: false
              }
            },
            stroke: {
              width: 4
            },
            labels: this.dateArray,
            xaxis: {
              type: 'datetime',
              labels: {
                show: true
              }
            },
            yaxis: {
              labels: {
                show: true
              }
            }
          });          
        }
        
        return summaryData;
      });
  }

  switchAccount() {
    this.isBusinessAccount = !this.isBusinessAccount;
    const accountData = {
      isBusinessAccount: this.isBusinessAccount,
    };

    localStorage.setItem("selected_account_type", JSON.stringify(accountData));
    window.location.reload();
  }

  getBusinessAccountDetails() {
    this.businessService
      .getBusinessDetails(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((businessData: any) => {
        if (businessData.status !== 404) {
        // if (businessData.status !== 404 && businessData.status === "approved") {
          this.businessAccountData = businessData;
          localStorage.setItem(BUSINESS_DATA_KEY, JSON.stringify(businessData));
          this.businessPp =
            businessData.business_logo === null || undefined
              ? "../../../assets/homebg.jpg"
              : `https://noworri.com/api/public/uploads/company/business/${businessData.business_logo}`;
          this.hasBusinessAccount = true;
        } else {
          this.hasBusinessAccount = false;
        }
        return businessData;
      });
  }
}
