import React from 'react';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import Helmet from 'react-helmet';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

const SEE_FULL_POST = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            id
            location
            caption
            user {
                id
                avatar
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
            createdAt
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
`;

export default withRouter(({ match: { params: { id } } }) => {
    const { data, loading } = useQuery(SEE_FULL_POST, {
        variables: { id }
    });

    if (loading) {
        return <Wrapper>
            <Helmet>
                <title>Post | Prismagram</title>
            </Helmet>

            <Loader/>
        </Wrapper>;
    }

    if (! loading && data && data.seeFullPost) {
        const post = data.seeFullPost;

        return (
            <Wrapper>
                <Helmet>
                    <title>Post | Prismagram</title>
                </Helmet>

                <Post key={post.id}
                      id={post.id}
                      user={post.user}
                      files={post.files}
                      likeCount={post.likeCount}
                      isLiked={post.isLiked}
                      comments={post.comments}
                      createdAt={post.createdAt}
                      caption={post.caption}
                      location={post.location}
                />
            </Wrapper>
        );
    }
});