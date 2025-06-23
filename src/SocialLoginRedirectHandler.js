import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SocialLoginRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token); // 저장
      navigate("/"); // 홈으로 리디렉트
    } else {
      alert("로그인 실패 😢");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>로그인 처리 중입니다... </div>;
}

export default SocialLoginRedirectHandler;
