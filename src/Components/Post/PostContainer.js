import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { ADD_COMMENT, TOGGLE_LIKE } from './PostQueries';
import { ME } from '../../SharedQueries';

const PostContainer = ({ id, user, files, likeCount, isLiked, comments, createdAt, caption, location }) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [commentsS, setComments] = useState(comments);
    const comment = useInput('');
    const {
        data: {
            me: { username }
        }
    } = useQuery(ME);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: {
            postId: id,
            text: comment.value
        }
    });
    const slide = () => {
        const totalFiles = files.length;

        if (currentItem === totalFiles - 1) {
            setTimeout(() => setCurrentItem(0), 3000);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
    };
    useEffect(slide, [currentItem]);

    const toggleLike = () => {
        toggleLikeMutation();

        if (isLikedS) {
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    const submitNewComment = e => {
        e.preventDefault();

        setComments([...commentsS, {
            id: Math.floor(Math.random() * commentsS.length) * 100,
            text: comment.value,
            user: {
                username
            }
        }]);

        comment.setValue('');
        addCommentMutation();
    };

    return (
        <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            isLiked={isLikedS}
            comments={commentsS}
            createdAt={createdAt}
            caption={caption}
            location={location}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
            submitNewComment={submitNewComment}
        />
    );
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string
};

export default PostContainer;