import { Navigate,useModel } from 'umi'

export default (Component:()=> JSX.Element) => () => {
  const { isLogin } = useModel("useUserInfo");
  
  if (isLogin) {
    return <Component />;
  } else{
    return <Navigate to="/login" />;
  }
}