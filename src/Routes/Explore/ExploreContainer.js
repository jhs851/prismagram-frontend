import React from 'react';
import ExplorePresenter from './ExplorePresenter';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';

const GET_POSTS = gql`
    {
        posts {
            id
            files {
                url
            }
            likeCount
            commentCount
        }
    }
`;

export default () => {
    const { data, loading } = useQuery(GET_POSTS);

    return <ExplorePresenter loading={loading} data={data} />
};