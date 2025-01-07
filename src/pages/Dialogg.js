import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "../components/list/List";
import Chat from "../components/chat/Chat";
import Userinfo from "../components/list/userInfo/Userinfo";
import { useAuth0 } from "@auth0/auth0-react";
import useChatStore from "../lib/chatToggleStore";
import chatIdStore from "../lib/chatIdStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "80vw",
    maxWidth: "80vw",
    height: "90vh",
    maxHeight: "90vh",
    margin: "0 auto",
    background: "rgba(230, 240, 225, 0.61)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(7.6px)",
    WebkitBackdropFilter: "blur(7.6px)", // Correct vendor prefix
    border: "1px solid rgba(142, 194, 139, 0.31)",
  },
}));

const ContentContainer = styled("div")({
  display: "flex",
  height: "100%",
  overflow: "hidden",
});

const LeftSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  position: "relative",
});

const RightSection = styled("div")(({ showChat }) => ({
  display: showChat ? "flex" : "none",
  flexDirection: "column",
  height: "100%",
  position: "relative",
  flex: 1,
}));

const FixedHeader = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  background: "rgb(186 246 101 / 70%)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
});

const ScrollableWrapper = styled("div")({
  overflow: "auto",
  height: "100%",
  marginTop: "104px",
  "&::-webkit-scrollbar": {
    width: "12px",
  },
});

const TopHeader = styled("div")({
  padding: "5px",
  paddingTop: "17px",
  paddingLeft: "17px",
  paddingRight: "20px",
  borderBottom: "1px solid rgba(221, 221, 221, 0.3)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media only screen and (max-width: 600px)": {
    padding: "5px",
    paddingTop: "10px",
  },
});

const UserSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  "& img": {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  "@media only screen and (max-width: 600px)": {
    gap: "6px",
    span: {
      "font-size": "15px",
      "font-weight": "500",
      // "font-weight":
    },
    p: {
      "font-size": "10px",
      // "font-weight": "200",
      // "font-weight":
    },
    "& img": {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
    },
  },
});

const IconsSection = styled("div")({
  display: "flex",
  gap: "15px",
  "& img": {
    width: "24px",
    height: "24px",
    cursor: "pointer",
  },
});

export default function Dialogg() {
  const { chatId, chatIdName, chatIdPhoto } = chatIdStore();
  const { chatToggle, openToggle, closeToggle } = useChatStore();
  const [showChat, setShowChat] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setShowChat(!!chatId);
  }, [chatId]);

  const handleClickOpen = () => {
    openToggle();
  };

  const handleClose = () => {
    closeToggle();
  };

  const handleBackClick = () => {
    setShowChat(false);
  };

  return (
    <React.Fragment>
      <div style={{ display: "inline" }} onClick={handleClickOpen}>
        <img
          src="https://img.icons8.com/ios/50/40C057/appointment-reminders--v1.png"
          alt="Notification"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
            borderRadius: "50%",
            paddingRight: 10,
          }}
        />
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={chatToggle}
      >
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          {isMobile && showChat && (
            <IconButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: "rgb(186 246 101 / 70%)",
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <ContentContainer>
          <LeftSection
            style={{ display: isMobile && showChat ? "none" : "flex" }}
          >
            <FixedHeader>
              <Userinfo />
            </FixedHeader>
            <ScrollableWrapper>
              <List />
            </ScrollableWrapper>
          </LeftSection>
          <RightSection showChat={showChat}>
            <FixedHeader>
              {chatId && (
                <TopHeader>
                  <UserSection>
                    <img src={chatIdPhoto || "./avatar.png"} alt="" />
                    <div className="texts">
                      <span>{chatIdName || "Unknown User"}</span>
                      <p>Online</p>
                    </div>
                  </UserSection>
                  <IconsSection>
                    <img src="./phone.png" alt="Call" />
                    <img src="./video.png" alt="Video Call" />
                    <img src="./info.png" alt="Info" />
                  </IconsSection>
                </TopHeader>
              )}
            </FixedHeader>
            <ScrollableWrapper>
              <Chat />
            </ScrollableWrapper>
          </RightSection>
        </ContentContainer>
      </BootstrapDialog>
    </React.Fragment>
  );
}
