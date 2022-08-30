import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { handleIncomingRedirect, ISessionInfo } from '@inrupt/solid-client-authn-browser';
import { RootState } from "../../../store/store";
import { saveIncomingRequest } from "../../../store/slices/processesSlice";

function AuthCallback() {
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();
  const location = router.asPath;
  const user = useSelector((state: RootState) => state.auth.user);
  const [userinfo, setUserinfo] = useState<ISessionInfo | undefined>();

  useEffect(() => {
    console.log("i am cb");
    const request = localStorage.getItem("request");
    const redirectPath = localStorage.getItem("redirectPath");
    if (request && redirectPath) {
      const decodedRequest = JSON.parse(
        Buffer.from(decodeURIComponent(request), "base64").toString("utf8")
      );
      decodedRequest.id = v4();
      dispatch<any>(saveIncomingRequest(decodedRequest));
      console.log("navigate:", redirectPath);
      localStorage.removeItem("request");
      localStorage.removeItem("redirectPath");
      router.push(`/request/${decodedRequest.id}`);
      return;
    }
    console.log("navigate /home");
    router.push("/home");
  }, []);

  
  return <p>I am a callback</p>;
}

export default AuthCallback;
