import 'xin-ui/scss/ui-layout.scss';
import 'xin-ui/scss/ui-typography.scss';
import 'xin-ui/scss/ui-list.scss';
import 'xin-ui/scss/ui-header.scss';
import 'xin-ui/scss/ui-button.scss';
import 'material-design-icons/iconfont/material-icons.css';

import { bootstrap } from '@xinix/xin/core';

(async function () {
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

  await System.import('./components/my-app');

  document.addEventListener('started', () => {
    setTimeout(() => {
      document.body.removeAttribute('unresolved');
    }, 100);
  });
})();
