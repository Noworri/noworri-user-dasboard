import { ICardDetails } from './i-card-details';
export declare class CardDetails implements ICardDetails {
    cardHolder: string;
    cardNumber: string;
    ccv: number;
    expirationMonth: string;
    expirationYear: string;
    constructor(cardHolder: string, cardNumber: string, ccv: number, expirationMonth: string, expirationYear: string);
}
