export interface UserTransactionsSummary {
  totalAmountLocked: number;
  totalTransactions: number;
  totalRevenue: number;
  totalPayouts: number;
  monthlyTransactions?: any;
  activeTransactions?: number;
  pendingPayouts?: any;
}

export interface UserSession {
  country_code: string;
  currency: string;
  email: string;
  first_name: string;
  id: number;
  mobile_phone: string;
  name: string;
  photo: string;
  status: string;
  user_uid: string;
}

export interface BusinessAcount {
  DOB: string;
  api_key_live: string;
  api_key_test: string;
  business_address: string;
  business_email: string;
  business_legal_name: string;
  business_logo: string;
  business_phone: string;
  category: string;
  city: string;
  company_document_path: string;
  country: string;
  created_at: string;
  delivery_no: string;
  description: string;
  id: number;
  id_card: string;
  id_type: string;
  industry: string;
  legally_registered: string;
  nationality: string;
  owner_address: string;
  owner_fname: string;
  owner_lname: string;
  region: string;
  status: string;
  trading_name: string;
  updated_at: string;
  user_id: string;
}

