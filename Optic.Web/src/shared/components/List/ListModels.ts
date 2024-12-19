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
   sex: SexModel[];
   brands: BrandModel[];
}

export interface IdentificationTypeModel {
   id: number;
   orden: number;
   name: string;
   abbreviation: string;
}
