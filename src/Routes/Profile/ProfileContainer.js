import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import { GET_USER } from './ProfileQueries';
import ProfilePresenter from './ProfilePresenter';

export default withRouter(({ match: { params: { username: name } } }) => {
    const { data, loading } = useQuery(GET_USER, {
        variables: { username: name }
    });

    const {
        seeUser: {
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
        }
    } = data;

    return <ProfilePresenter
                loading={loading}
                avatar={avatar}
                username={username}
                fullName={fullName}
                isFollowing={isFollowing}
                isSelf={isSelf}
                bio={bio}
                followingCount={followingCount}
                followersCount={followersCount}
                postsCount={postsCount}
                posts={posts}
    />
});