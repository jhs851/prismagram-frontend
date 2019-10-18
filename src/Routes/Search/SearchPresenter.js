import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';

const Wrapper = styled.div`
    height: 50vh;
`;

const Section = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 160px;
    grid-auto-rows: 160px;
`;

const SearchPresenter = ({ term, loading, data }) => {
    if (term === undefined) {
        return <Wrapper><FatText text="Search for someting" /></Wrapper>;
    } else if (loading) {
        return <Wrapper><Loader /></Wrapper>;
    } else if (
        data &&
        (data.searchUser && data.searchUser.length === 0) &&
        (data.searchPost && data.searchPost.length === 0)
    ) { 
        return <Wrapper><FatText text="Not found Users and Photos"/></Wrapper>;
    }

    return (
        <Wrapper>
            <Section>
                {data.searchUser.map(user =>
                    <UserCard key={user.id}
                              url={user.avatar}
                              isFollowing={user.isFollowing}
                              isSelf={user.isSelf}
                              username={user.username}
                    />
                )}
            </Section>

            <Section>
                {data.searchPost.map(user =>
                    <UserCard url={user.url}
                              isFollowing={user.isFollowing}
                              isSelf={user.isSelf}
                              username={user.username}
                    />
                )}
            </Section>
        </Wrapper>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;