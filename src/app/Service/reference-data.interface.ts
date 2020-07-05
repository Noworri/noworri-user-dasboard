export interface CompanyReference {
  businessname: string;
  fullname: string;
  profilpicture: string;
  city: string;
  country:string;
  sector: string;
  services: string;
  address: string;
  businessphone: string;
  additionnalphone: string;
  identitycard: string;
  identitycardfile: string,
  identitycardverifyfile: string,
  facebook: string;
  instagram: string;
  whatsapp: string;
  state: string;
  company_id: string;
  created_at: string,
}

export interface DisputeReference {
  email: string,
  phone: string,
  city: string,
  title: string,
  description: string,
  proofs: string
}
