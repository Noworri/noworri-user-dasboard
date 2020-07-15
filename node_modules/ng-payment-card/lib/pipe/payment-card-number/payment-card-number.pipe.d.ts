import { PipeTransform } from '@angular/core';
export declare class PaymentCardNumberPipe implements PipeTransform {
    /**
     * Transform card number to card format for known numbers
     */
    transform(value: string): string;
}
