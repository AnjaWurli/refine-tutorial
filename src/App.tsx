import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ErrorComponent,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  UnsavedChangesNotifier,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { MuiInferencer } from "@refinedev/inferencer/mui";

import { BlogPostList } from "components/blog-posts/list";
import { BlogPostEdit } from "components/blog-posts/edit";
import { BlogPostShow } from "components/blog-posts/show";
import { BlogPostCreate } from "components/blog-posts/create";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  show: "/blog-posts/show/:id",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  meta: { canDelete: true },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="create" element={<BlogPostCreate />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
