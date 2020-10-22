import { AppProps, ErrorComponent, useRouter } from "blitz";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { queryCache } from "react-query";
import LoginForm from "app/auth/components/LoginForm";

import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import { ReactQueryDevtools } from "react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={() => {
            // This ensures the Blitz useQuery hooks will automatically refetch
            // data any time you reset the error boundary
            queryCache.resetErrorBoundaries();
          }}
        >
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error?.name === "AuthenticationError") {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  } else if (error?.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    );
  }
}
