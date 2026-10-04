import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-sm',
          },
        }}
        oauthFlow="redirect"
        signUpUrl="/sign-up"
      />
    </div>
  );
}