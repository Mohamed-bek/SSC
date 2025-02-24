import React from "react";
import { Link } from "react-router-dom";
import { MdWavingHand } from "react-icons/md";
import { PiBuildingOfficeFill } from "react-icons/pi";

function MemberCard({ member }) {
  return (
    <div className="bg-secondary min-w-[290px]  flex-1 max-w-[310px] p-3 rounded-lg ">
      <div className="relative">
        <div className="h-[250px] overflow-hidden bg-primaryTransparent rounded-lg relative">
          <img
            src={member?.image || "/me.png"}
            alt={`${member.firstName} ${member.lastName}`}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          <div className="w-10 overflow-hidden flex-nowrap h-10 absolute top-2 left-2 bg-therd text-secondary flex justify-start items-center gap-1 cursor-pointer p-2 text-sm rounded-full font-medium hover:w-[250px] duration-500">
            <div className="w-8 h-8 flex justify-center items-center pr-1.5">
              <PiBuildingOfficeFill className="block h-8 w-8" />
            </div>
            <span className="text-nowrap block">
              {member?.department?.name || "Devlopment"}{" "}
            </span>
          </div>
        </div>

        <div className="text-therd pt-2.5">
          <h2 className="text-xl font-semibold capitalize">
            {member.firstName} {member.lastName}
          </h2>
          <h3 className="text-[0.85rem] font-normal text-gray-600 mb-2 lowercase">
            {member?.work}
          </h3>
          <div className="w-full h-[1px] bg-therd"> </div>
          <div className="py-3 flex justify-center items-center gap-5">
            {member?.media?.linkedin ? (
              <Link target="_blank" to={member?.media?.linkedin}>
                <img src="/linkedin.png" className="w-8 h-8" />
              </Link>
            ) : (
              <img src="/linkedin.png" className="w-8 h-8" />
            )}
            {member?.media?.github ? (
              <Link target="_blank" to={member?.media?.github}>
                <img src="/github.png" className="w-8 h-8" />
              </Link>
            ) : (
              <img src="/github.png" className="w-8 h-8" />
            )}
            {member?.media?.portfolio ? (
              <Link target="_blank" to={member?.media?.portfolio}>
                <img src="/portfolio.png" className="w-8 h-8" />
              </Link>
            ) : (
              <img src="/portfolio.png" className="w-8 h-8" />
            )}
          </div>
          <Link
            className="w-full SayHi py-2 text-center bg-therd gap-2 text-xl font-medium text-secondary rounded-md flex justify-center items-center"
            target="_blank"
            to={`mailto:${member?.email}`}
          >
            <span>Say Hi!</span>
            <MdWavingHand className="text-2xl icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
