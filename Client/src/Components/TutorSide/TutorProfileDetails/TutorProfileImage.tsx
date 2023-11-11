import React, { useState, useEffect } from "react";
import { Course_Upload_Url, Image_Url } from "../../../Config/Config";
import profilesample from "../../../Assets/Images/pic2.png";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getTutorProfile, tutorEditPhoto } from "../AxiosConfigInstructors/AxiosConfig";

interface TutorEditProfileImageProps {
  tutor: { _id: string };
  onClose: (value: boolean) => void;
}

const TutorProfileImage: React.FC<TutorEditProfileImageProps> = ({
  tutor,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [photo, setPhoto] = useState<string>("");
  const [cloudinaryURL, setCloudinaryURL] = useState<string>("");

  useEffect(() => {
    const getPhoto = async () => {
      const response = await getTutorProfile(tutor._id);
      setImage(response.data.tutorDetails.photo);
    };
    getPhoto();
  }, [cloudinaryURL]);

  const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await imageHandler();

    if (photo) {
      try {
        await tutorEditPhoto(tutor._id, photo);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const imageHandler = async () => {
    try {
      const formData = new FormData();
      if (newImage) {
        formData.append("file", newImage);
        formData.append("upload_preset", "tutorImage");
        formData.append("cloud_name", "dnkc0odiw");
        const response = await axios.post(`${Course_Upload_Url}`, formData);
        setCloudinaryURL(response.data.public_id);
        setPhoto(response.data.public_id);
        return response;
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error("Error uploading image to Cloudinary.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Form>
        <Card style={{ width: "18rem", height: "18rem" }}>
          <Card.Body className="justify-content-center d-flex m-5">
            {image ? (
              <>
                <img
                  src={`${Image_Url}/${image}`}
                  alt="sample"
                  style={{ width: "6rem", height: "6rem" }}
                />{" "}
              </>
            ) : newImage ? (
              <>
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="sample"
                  style={{ width: "100px" }}
                />
              </>
            ) : (
              <>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="m-5"></Form.Label>
                  <img
                    src={profilesample}
                    alt="sample"
                    style={{ width: "100px" }}
                  />
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      if (inputElement && inputElement.files) {
                        const selectedFile = inputElement.files[0];
                        setNewImage(selectedFile);
                      }
                    }}
                  />
                </Form.Group>
              </>
            )}
          </Card.Body>

          {newImage && <Button type="submit" className="m-3" onClick={handleImageSubmit}>Submit</Button>}
        </Card>
      </Form>
    </>
  );
};

export default TutorProfileImage;
