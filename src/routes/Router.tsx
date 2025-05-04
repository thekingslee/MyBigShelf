import App from '@/App';
import AuthCallback from '@/components/AuthCallback';
import AffliatePage from '@/pages/Affliate/AffliatePage';
import Bookshop from '@/pages/Bookshop';
import Checkout from '@/pages/Checkout';
import Tracker from '@/pages/Tracker';
// import WaitListPage from '@/pages/WaitListPage';
import { createBrowserRouter } from 'react-router-dom';
import PreserveParamsWrapper from '@/components/PreserveParamsWrapper';
import ReturnPolicy from '@/pages/ReturnPolicy';
import ShippingPolicy from '@/pages/ShippingPolicy';

const router = createBrowserRouter([
  {
    element: <PreserveParamsWrapper />,
    children: [
      { path: '/', element: <Bookshop /> },
      { path: '/about', element: <App /> },
      { path: '/auth/google/callback', element: <AuthCallback /> },
      { path: '/tracker', element: <Tracker /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/partner', element: <AffliatePage /> },
      { path: '/return-policy', element: <ReturnPolicy /> },
      { path: '/shipping-policy', element: <ShippingPolicy /> },
      // { path: '/waitlist', element: <WaitListPage /> },
    ],
  },
]);

export default router;
