import InitialRoute from "@routes/components/initialRoute";
import NotFound from "@pages/notFound";
import Main from "@pages/main";

const routes = [
  {
    path: "/",
    privateRoute: false,
    routes: [
      ['/not-found', <NotFound />],
      ['/main', <InitialRoute />],
      ['/*', <Main />],
    ]
  }
];

export default routes;