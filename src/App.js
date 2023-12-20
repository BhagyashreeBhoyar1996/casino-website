import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  useState,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Grid, Image, Container } from "semantic-ui-react";

import ContextComponent from "./components/common/ContextComponent.js";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import NoMatch from "./components/common/NoMatch.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import AppLoader from "./components/common/AppLoader.jsx";
import { removeUser, getUser } from "./utility/userData.js";
import logo from "./images/logo.svg";

const queryClient = new QueryClient();

const LoginPage = lazy(() => import("./components/LoginPage"));
const GameListPage = lazy(() =>
  import("./components/GameListPage/GameListPage")
);
const GamePlayPage = lazy(() => import("./components/GamePlayPage"));

/**
 * @component
 * @description Main application component.
 * @returns {ReactNode} The rendered App component.
 */

function App() {
  const [user, setUser] = useState(getUser() ? getUser() : null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.name.split(" ")[0].toLowerCase(),
        }),
      });
      const data = await res.json();
      if (data?.status === "success") {
        setUser(null);
        removeUser();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }, [navigate, user]);

  const containerClassName =
    currentPath === "/" ? "main container one" : "main container two";

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Grid centered>
          <Grid.Column mobile={12} tablet={12} computer={8}>
            <Image src={logo} alt="logo" />
          </Grid.Column>
        </Grid>
        <Container className={containerClassName}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<AppLoader />}>
                  <LoginPage onLogin={setUser} />
                </Suspense>
              }
            />
            <Route
              path="/game-list"
              element={
                <Suspense fallback={<AppLoader />}>
                  <ProtectedRoute user={user}>
                    <ContextComponent.Provider value={handleLogout}>
                      <GameListPage />
                    </ContextComponent.Provider>
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/game-play"
              element={
                <Suspense fallback={<AppLoader />}>
                  <ProtectedRoute user={user}>
                    <GamePlayPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Container>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
