// import React, { useEffect, useState } from "react";

// import S3 from "react-aws-s3";
// import { s3Config } from "../../s3Bucket/s3Config";

// import { Button, Modal, Form } from "react-bootstrap";

// function MemberProfileEditModal(props) {
//   const [username, setUsername] = useState(props.memberInfo.username);
//   const [firstname, setFirstname] = useState(props.memberInfo.firstName);
//   const [lastname, setLastname] = useState(props.memberInfo.lastName);
//   const [phone, setPhone] = useState(props.memberInfo.phone);
//   const [district, setDistrict] = useState(props.memberInfo.district);

//   const [{ src, alt }, setPreviewImg] = useState({
//     src: props.memberInfo.profilePath,
//     alt: "Profile pic",
//   });
//   const [{ bucketSrc, bucketAlt }, setBucketImg] = useState({
//     bucketSrc: "",
//     bucketAlt: "",
//   });

//   const ImgPreview = (e) => {
//     console.log(e.currentTarget.files[0]);
//     if (e.currentTarget.files[0]) {
//       setPreviewImg({
//         src: URL.createObjectURL(e.currentTarget.files[0]),
//         alt: e.currentTarget.files[0].name,
//       });
//       setBucketImg({
//         bucketSrc: e.currentTarget.files[0],
//         bucketAlt: e.currentTarget.files[0].name,
//       });
//     }
//   };

//   useEffect(() => {
//     setUsername(props.memberInfoForEdit.username);
//   }, []);

//   return (
//     <>
//       <Modal show={props.show}>
//         <Modal.Header>
//           <Modal.Title>Edit profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <div className="text-center">
//               {/* <img src={src} alt={alt} className="my-5 previewPhoto" /> */}
//               <Form.Control type="file" onChange={ImgPreview} />
//             </div>
//             <br />
//             <Form.Group className="mb-3">
//               <Form.Label>Userame</Form.Label>
//               <Form.Control
//                 className="input-text"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 className="input-text"
//                 type="text"
//                 value={firstname}
//                 onChange={(e) => setFirstname(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 className="input-text"
//                 type="text"
//                 value={lastname}
//                 onChange={(e) => setLastname(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control
//                 className="input-text"
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>District</Form.Label>
//               <Form.Select
//                 className="input-text"
//                 value={district}
//                 onChange={(e) => setDistrict(e.currentTarget.value)}
//                 required
//               >
//                 <option></option>
//                 <option>Central and Western</option>
//                 <option>Eastern</option>
//                 <option>Southern</option>
//                 <option>Wan Chai</option>
//                 <option>Kowloon City</option>
//                 <option>Kwun Tong</option>
//                 <option>Sham Shui Po</option>
//                 <option>Wong Tai Sin</option>
//                 <option>Yau Tsim Mong</option>
//                 <option>Kwai Tsing</option>
//                 <option>North</option>
//                 <option>Sha Tin</option>
//                 <option>Tai Po</option>
//                 <option>Tsuen Wan</option>
//                 <option>Tuen Mun</option>
//                 <option>Yuen Long</option>
//                 <option>Sai Kung</option>
//                 <option>Islands</option>
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={props.close}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={props.close}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default MemberProfileEditModal;
