import InitialRoute from "@routes/components/initialRoute";
import NotFound from "@pages/notFound";
import Main from "@pages/main";
import View from "@pages/view";

const routes = [
  {
    path: "/",
    privateRoute: false,
    routes: [
      ['/not-found', <NotFound />],
      ['/main', <InitialRoute />],
      ['/view', <View />],
      ['/*', <Main />],
    ]
  }
];

export default routes;