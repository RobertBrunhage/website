import { useUser } from '@auth0/nextjs-auth0';
import * as React from 'react';
import { Response } from '../pages/api/course/has-access';

function initialState(args: { error?: any; isLoading?: boolean; response?: any }) {
  return {
    response: null,
    error: null,
    isLoading: true,
    ...args
  };
}

const useAuthenticatedApi = <T>(
  url: RequestInfo,
  options: RequestInit = {}
): {
  isLoading: boolean;
  response: Response<T>;
} => {
  const [state, setState] = React.useState(() => initialState({}));
  const { user } = useUser();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);

        setState(
          initialState({
            response: await res.json(),
            isLoading: false
          })
        );
      } catch (error: any) {
        setState(
          initialState({
            response: {
              error: error.message
            },
            isLoading: false
          })
        );
      }
    };


    if (!user) return;
    fetchData();
  }, [user]);
  return state;
};

export default useAuthenticatedApi;
