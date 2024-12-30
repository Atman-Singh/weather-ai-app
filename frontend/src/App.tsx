import React from 'react';
import { ClerkProvider, useUser, SignedIn, SignedOut, SignIn, SignInButton, UserButton, RedirectToSignIn } from '@clerk/clerk-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ImageUploadPage from './pages/ImageUploadPage'; 
import ClothingRequestPage from './pages/ClothingRequestPage';

const App = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SignedIn>
        <h1>Welcome, {user?.firstName}!</h1>

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/image-upload">Upload Images</Link>
              </li>
              <li>
                <Link to="/clothing-request">Request Clothing</Link>
              </li>
            </ul>
          </nav>

          <UserButton />

          <Routes>
            <Route path="/image-upload" element={<ImageUploadPage />} />
            <Route path="/clothing-request" element={<ClothingRequestPage />} />
          </Routes>
        </Router>
      </SignedIn>

      <SignedOut>
      <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
      </SignedOut>
    </div>
  );
};

export default App;
