import { GetServerSideProps, Redirect } from "next";
import { RoomContainer } from "../src/containers";
import { roomExistsQuery } from "../src/queries/Main";
import { checkCanJoinRoomQuery } from "../src/queries/Room";
import apolloClient from "../src/utils/apolloClient";

export interface RoomSSRProps {
  id: string;
}

export const getServerSideProps: GetServerSideProps<RoomSSRProps> = async (
  context,
) => {
  const { params } = context;
  const token = context.req.cookies.token;
  const cookie = `token=${token};`;
  const id = params?.id;

  if (!!!id || typeof id !== "string") {
    const redirect: Redirect = {
      permanent: false,
      destination: "/",
    };

    return { redirect };
  }

  try {
    await apolloClient.query({
      query: roomExistsQuery,
      variables: { roomCode: id },
    });
  } catch (error) {
    const redirect: Redirect = { permanent: false, destination: "/404" };
    return { redirect };
  }

  try {
    await apolloClient.query({
      query: checkCanJoinRoomQuery,
      variables: { roomCode: id },
      context: {
        headers: {
          cookie,
        },
      },
    });
  } catch (error) {
    const redirect: Redirect = {
      permanent: false,
      destination: `/?join=${id}`,
    };

    return { redirect };
  }

  return {
    props: {
      id: params?.id as string,
    },
  };
};

export default RoomContainer;
