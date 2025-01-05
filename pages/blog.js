import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Blog from "../components/containers/Blog/Blog";
import parse from "rss-to-json";


export default function about(props) {
  return (
    <ContainerBlock>
      <Blog  />
    </ContainerBlock>
  );
}
