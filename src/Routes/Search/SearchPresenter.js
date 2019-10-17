import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../Components/FatText';

const Wrapper = styled.div`
    height: 50vh;
    text-align: center;
`;

const SearchPresenter = ({ term, loading }) => {
    return (
        <Wrapper>
            { term === undefined && <FatText text="Search for something" /> }
        </Wrapper>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;