import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plane, LogIn, LogOut, FolderHeart } from "lucide-react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SavedTripsPage from "@/pages/SavedTripsPage";

function AuthHeader() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md" data-testid="link-home">
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-semibold text-lg">Wanderlust</span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <Link href="/saved">
              <Button
                variant={location === "/saved" ? "default" : "ghost"}
                size="sm"
                data-testid="link-saved-trips"
              >
                <FolderHeart className="w-4 h-4 mr-2" />
                My Trips
              </Button>
            </Link>
          )}

          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.profileImageUrl || undefined} />
                <AvatarFallback>
                  {user.firstName?.[0] || user.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <a href="/api/logout">
                <Button variant="ghost" size="sm" data-testid="button-logout">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </Button>
              </a>
            </div>
          ) : (
            <a href="/api/login">
              <Button size="sm" data-testid="button-login">
                <LogIn className="w-4 h-4 mr-2" />
                Log in
              </Button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

function Router() {
  return (
    <div className="pt-14">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/saved" component={SavedTripsPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthHeader />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
