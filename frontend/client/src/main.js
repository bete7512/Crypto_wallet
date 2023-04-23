import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import apolloclient from './apollo.config'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './index.css'

import piniaPersist from 'pinia-plugin-persist'
import Main from './components/layouts/Main.vue'
import Empty from './components/layouts/Empty.vue'
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();
const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloclient)
    },
    render: ()=> h(App),
  });
app.component('main-layout',Main)
app.component('empty-layout',Empty)
app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');