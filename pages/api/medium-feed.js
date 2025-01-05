import parse from "rss-to-json";

export default async (req, res) => {
  const posts = await parse(`https://medium.com/feed/@rayanfer32`);
  res.send(posts);
}
