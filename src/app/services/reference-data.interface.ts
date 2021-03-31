export interface CompanyReference {
  user_id: string;
  businessname: string;
  fullname: string;
  profilpicture: string;
  city: string;
  country: string;
  sector: string;
  services: string;
  address: string;
  businessphone: string;
  additionnalphone: string;
  identitycard: string;
  identitycardfile: string;
  identitycardverifyfile: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  state: string;
  company_id: string;
  created_at: string;
}

export interface DisputeReference {
  email: string;
  phone: string;
  city: string;
  title: string;
  description: string;
  proofs: string;
}

export interface TransactionsReference {
  id: string;
  user_id: string;
  user_role: string;
  user_name: string;
  user_phone: string;
  owner_id: string;
  owner_role: string;
  owner_name: string;
  owner_phone: string;
  transaction_type: string;
  service: string;
  price: number;
  noworri_fees: string;
  total_price: number;
  deadDays: string;
  deadHours: string;
  deadline: string;
  start: string;
  deadline_type: string;
  revision: string;
  transaction_key: string;
  requirement: string;
  file_path: string;
  etat: string;
  deleted: string;
  created_at: string;
  state: string;
}

export interface UserReference {
  currentUser: {
    currency: string;
    country_code: string;
    account: string;
    buyer: string;
    code: string;
    country: string;
    created_at: string;
    email: string;
    email_verified_at: string;
    expires_in: number;
    first_name: string;
    id: number;
    mobile_phone: string;
    name: string;
    photo: string;
    seller: string;
    otp: string;
    status: number;
    token: string;
    token_type: string;
    type: string;
    updated_at: string;
    user_name: string;
    user_uid: string;
  };
  error: string;
}

export interface MerchandiseEscrowStep1Reference {
  item: string;
  sellerPhoneNumber: any;
  deliveryPhoneNumber: any;
  price: any;
  description: any;
}

export interface ServiceEscrowStep1Reference {
  item: string;
  sellerPhoneNumber: string;
  price: any;
  revisionNo: any;
  deadlineType: string;
  deadline: any;
  description: any;
  file: any;
}

export interface AccountDetails {
  user_id: string;
  bank_name: string;
  bank_code: string;
  holder_name: string;
}
