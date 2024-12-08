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

export interface SettingsSystemModel {
   theme?: string;
   settings: SettingModel[];
   sex: SexModel[];
}

export interface IdentificationTypeModel {
   id: number;
   orden: number;
   name: string;
   abbreviation: string;
}
