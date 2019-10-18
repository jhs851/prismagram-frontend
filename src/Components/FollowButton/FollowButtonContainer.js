import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from './FollowButtonPresenter';

const FollowButtonContainer = ({ isFollowing, id }) => {
    const [isFollowingS, setIsFollwing] = useState(isFollowing);
    const [followMutation] = useMutation(FOLLOW, {
        variables: { id }
    });
    const [unfollowMutation] = useMutation(UNFOLLOW, {
        variables: { id }
    });

    const onClick = () => {
        if (isFollowingS) {
            setIsFollwing(false);
            unfollowMutation();
        } else {
            setIsFollwing(true);
            followMutation();
        }
    };

    return <FollowButtonPresenter isFollowing={isFollowingS} onClick={onClick} />
};

FollowButtonContainer.propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

export default FollowButtonContainer;