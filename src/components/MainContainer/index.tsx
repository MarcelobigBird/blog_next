import * as styled from './styles';

export type MainContainerProps = {
  children: React.ReactNode;
};
export const MainContainer = ({ children }: MainContainerProps) => {
  return <styled.Container>{children}</styled.Container>;
};
