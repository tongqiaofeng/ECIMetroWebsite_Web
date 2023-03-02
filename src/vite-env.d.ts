/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "vue-directive-touch";
declare module "swiper";
declare module "swiper/vue";
declare module "nativeshare";
