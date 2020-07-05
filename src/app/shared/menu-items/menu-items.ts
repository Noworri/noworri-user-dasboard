import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: '',
    main: [
      {
        state: 'Home',
        short_label: 'H',
        name: 'home',
        icon: '',
        type: 'link',

      },
      {
        state: 'Transactions',
        short_label: 'T',
        name: 'transactions',
        icon: '',
        type: 'link'
        
      },
      {
        state: 'Disputes',
        short_label: 'D',
        name: 'disputes',
        icon: '',
        type: 'link'
      },
      {
        state: 'Payments',
        short_label: 'P',
        name: 'payments',
        icon: '',
        type: 'link'
      },
      {
        state: '',
        short_label: 'AI',
        name: 'escrowstep1',
        icon: '',
        type: 'link'
      },
      {
        state: '',
        short_label: 'AI',
        name: 'escrowstep2',
        icon: '',
        type: 'link'
      },
      {
        state: '',
        short_label: 'AI',
        name: 'contratacheteur',
        icon: '',
        type: 'link'
      },
      {
        state: '',
        short_label: 'AI',
        name: 'contratvendeur',
        icon: '',
        type: 'link'
      },
      {
        state: 'Api Integration',
        short_label: 'CS',
        name: 'api',
        icon: '',
        type: 'link',
        target: false
      }
      ,
      {
        state: 'Settings',
        short_label: 'CS',
        name: 'Settings',
        icon: '',
        type: 'link',
        target: false
      }
    ]
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
