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

const useApi = <T>(
  url: RequestInfo,
  options = {}
): {
  isLoading: boolean;
  response: Response<T>;
} => {
  const [state, setState] = React.useState(() => initialState({}));

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          ...options
        });

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
    fetchData();
  }, []);
  return state;
};

export default useApi;
