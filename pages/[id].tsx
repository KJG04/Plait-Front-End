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

  try {
    await apolloClient.query({
      query: roomExistsQuery,
      variables: { roomCode: params?.id },
    });
  } catch (error) {
    const redirect: Redirect = { permanent: false, destination: "/404" };
    return { redirect };
  }

  try {
    await apolloClient.query({
      query: checkCanJoinRoomQuery,
      variables: { roomCode: params?.id },
    });
  } catch (error) {
    const redirect: Redirect = {
      permanent: false,
      destination: `/?join=${params?.id}`,
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
