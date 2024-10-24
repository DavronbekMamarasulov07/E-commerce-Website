import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Clothers = ({ item }) => {
  const { id, name, text, rating, data } = item;

  return (
    <div className="rounded-[20px] border bg-[#F0F0F0] p-7" key={id}>
      <div className="mb-3 flex items-center gap-2">
        {Array.from({ length: rating }, (_, index) =>
          index < Math.round(rating) ? (
            <AiFillStar key={index} className="text-yellow-500" />
          ) : (
            <AiOutlineStar key={index} className="text-yellow-500" />
          ),
        )}
      </div>
      <h3 className="flex items-center gap-1 text-[20px] font-bold text-[#000]">
        {name}
        <AiFillCheckCircle className="text-2xl text-green-500" />
      </h3>
      <p className="mb-6 mt-3 text-base text-[#00000080]">{text}</p>
      <p className="text-base text-[#00000080]">Posted on {data}</p>
    </div>
  );
};

export { Clothers };
