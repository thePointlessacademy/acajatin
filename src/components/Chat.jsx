import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db, storage } from "../config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "../styles/Chat.scss";
import send from "../assets/send.svg";
import attachment from "../assets/attachment.svg";
import cross from "../assets/cross.svg";
import ChatImage from "./Chat-Image";
import close from "../assets/close-img.svg";
import download from "../assets/download.svg";

const Chat = ({ ...props }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [chosenImage, setChosenImage] = useState(null);

  const hiddenFileInput = useRef(null);

  const groups = useSelector((state) => state.groups);
  const auth = useSelector((state) => state.auth);
  console.log("authstoreauth   ", auth.data.uid);

  const getChat = () => {
    if (db) {
      const q = query(
        collection(db, "messages"),
        where("groupid", "==", props.selectedGroup),
        orderBy("createdat", "desc")
      );

      return onSnapshot(q, (querySnapshot) => {
        const allMessages = [];
        querySnapshot.forEach((doc) => {
          const dataMessage = {
            docdata: doc.data(),
            id: doc.id,
          };
          allMessages.push(dataMessage);
        });
        setMessages(allMessages);
      });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (image) {
      const storageRef = ref(storage, `images/${uuidv4()}`);
      // const uploadTask = uploadBytes(storageRef, image);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            addMessageToFirestore(downloadURL);
          });
        }
      );

      setNewMessage("");
      setSelectedImage(null);
    } else {
      addMessageToFirestore("");
    }
  };

  const addMessageToFirestore = async (imageUrl) => {
    const docRef = await addDoc(collection(db, "messages"), {
      message: newMessage,
      groupid: props.selectedGroup,
      uid: auth.data.uid,
      createdat: serverTimestamp(),
      imageUrl: imageUrl,
      name: auth.data.name,
    });

    const reference = {
      docdata: {
        message: newMessage,
        groupid: props.selectedGroup,
        uid: auth.data.uid,
        createdat: serverTimestamp(),
        imageUrl: imageUrl,
        name: auth.data.name,
      },
      id: docRef.id,
    };

    setMessages((prevMessages) => [...prevMessages, reference]);

    setNewMessage("");
    setImage(null);
    setSelectedImage(null);
  };

  useEffect(() => {
    // console.log("GRoups chat : ", groups);
    // setMessages([]);
    // getChat();
    const unsubscribe = getChat();
    return unsubscribe;
  }, [groups]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAttachmentClick = () => {
    hiddenFileInput.current.click();
  };

  const handleCrossClick = () => {
    console.log("I am clicked!!!!");
    setSelectedImage(null);
    setImage(null);
  };

  const convertDate = (date) => {
    console.log("date, ", date);
    console.log("nanoseconds, ", date?.nanoseconds);
    // console.log(
    //   ".toDate().toLocaleTimeString(), ",
    //   date?.toDate()?.toLocaleTimeString()
    // );
    // console.log("type of date ", typeof date);

    if (date?.nanoseconds !== undefined) {
      return date?.toDate()?.toLocaleTimeString();
    } else {
      return "00:00";
    }
  };

  const handleChooseImage = (image, name, time) => {
    const item = {
      image: image,
      name: name,
      time: convertDate(time),
    };

    setChosenImage(item);
  };

  const handleCrossChossenImageClick = () => {
    setChosenImage(null);
  };

  return (
    // <div>
    //   <h3>All the Chats of that Group</h3>
    //   {messages.map((message, index) => (
    //     <div key={index}>
    //       <p>{message.docdata.message}</p>
    //       {message.docdata.imageUrl !== "" ? (
    //         <img src={message.docdata.imageUrl} alt="" />
    //       ) : (
    //         <></>
    //       )}
    //     </div>
    //   ))}

    //   <form action="" onSubmit={(e) => onSubmitHandler(e)}>
    //     <input
    //       type="text"
    //       value={newMessage}
    //       onChange={(e) => handleOnChange(e)}
    //       placeholder="something message"
    //     />
    //     <input
    //       type="file"
    //       onChange={(e) => handleImageUpload(e)}
    //       accept="image/*"
    //     />
    //     {selectedImage && (
    //       <img
    //         src={selectedImage}
    //         alt="Selected"
    //         style={{ maxWidth: "100%" }}
    //       />
    //     )}
    //     <button type="submit">Send</button>
    //   </form>
    // </div>
    <div className="chat">
      <div className="chat__header">
        <h3 className="chat__text-heading white">Group 1</h3>

        <div className="chat__details">
          <div className="chat__details-people">
            <p>P</p>
            <div className="chat__details-items chat__details-items-first"></div>
            <div className="chat__details-items chat__details-items-second"></div>
          </div>

          <p className="chat__text-members white">+100 members</p>
        </div>
      </div>
      <div className="chat__main">
        {chosenImage !== null ? (
          <div className="chatimg">
            <div className="chatimg__header">
              <div className="chatimg__details">
                <p className="chatimg__nameInit white">P</p>

                <div className="chatimg__name">
                  <p className="chatimg__text white">{chosenImage.name}</p>
                  <p className="chatimg__time white">12:00</p>
                </div>
              </div>

              <img
                src={close}
                alt=""
                className="chatimg__close"
                onClick={handleCrossChossenImageClick}
              />
            </div>

            <div className="chatimg__img">
              <img src={chosenImage.image} alt="" />
            </div>

            <div className="chatimg__download">
              <a href={chosenImage.image} download>
                <img
                  src={download}
                  alt=""
                  className="chatimg__close"
                  onClick={handleCrossChossenImageClick}
                />
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="chat__allChats">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.docdata.uid === auth.data.uid ? "align-self-end" : ""
              }`}
            >
              <div
                className={`chat__conversation ${
                  message.docdata.uid === auth.data.uid
                    ? "chat__conversation-mytext"
                    : "chat__conversation-othertext"
                }`}
              >
                <p className="chat__text-name">
                  {message.docdata.name.charAt(0)}
                </p>
                <div>
                  {message.docdata.imageUrl === "" ? (
                    <p className="chat__text">{message.docdata.message}</p>
                  ) : (
                    <img
                      src={message.docdata.imageUrl}
                      alt=""
                      className="chat__selectedImage-img"
                      onClick={() =>
                        handleChooseImage(
                          message.docdata.imageUrl,
                          message.docdata.name,
                          message.docdata.createdat
                        )
                      }
                    />
                  )}
                  {message.docdata?.createdat?.nanoseconds !== null ? (
                    <p className="chat__text-time">
                      {convertDate(message.docdata.createdat)}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* {message.docdata.imageUrl !== "" ? (
                <img src={message.docdata.imageUrl} alt="" />
              ) : (
                <></>
              )} */}
            </div>
          ))}
        </div>
        {selectedImage !== null ? (
          <div className="chat__selectedImage">
            <img
              src={selectedImage}
              alt=""
              onClick={handleAttachmentClick}
              className="chat__selectedImage-img"
            />
            <img
              src={cross}
              alt=""
              onClick={handleCrossClick}
              className="chat__selectedImage-cross"
            />
          </div>
        ) : (
          ""
        )}

        <form
          action=""
          onSubmit={(e) => onSubmitHandler(e)}
          className={`chat__inputContainer ${
            selectedImage !== null
              ? "chat__inputContainer-imageSelectedBorder"
              : "chat__inputContainer-NoImageSelectedBorder"
          }`}
        >
          <img src={attachment} alt="" onClick={handleAttachmentClick} />
          <input
            type="text"
            placeholder="Type “change the logo colour”"
            value={newMessage}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="file"
            onChange={(e) => handleImageUpload(e)}
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
          />
          <img src={send} alt="" />
        </form>
      </div>
    </div>
  );
};

export default Chat;
