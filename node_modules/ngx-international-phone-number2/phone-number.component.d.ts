import { ElementRef, OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator, ValidationErrors } from '@angular/forms';
import { Country } from './country.model';
import { CountryService } from './country.service';
export declare class PhoneNumberComponent implements OnInit, ControlValueAccessor, Validator {
    private countryService;
    placeholder: string;
    maxlength: number;
    defaultCountry: string;
    required: boolean;
    allowDropdown: boolean;
    type: string;
    allowedCountries: Country[];
    masking: (string | RegExp)[];
    countryCodeSpace: boolean;
    noUSCountryCode: boolean;
    autoTouch: boolean;
    onCountryCodeChanged: EventEmitter<any>;
    phoneComponent: ElementRef;
    onTouch: Function;
    onModelChange: Function;
    countries: Country[];
    selectedCountry: Country;
    countryFilter: string;
    showDropdown: boolean;
    phoneNumber: string;
    phoneNumberOnly: string;
    hasAreaCodeParenthesis: boolean;
    hasDashes: boolean;
    value: string;
    dialCode: any;
    phoneNumberInput: ElementRef;
    /**
     * Util function to check if given text starts with plus sign
     * @param text
     */
    private static startsWithPlus;
    /**
     * Reduced the prefixes
     * @param foundPrefixes
     */
    private static reducePrefixes;
    constructor(countryService: CountryService, phoneComponent: ElementRef);
    ngOnInit(): void;
    /**
     * Return true if not US or Canada. Eliminates masking and relies solely on Google-libphonenumber for validation
     */
    isForeign(): boolean;
    /**
     * Moves default country to top of the list to avoid having to scroll
     */
    setDefault(): void;
    /**
     * Opens the country selection dropdown
     */
    displayDropDown(): void;
    /**
     * Hides the country selection dropdown
     * @param event
     */
    hideDropdown(event: Event): void;
    /**
     * Sets the selected country code to given country
     * @param event
     * @param countryCode
     */
    updateSelectedCountry(event: Event, countryCode: string): void;
    /**
     * Updates the phone number
     * @param event
     */
    updatePhoneNumber(event: Event): void;
    /**
     * shows the dropdown with keyboard event
     * @param event
     */
    handleKeyboardEvent(event: KeyboardEvent): void;
    /**
     * @param prefix
     */
    private findPrefix;
    /**
     * Sort countries by name
     */
    private orderCountriesByName;
    /**
     *
     * @param fn
     */
    registerOnTouched(fn: Function): void;
    /**
     *
     * @param fn
     */
    registerOnChange(fn: Function): void;
    /**
     * Touch the model for validation when input is blurred. This allows for validation errors only after
     * user has entered a value and left the element, rather than as soon as typing begins
     */
    blur(): void;
    /**
     *
     * @param value
     */
    writeValue(value: string): void;
    getPhoneOnly(): void;
    /**
     * Validation
     * @param c
     */
    validate(c: FormControl): ValidationErrors | null;
    /**
     * Updates the value and trigger changes
     * Updates model to '+' + dialCode + phone. US phones are not prefixed.
     */
    private updateValue;
    formattedPhone(): any;
    /**
     * Updates the country dial code
     * @param countryCode
     */
    private updatePhoneInput;
    /**
     * Returns the selected country's dialcode
     */
    getSelectedCountryDialCode(): string;
}
