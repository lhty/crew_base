import { useMeQuery } from "../generated/graphql";
import ProfileCard from "../components/profile/ProfileCard";

const Profile = props => {
  const { data, loading } = useMeQuery();
  console.log(props);
  return <ProfileCard {...{ user: data?.currentUser, loading }} />;
};

export default Profile;
