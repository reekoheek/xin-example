import { define } from 'xin';
import { View } from 'xin/views/view';

import html from './my-menu.html';
import './my-menu.scss';

import 'xin-ui/ui-reveal';
import 'xin-ui/ui-textfield';

export class MyMenu extends View {
  static get is () {
    return 'my-menu';
  }

  get props () {
    return Object.assign({}, super.props, {
      title: {
        type: String,
        value: 'Menu',
      },
      menus: {
        type: Array,
        value: () => ([]),
      },
    });
  }

  get template () {
    return html;
  }
}
define('my-menu', MyMenu);
