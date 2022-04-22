// import axios from "axios";
// import React, { useEffect } from "react";
// import { baseURL } from "./util/auth";
// import { useRouter } from "next/router";

// const Animal = ({ animalObj }) => {
//   const router = useRouter();
//   const { animalObj } = router.query;

//   useEffect(() => {});

//   return (
//     <div className="page-wrap">
//       <div className="animal-wrap">
//         <h2>Animal Name</h2>
//         <p>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et culpa
//           atque numquam quisquam labore ipsum, repellendus molestiae dolores a
//           aperiam beatae fugit laborum laboriosam, ex ipsam reprehenderit libero
//           aut asperiores?
//         </p>
//       </div>
//     </div>
//   );
// };

// Animal.getInitialProps = async (ctx) => {
//   try {
//     const { animal } = ctx.query;
//     const res = await axios.get(`${baseURL}/api/v1/animal/${animal}`);

//     const { animalObj } = res.data;
//     return { animalObj };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default Animal;
