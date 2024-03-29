import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton/index';
import SquarePost from '../../Components/SquarePost';
import Button from '../../Components/Button';

const Wrapper = styled.div`
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.span`
    font-size: 26px;
    display: block;
    margin-right: 8px;
`;

const LogOutButton = styled(Button)`
    flex: 0 0 40%;
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const FullName = styled(FatText)`
    font-size: 16px;
`;

const Bio = styled.p`
    margin: 10px 0;
`;

const Posts = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

export default ({ loading, data, logOut }) => {
    if (loading) {
        return <Wrapper><Loader /></Wrapper>
    } else if (! loading && data && data.seeUser) {
        const {
            seeUser: {
                id,
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

        return (
            <Wrapper>
                <Helmet>
                    <title>{username} | Prismagram</title>
                </Helmet>

                <Header>
                    <HeaderColumn>
                        <Avatar size="lg" url={avatar} />
                    </HeaderColumn>

                    <HeaderColumn>
                        <UsernameRow>
                            <Username>{username}</Username>{" "}
                            {isSelf ? (
                                <LogOutButton text="Log out" onClick={logOut} />
                            ) : (
                                <FollowButton isFollowing={isFollowing} id={id} />
                            )}
                        </UsernameRow>

                        <Counts>
                            <Count>
                                <FatText text={String(postsCount)}/> posts
                            </Count>
                            <Count>
                                <FatText text={String(followersCount)}/> followers
                            </Count>
                            <Count>
                                <FatText text={String(followingCount)}/> following
                            </Count>
                        </Counts>

                        <FullName text={fullName} />
                        <Bio>{bio}</Bio>
                    </HeaderColumn>
                </Header>
                <Posts>
                    {posts && posts.map(post => (
                        <SquarePost
                            key={post.id}
                            id={post.id}
                            file={post.files[0]}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                        />
                    ))}
                </Posts>
            </Wrapper>
        );
    }

    return null;
};