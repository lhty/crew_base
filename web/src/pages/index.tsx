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
        destination: "/login",
        permanent: true,
      },
    };
  }

  return {
    props: { user }, // will be passed to the page component as props
  };
};

export default index;
