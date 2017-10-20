import 'xin-ui/scss/ui-layout.scss';
import 'xin-ui/scss/ui-scroll.scss';
import 'xin-ui/scss/ui-card.scss';
import 'xin-ui/scss/ui-padding.scss';
import 'xin-ui/scss/ui-typography.scss';
import 'xin-ui/scss/ui-list.scss';
import 'xin-ui/scss/ui-header.scss';
import 'xin-ui/scss/ui-button.scss';
import 'material-design-icons/iconfont/material-icons.css';

import { bootstrap } from '@xinix/xin/core';

(async function () {
  // use below polyfill to support unsupported customElements v0
  // if (!document.registerElement) await import('webcomponentsjs/micro');
  // use below polyfill to support unsupported customElements v1
  // if (!window.customElements) await import('@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce');

  bootstrap({
    // 'customElements.version': 'v0',
    // 'env.debug': true,
    'view.loaders': [
      {
        test: /^my-/,
        load (view) {
          return import(`./views/${view.name}`);
        },
      },
    ],
  });

  await import('./components/my-app');

  document.addEventListener('started', () => {
    setTimeout(() => {
      document.body.removeAttribute('unresolved');
    }, 100);
  });
})();
