import { gql } from "@apollo/client";
import client from "./api/appolloClient";

export default function Post({ some }) {
  console.log(some.data);
  return (
    <>
      <h1>this is the detail page</h1>
      {/* <h2>{some}</h2> */}
    </>
  );
}

export const getStaticProps = async (context) => {
  const id = context.params?.id;
  console.log("detail", context);
  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast( find:${{ id }}) {
          id
          links {
            article_link
            video_link
            mission_patch
          }
        }
      }
    `,
  });
  return {
    props: {
      some: data,
    },
  };
};
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
        }
      }
    `,
  });
  console.log("get data", data);
  const pathsWithParams = data.launchesPast.map((launch) => ({
    params: { id: launch.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};
