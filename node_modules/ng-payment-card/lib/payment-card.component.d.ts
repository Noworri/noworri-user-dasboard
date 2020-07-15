import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICardDetails } from './domain/i-card-details';
import { PaymentCardService } from './service/payment-card.service';
/**
 * NgPaymentCard without any dependencies other then ReactiveFormsModule
 */
export declare class PaymentCardComponent implements OnInit {
    private _ccService;
    private _fb;
    /**
     * FormGroup available publicly
     */
    ccForm: FormGroup;
    /**
     * List of months
     */
    months: Array<string>;
    /**
     * List of years
     */
    years: Array<number>;
    /**
     * Validation message for missing payment card number
     */
    ccNumMissingTxt?: string;
    /**
     * Validation message for too short payment card number
     */
    ccNumTooShortTxt?: string;
    /**
     * Validation message for too long payment card number
     */
    ccNumTooLongTxt?: string;
    /**
     * Validation message for payment card number that contains characters other than digits
     */
    ccNumContainsLettersTxt?: string;
    /**
     * Validation message for invalid payment card  number (Luhn's validation)
     */
    ccNumChecksumInvalidTxt?: string;
    /**
     * Validation message for missing card holder name
     */
    cardHolderMissingTxt?: string;
    /**
     * Validation message for too long card holder name
     */
    cardHolderTooLongTxt?: string;
    /**
     * Validation message for missing expiration month
     */
    expirationMonthMissingTxt?: string;
    /**
     * Validation message for missing expiration year
     */
    expirationYearMissingTxt?: string;
    /**
     * Validation message for missing CCV number
     */
    ccvMissingTxt?: string;
    /**
     * Validation message for too short CCV number
     */
    ccvNumTooShortTxt?: string;
    /**
     * Validation message for too long CCV number
     */
    ccvNumTooLongTxt?: string;
    /**
     * Validation message for incorrect CCV number containing characters other than digits
     */
    ccvContainsLettersTxt?: string;
    /**
     * Validation message for expired card
     */
    cardExpiredTxt?: string;
    /**
     * Switch validation of the payment card number
     */
    validateCCNum?: boolean;
    /**
     * Switch validation of the payment card holder
     */
    validateCardHolder?: boolean;
    /**
     * Switch validation of the payment card expiration month
     */
    validateExpirationMonth?: boolean;
    /**
     * Switch validation of the payment card expiration year
     */
    validateExpirationYear?: boolean;
    /**
     * Switch validation of the payment card expiration
     */
    validateCardExpiration?: boolean;
    /**
     * Switch validation of the payment card CCV number
     */
    validateCCV?: boolean;
    /**
     * EventEmitter for payment card object
     */
    formSaved: EventEmitter<ICardDetails>;
    constructor(_ccService: PaymentCardService, _fb: FormBuilder);
    ngOnInit(): void;
    /**
     * Populate months and years
     */
    private assignDateValues;
    /**
     * Build reactive form
     */
    private buildForm;
    /**
     * Returns payment card type based on payment card number
     */
    getCardType(ccNum: string): string | null;
    /**
     * Callback function that emits payment card details after user clicks submit, or press enter
     */
    emitSavedCard(): void;
}
