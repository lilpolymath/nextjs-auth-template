import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../services/users';

interface DashboardContextState {
  isInitializing: boolean;
  user: any | null;
  updateUser: Function;
}

const initialState = {
  isInitializing: true,
  user: null,
  updateUser: () => {},
};

const DashboardContext = createContext<DashboardContextState>(initialState);

interface DashboardContextProviderProps extends PropsWithChildren {}

export const DashboardContextProvider: React.FC<DashboardContextProviderProps> =
  (props) => {
    const [state, setState] = useState<DashboardContextState>({
      ...initialState,
    });

    const updateUser = (data: Partial<DashboardContextState>) => {
      setState((prev) => ({
        ...prev,
        ...data,
      }));
    };

    const fetchUserData = async () => {
      try {
        const data = await getUser();
        console.log(data);
        if (data) {
          updateUser({
            user: data,
            isInitializing: false,
          });
        }
      } catch (error) {
        updateUser({
          isInitializing: false,
        });
        console.log('error', error);
      }
    };

    useEffect(() => {
      fetchUserData();
    }, []);

    return (
      <DashboardContext.Provider value={{ ...state, updateUser }} {...props}>
        {/* {props.children} */}
        {state.isInitializing ? <div>loading</div> : props.children}
      </DashboardContext.Provider>
    );
  };

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      `useDashboard must be used within a DashboardContextProvider.`
    );
  }
  return context;
};
