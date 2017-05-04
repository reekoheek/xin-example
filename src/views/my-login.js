import { define } from 'xin';
import { View } from 'xin/views/view';

import html from './my-login.html';

import 'xin-ui/ui-reveal';
import 'xin-ui/ui-textfield';

export class MyLogin extends View {
  static get is () {
    return 'my-login';
  }

  get props () {
    return Object.assign({}, super.props, {
      title: {
        type: String,
        value: 'Login',
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
define('my-login', MyLogin);
