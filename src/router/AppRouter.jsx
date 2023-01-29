import { Navigate, Route, Routes } from 'react-router-dom'
import { useCheckOut } from '../hooks';
import { CheckingAuth } from '../ui/components/CheckingAuth';

import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {


const { status } = useCheckOut();


if (status === 'checking' ) return <CheckingAuth />

  return (
    <Routes>

      { status === 'authenticated' 
        ? // Journal App 
          <Route path='/*' element={<JournalRoutes />} />
        : // Login and Register
          <Route path='/auth/*' element={<AuthRoutes />} />      
      }

      <Route path='/*' element={ <Navigate to='/auth/login' /> } />
      
    </Routes>
  );
}
