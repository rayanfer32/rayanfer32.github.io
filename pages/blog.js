import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Blog from "../components/containers/Blog/Blog";
import parse from "rss-to-json";

export async function getServerSideProps() {
  const posts = await parse(`https://medium.com/feed/@rayanfer32`);
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}

export default function about(props) {
  return (
    <ContainerBlock>
      <Blog posts={props.posts} />
    </ContainerBlock>
  );
}
