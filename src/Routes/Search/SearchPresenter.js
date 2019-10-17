import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';

const Wrapper = styled.div`
    height: 50vh;
`;

const Section = styled.div``;

const SearchPresenter = ({ term, loading, data }) => {
    if (term === undefined) {
        return <Wrapper><FatText text="Search for someting" /></Wrapper>;
    } else if (loading) {
        return <Wrapper><Loader /></Wrapper>;
    } else if (
        data &&
        (data.searchUser && data.searchUser.length === 0) ||
        (data.searchPost && data.searchPost.length === 0)
    ) { 
        return <Wrapper><FatText text="No Users, Photos Found"/></Wrapper>;
    }

    return (
        <Wrapper>
            <Section>
                {data.searchUser.map(user =>
                    <UserCard url={user.url}
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