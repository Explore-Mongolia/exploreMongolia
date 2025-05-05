import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const { signOut } = useAuth();  // Get the signOut function from Clerk
  const router = useRouter();  // Router to redirect after logout

  const handleLogout = async () => {
    try {
      // Sign out the user using Clerk's signOut method
      await signOut();
      
      // Redirect to the sign-in page after successful logout
      router.push("/sign-in");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">
      Log Out
    </button>
  );
};

export default LogoutButton;
