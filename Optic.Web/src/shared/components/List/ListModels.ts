export interface SexModel {
   id: number;
   name: string;
}

export interface SettingModel {
   id: number;
   name: string;
   description: string;
   value: string;
}

export interface BrandModel {
   id: number;
   name: string;
}

export interface SettingsSystemModel {
   theme?: string;
   isEnabledBarcode: boolean;
   settings: SettingModel[];
   sexes: SexModel[];
}

export interface IdentificationTypeModel {
   id: number;
   orden: number;
   name: string;
   abbreviation: string;
}

export interface IdentificationTypeResponseModel {
   id: number;
   orden: number;
   name: string;
   abbreviation: string;
}

export interface BrandsResponseModel {
   id: number;
   name: string;
   theme?: string;
   isEnabledBarcode: boolean;
   settings: SettingModel[];
   sexes: SexModel[];
   brands: BrandModel[];
}
