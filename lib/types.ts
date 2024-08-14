// TypeScript type for the 'produit' table
export type Produit = {
  idprod: number;
  itemname: string;
  type: string;
  quantity: number;
  stockalerte: number;
  prix: number;
  description?: string;
  date_creation?: string;
};

// TypeScript type for the 'commande' table
export type Commande = {
  idcomm: number;
  inco_term: string;
  transport_mode: string;
  delivery_point: string;
  requeste_date: string;
  expiry_date: string;
  payement_type: string;
  currency: string;
  vat_rate: number;
  activites?: string;
  status: string;
  origine?: string;
  total_amount_ex_vat?: number;
  total_amount?: number;
  total_amount_inc_charge_usd?: number;
  total_amount_inc_charge_cdf?: number;
  date_creation?: string;
  date_livraison?: string;
  adresse_livraison?: string;
  idcl: number;
  nomcomplet?: string; // nom - prenom client
};

// TypeScript type for the 'stock' table
export type Stock = {
  idstock: number;
  date?: string;
  quantity: number;
  idprod: number;
  itemname?: string;
  emplacement?: string;
  date_expiration?: string;
};

// TypeScript type for the 'detailcommmade' table
export type DetailCommande = {
  iddetcom: number;
  item_id: number;
  quantity: number;
  remaining_qty: number;
  uom: string;
  driver_Id: number;
  driver_name: string;
  vehicule_number?: string;
  remark?: string;
  idprod: number;
  idcom: number;
  prix_unitaire?: number;
  total?: number;
  etat?: string;
};

// TypeScript type for the 'client' table
export type Client = {
  idcl: number;
  nom: string; // Last name
  prenom: string; // First name
  avenue?: string;
  numero?: string;
  quartier?: string;
  commune?: string;
  ville?: string;
  numeroimpot?: string;
  rccmm?: string;
  telephone?: string;
  email?: string;
  date_inscription?: string;
  type_client?: string;
  password: string;
};

export type Users = {
  iduser: number;
  nom?: string;
  email: string;
  role?: string;
  password: string;
};
