import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Clothers = ({ item }) => {
    const { id, name, text, rating, data } = item;

    return (
        <div className="border p-7 rounded-[20px] bg-[#F0F0F0]" key={id}>
            <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, index) => (
                    index < Math.round(rating) ? <AiFillStar key={index} className="text-yellow-500" /> : <AiOutlineStar key={index} className="text-yellow-500" />
                ))}
            </div>
            <h3 className="text-[#000] text-[20px] font-bold flex items-center gap-1">
                {name}
                <AiFillCheckCircle className="text-green-500 text-2xl" />
            </h3>
            <p className="text-[#00000080] text-base mb-6 mt-3">
                {text}
            </p>
            <p className="text-[#00000080] text-base">
                Posted on {data}
            </p>
        </div>
    );
};

export { Clothers };
