import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
    font-size: ${theme.font.sizes.small};
    margin: ${theme.spacings.medium} 0;
    font-style: italic;
  `}
 `;

