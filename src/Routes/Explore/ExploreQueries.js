import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
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