// import React, { useRef } from "react";
// import { Button, Form, Header, Icon, Image, Segment } from "semantic-ui-react";

// const HomeUpload = ({
//   mediaPreview,
//   defaultHomePic,
//   handleChange,
//   media,
//   handleSubmit,
//   adoptMedia,
//   mediaType,
// }) => {
//   const inputRef = useRef(null);

//   let newType;
//   if (media !== null) {
//     newType = media.type.substring(0, 5);
//   }

//   return (
//     <div id="home-upload">
//       {/* if there no oldMedia && no mediaPreview : default || if there is oldMedia && no mediaPreview: oldMedia || if there is oldMedia && mediaPreview: mediaPreview */}
//       {/* if type is image : mediaPreview || if type is video: mediaPreview video */}

//       {/* no old media and no new media = default */}
//       {mediaPreview === null && adoptMedia === null && (
//         <Image
//           position="relative"
//           className="adopt-image"
//           objectfit="contain"
//           src={defaultHomePic}
//         />
//       )}

//       {/* old image and no new media = old image */}
//       {mediaPreview === null &&
//         adoptMedia !== null &&
//         mediaType ===
//           "image"(
//             <Image
//               position="relative"
//               className="adopt-image"
//               objectfit="contain"
//               src={adoptMedia}
//             />
//           )}

//       {/* old video and no new media = old video */}
//       {mediaPreview === null &&
//         adoptMedia !== null &&
//         mediaType ===
//           "video"(
//             <video className="adopt-video">
//               <source src={adoptMedia} />
//               Your browser does not support the video tag.
//             </video>
//           )}

//       {/* new media is an image = new image */}
//       {mediaPreview !== null && newType === "image" && (
//         <Image
//           position="relative"
//           className="adopt-image"
//           objectfit="contain"
//           src={mediaPreview}
//         />
//       )}

//       {/* new media is a video = new video */}
//       {mediaPreview !== null && newType === "video" && (
//         <video className="adopt-video">
//           <source src={mediaPreview} />
//           Your browser does not support the video tag.
//         </video>
//       )}

//       {/* {type === "image" ||
//         adoptMedia === null ||
//         mediaPreview === null && (
//           <Image
//             position="relative"
//             className="adopt-image"
//             objectfit="contain"
//             src={mediaPreview === null ? defaultHomePic : mediaPreview}
//           />
//         )}
//       {type === "video" && (
//         <video className="adopt-video">
//           <source src={mediaPreview} />
//           Your browser does not support the video tag.
//         </video>
//       )} */}

//       <div className="edit" style={{ position: "relative" }}>
//         <input
//           style={{ display: "none" }}
//           type="file"
//           accept="image/*,video/*"
//           onChange={handleChange}
//           name="media"
//           ref={inputRef}
//         />
//         {mediaPreview === null ? (
//           <Button
//             onClick={(e) => inputRef.current.click()}
//             style={{
//               right: "-10px",
//             }}
//             icon="pencil"
//             color="blue"
//             title="upload"
//           />
//         ) : (
//           <>
//             <Button
//               onClick={(e) => inputRef.current.click()}
//               style={{
//                 right: "40px",
//               }}
//               icon="pencil"
//               color="blue"
//               title="edit"
//             />
//             <Button
//               onClick={handleSubmit}
//               style={{
//                 right: "-10px",
//               }}
//               icon="check"
//               color="green"
//               title="submit"
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeUpload;
