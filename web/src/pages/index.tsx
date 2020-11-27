import { GetServerSideProps } from "next";

interface Props {
  user: null;
}

const index = ({ user }: Props) => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = null;

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: true,
      },
    };
  }

  return {
    props: { user },
  };
};

export default index;
