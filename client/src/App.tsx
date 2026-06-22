import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router as WouterRouter, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ZmGrow from "./pages/ZmGrow";
import Admin from "./pages/Admin";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/zmgrow"} component={ZmGrow} />
        <Route path={"/admin"} component={Admin} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
