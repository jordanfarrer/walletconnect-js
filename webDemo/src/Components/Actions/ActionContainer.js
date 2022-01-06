import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 20px;
  border: 2px solid ${({ color }) => color };
  background: ${({ color, isLoading }) => isLoading ? '#CCCCCC' : `${color}50` };
  border-radius: 5px;
  display: flex;
  width: 500px;
  max-width: 100%;
  align-items: center;
  justify-content: ${({ justify }) => justify };
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px 1px ${({ color }) => color };
`;

export const ActionContainer = ({ children, color, justify, loading }) => (
  <Container color={color} justify={justify} isLoading={loading}>{children}</Container>
);

ActionContainer.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
  justify: PropTypes.string,
  loading: PropTypes.bool,
};
ActionContainer.defaultProps = {
  color: '#DDDDDD',
  children: null,
  justify: 'center',
  loading: false,
};