import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';

const Wrapper = styled.div`
    min-height: 60vh;
`;

const Header = styled.header`

`;

const HeaderColumn = styled.div``;

const ProfilePresenter = ({
    loading,
    avatar,
    username,
    fullName,
    isFollowing,
    isSelf,
    bio,
    followingCount,
    followersCount,
    postsCount,
    posts
}) => {
    if (loading) {
        return <Wrapper><Loader /></Wrapper>
    }

    return (
        <>
            <Header>
                <HeaderColumn>
                    <Avatar size="lg" url={avatar} />
                </HeaderColumn>
            </Header>
        </>
    );
};

ProfilePresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    isFollowing: PropTypes.bool.isRequired,
    isSelf: PropTypes.bool.isRequired,
    bio: PropTypes.string,
    followingCount: PropTypes.number.isRequired,
    followersCount: PropTypes.number.isRequired,
    postsCount: PropTypes.number.isRequired,
    posts: PropTypes.array.isRequired
};

export default ProfilePresenter;