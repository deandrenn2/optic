export interface ButtonModel {
   name: string;
   className?: string;
   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
   actionClick?: Function;
   fontIcon?: string;
}

export interface NavVerticalItemModel {
   id: number;
   name: string;
   titleSection?: string;
   description: string;
   fontIcon?: string;
   url: string;
   active?: boolean;
   children?: JSX.Element;
}
