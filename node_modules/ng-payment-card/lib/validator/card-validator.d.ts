import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
/**
 * Collection of validation methods
 */
export declare class CardValidator {
    /**
     * Custom error for alphanumeric input
     */
    private static NUMBERS_ONLY_ERR;
    /**
     * Custom error for invalid checksum
     */
    private static CHECKSUM_INVALID;
    /**
     * Custom error for expired card
     */
    private static CARD_EXPIRED;
    /**
     * Check if control contains numbers only
     */
    static numbersOnly(abstractCtrl: AbstractControl): ValidationErrors | null;
    /**
     * Check checksum number in card number using Luhn algorithm
     */
    static checksum(abstractCtr: AbstractControl): ValidationErrors | null;
    /**
     * Check validity of the card
     */
    static expiration(formGroup: FormGroup): ValidationErrors | null;
}
