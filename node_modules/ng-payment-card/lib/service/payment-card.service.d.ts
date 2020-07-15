import { Month } from '../domain/month.enum';
export declare class PaymentCardService {
    /**
     * Collection of card types
     */
    private static readonly cardTypes;
    /**
     * Return card type based on card number
     */
    static getCardType(ccNum: string): string | null;
    /**
     * Return months in numerical format
     */
    static getMonths(): Array<Month>;
    /**
     * Return years based on current year
     */
    static getYears(): Array<number>;
}
