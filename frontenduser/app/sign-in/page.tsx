 const signIn = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Sign In</h1>
        <p className="text-lg text-gray-500">
          Welcome back! Please sign in to your account.
        </p>
      </div>
    </div>
  );
};

export default signIn;