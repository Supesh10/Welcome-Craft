import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router,Routes, Route, useLocation} from 'react-router-dom';
import Register from './Components/Register';
import Shop from './Components/Shop';
import ArtworkDetails from './Components/viewArtwork';
import Cart from './Components/Cart';
import BuyNow from './Components/BuyNow';
import { CartProvider } from './Components/CartContext';
import FeaturedArtists from './Components/featuredArtists';
import Collections from './Components/Collections';
import ArtistArtworks from './Components/ArtistArtwork';
import CategoryPage from './Components/CollectionsArtwork';
import ProtectedRoute from "./protectedRoutes/protectedRoutes";
import CategoryComponent from './Components/Category';
import About from './Components/About';
import AdminMenuComponent from './Components/AdminArtist';
import AdminArtworkManagement from './Components/AdminArtwork';

function AppWrapper() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/signin';

  return (
    <div>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Register />} />
          {/* <Route path="/shop" element={<Shop/>}/> */}
          {/* <Route path="/collections" element={<CategoryComponent/>}/> */}
          {/* <Route path="/artwork/:id" element={<ArtworkDetails />} /> */}
          <Route path="/buy" element={<BuyNow />} />
          <Route path="/about" element={<About/>}/>
          {/* <Route path='/cart' element={<Cart />}/> */}
          {/* <Route path='/artists' element={<FeaturedArtists/>}/> */}
          {/* <Route path='/collections' element={<Collections/>}/> */}
          <Route path="/artwork/:id" element={<ProtectedRoute><ArtworkDetails /></ProtectedRoute>} />
          <Route path="/artists/:artistId" element={<ArtistArtworks />} />
          <Route path="/category/:categoryId" element={<CategoryPage/>}/>
          <Route path="/shop" element={<ProtectedRoute><Shop/></ProtectedRoute>}/>
          <Route path="/collections" element={<ProtectedRoute><Collections/></ProtectedRoute>}/>
          <Route path='/artists' element={<ProtectedRoute><FeaturedArtists/></ProtectedRoute>}/>
          <Route 
              path="/category" 
              element={
                <ProtectedRoute role="admin">
                  <CategoryComponent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/artistmenu" 
              element={
                <ProtectedRoute role="admin">
                  <AdminMenuComponent />
                </ProtectedRoute>
              } 
            />
           <Route 
              path="/artworkmenu" 
              element={
                <ProtectedRoute role="admin">
                  <AdminArtworkManagement />
                </ProtectedRoute>
              } 
            />

        </Routes>
    </div>
  );
};

const App = () => (
  <CartProvider>
    <Router>
      <AppWrapper />
    </Router>
  </CartProvider>
);

export default App;