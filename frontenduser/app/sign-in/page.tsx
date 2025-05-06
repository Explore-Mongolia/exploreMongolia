import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
