import { GetServerSideProps, Redirect } from "next";
import { RoomContainer } from "@containers";
import { checkCanJoinRoomQuery, getRoomQuery, roomExistsQuery } from "@queries";
import apolloClient from "@utils/apolloClient";
import { Room } from "@types";

export interface RoomSSRProps {
  id: string;
  room: Room;
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

  try {
    const { data } = await apolloClient.query({
      query: getRoomQuery,
      variables: { roomCode: id },
      context: {
        headers: {
          cookie,
        },
      },
    });
    return {
      props: {
        id,
        room: data.room,
      },
    };
  } catch (error) {
    const redirect: Redirect = { permanent: false, destination: "/500" };
    return { redirect };
  }
};

export default RoomContainer;
