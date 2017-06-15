import 'xin-ui/scss/ui-layout.scss';
import 'xin-ui/scss/ui-typography.scss';
import 'xin-ui/scss/ui-list.scss';
import 'xin-ui/scss/ui-header.scss';
import 'xin-ui/scss/ui-button.scss';
import 'material-design-icons/iconfont/material-icons.css';

import { bootstrap } from '@xinix/xin/core';

(async function () {
  // use below polyfill to support unsupported customElements v0
  if (!document.registerElement) await System.import('webcomponentsjs/micro');
  // use below polyfill to support unsupported customElements v1
  // if (!window.customElements) await System.import('@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce');

  bootstrap({
    'customElements.version': 'v0',
    // 'env.debug': true,
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
