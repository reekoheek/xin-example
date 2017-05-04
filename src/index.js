import 'xin-ui/scss/ui-layout.scss';
import 'xin-ui/scss/ui-typography.scss';
import 'xin-ui/scss/ui-list.scss';
import 'xin-ui/scss/ui-header.scss';
import 'xin-ui/scss/ui-button.scss';
import 'material-design-icons/iconfont/material-icons.css';

import { bootstrap } from 'xin/core';

(function () {
  bootstrap({
    'view.loaders': [
      {
        test: /^my-/,
        load (view) {
          return System.import(`./views/${view.name}`);
        },
      },
    ],
  });

  require('./components/my-app');
})();
