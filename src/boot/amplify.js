import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import aws_exports from "../aws-exports";
import "@aws-amplify/ui-vue";
Amplify.configure(aws_exports);

export default async ({ Vue }) => {
  Vue.use(AmplifyPlugin, AmplifyModules);
  Vue.prototype.$Amplify = Amplify;
  // Vue.prototype.$AmplifyEventBus = AmplifyEventBus;
  Vue.prototype.$Auth = AmplifyModules.Auth;
};
