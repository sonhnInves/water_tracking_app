import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export interface INavigateParams {
  screen: string;
  params?: Params;
  stack?: string;
}

export interface INavigateParamsReset {
  screen: string;
  params?: Params;
  index?: number;
}

type Params = Record<string, any>;

export const navigate = ({screen, params}: INavigateParams) => {
  navigationRef.current?.navigate(screen, params);
};
export const navigateReset = ({
  screen,
  index,
  params,
}: INavigateParamsReset) => {
  navigationRef.current?.reset({
    index: index,
    routes: [{name: screen, params: params}],
  });
};
export const navigateGoBack = () => {
  navigationRef.current?.goBack();
};
