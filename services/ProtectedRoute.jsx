"use client"
import { useEffect } from 'react';
import { useRouter, usePathname, redirect } from 'next/navigation';
import { getAuthTokenFromCookie } from './authService';

const ProtectedRoute = (props) => {

    console.log('redirect >>>.....', props)


  const router = useRouter();
  const pathname = usePathname()

  const authToken = getAuthTokenFromCookie();

//   useEffect(() => {
//     console.log('is it coming here')
//     if (!authToken) {
//       // Redirect to the login page if the user is not authenticated
//       return redirect('/login');
//     } else {
//       // If the user is authenticated, redirect away from certain pages (e.g., login page)
//       const protectedPages = ['/login']; // Add other protected page paths as needed

//       console.log(pathname)
//       if (protectedPages.includes(pathname)) {
//         return redirect('/dashboard'); // Redirect to the dashboard or another protected page
//       }
//     }
//   }, [authToken, pathname]);

  // Render the children only if the user is authenticated
  return (
    <div>
      {props.children}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const authToken = getAuthTokenFromCookie();
  console.log('authtoken >>>>>>.', authToken)
  if (!authToken) {
    // Redirect to the login page if the user is not authenticated
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If the user is authenticated, you can fetch additional data and pass it as props
  // const additionalData = await fetchData();
  // ...

  return {
    props: {
      // additionalData,
    },
  };
};

export default ProtectedRoute;
