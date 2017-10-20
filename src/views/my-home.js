import { define } from '@xinix/xin';
import { View } from '@xinix/xin/views';

import html from './my-home.html';
import './my-home.scss';

import('xin-ui/ui-slides');

export class MyHome extends View {
  get props () {
    return Object.assign({}, super.props, {
      title: {
        type: String,
        value: 'Home',
      },
    });
  }

  get template () {
    return html;
  }

  doLogin (evt) {
    evt.preventDefault();

    this.__app.navigate('/');
  }
}
define('my-home', MyHome);
