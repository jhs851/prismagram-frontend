import React from 'react';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import SquarePost from '../../Components/SquarePost';
import FatText from '../../Components/FatText';

const Wrapper = styled.div`
    min-height: 100vh;
`;

const Empty = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Breadcrumb = styled(FatText)`
    font-size: 14px;
`;

const Section = styled.div`
    margin-top: 16px;
    display: grid;
    grid-gap: 28px;
    grid-template-columns: repeat(3, 293px);
    grid-template-rows: 293px;
    grid-auto-rows: 293px;
`;

export default ({ data, loading }) => {
    if (loading) {
        return <Wrapper><Loader /></Wrapper>;
    } else if (! loading && data && data.posts.length > 0) {
        return (
            <Wrapper>
                <Breadcrumb text="탐색 탭" />

                <Section>
                    {data.posts.map(post =>
                        <SquarePost
                            key={post.id}
                            id={post.id}
                            file={post.files[0]}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                        />)
                    }
                </Section>
            </Wrapper>
        );
    }

    return <Wrapper>
        <Empty>
            No photos found.
        </Empty>
    </Wrapper>;
};