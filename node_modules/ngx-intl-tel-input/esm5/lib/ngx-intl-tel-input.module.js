/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxIntlTelInputComponent } from './ngx-intl-tel-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputService } from './ngx-intl-tel-input.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
var NgxIntlTelInputModule = /** @class */ (function () {
    function NgxIntlTelInputModule() {
    }
    /**
     * @return {?}
     */
    NgxIntlTelInputModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxIntlTelInputModule,
            providers: [NgxIntlTelInputService]
        };
    };
    NgxIntlTelInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgxIntlTelInputComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        BsDropdownModule.forRoot(),
                        TooltipModule.forRoot()
                    ],
                    exports: [NgxIntlTelInputComponent]
                },] }
    ];
    return NgxIntlTelInputModule;
}());
export { NgxIntlTelInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RDtJQUFBO0lBa0JBLENBQUM7Ozs7SUFOTyw2QkFBTzs7O0lBQWQ7UUFDQyxPQUFPO1lBQ04sUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO0lBQ0gsQ0FBQzs7Z0JBakJELFFBQVEsU0FBQztvQkFDVCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDeEMsT0FBTyxFQUFFO3dCQUNSLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGdCQUFnQixDQUFDLE9BQU8sRUFBRTt3QkFDMUIsYUFBYSxDQUFDLE9BQU8sRUFBRTtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQ25DOztJQVFELDRCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FQWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4SW50bFRlbElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5neEludGxUZWxJbnB1dFNlcnZpY2UgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC5zZXJ2aWNlJztcbmltcG9ydCB7IEJzRHJvcGRvd25Nb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Rvb2x0aXAnO1xuXG5ATmdNb2R1bGUoe1xuXHRkZWNsYXJhdGlvbnM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnRdLFxuXHRpbXBvcnRzOiBbXG5cdFx0Q29tbW9uTW9kdWxlLFxuXHRcdEZvcm1zTW9kdWxlLFxuXHRcdFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cdFx0QnNEcm9wZG93bk1vZHVsZS5mb3JSb290KCksXG5cdFx0VG9vbHRpcE1vZHVsZS5mb3JSb290KClcblx0XSxcblx0ZXhwb3J0czogW05neEludGxUZWxJbnB1dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0TW9kdWxlIHtcblx0c3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5nTW9kdWxlOiBOZ3hJbnRsVGVsSW5wdXRNb2R1bGUsXG5cdFx0XHRwcm92aWRlcnM6IFtOZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlXVxuXHRcdH07XG5cdH1cbn1cbiJdfQ==