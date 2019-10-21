import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
    height: 50vh;
`;

const Section = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, 160px);
    grid-template-rows: 160px;
    grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

const SearchPresenter = ({ term, loading, data }) => {
    if (term === undefined) {
        return <Wrapper><FatText text="Search for someting" /></Wrapper>;
    } else if (loading) {
        return <Wrapper><Loader /></Wrapper>;
    }

    return (
        <Wrapper>
            {data && data.searchUser && data.searchUser.length === 0 ? (
                <Wrapper><FatText text="No Users found"/></Wrapper>
            ) : (
                <Section>
                    {data.searchUser.map(user =>
                        <UserCard key={user.id}
                                  id={user.id}
                                  url={user.avatar}
                                  isFollowing={user.isFollowing}
                                  isSelf={user.isSelf}
                                  username={user.username}
                        />
                    )}
                </Section>
            )}

            {data && data.searchPost && data.searchPost.length === 0 ? (
                <Wrapper><FatText text="No Photos found"/></Wrapper>
            ) : (
                <PostSection>
                    {data.searchPost.map(post =>
                        <SquarePost
                            key={post.id}
                            id={post.id}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            file={post.files[0]} />
                    )}
                </PostSection>
            )}
        </Wrapper>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;