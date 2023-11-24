import React, { useRef } from "react";
import classNames from "classnames";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import img from "../assets/filler-image.png";
import "./Pagination.css";
import "./PaginationItem.css";
import { Loader } from "./Loader";
import Button from "./ui/Button";

const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

const PaginationItem = ({ page, currentPage, onPageChange }) => {
  const liClasses = classNames({
    "page-item": true,
    active: page === currentPage,
  });

  return (
    <li className={liClasses} onClick={() => onPageChange(page)}>
      <span className="page-link">{page}</span>
    </li>
  );
};

const Pagination = ({
  currentPage,
  total,
  limit,
  onPageChange,
  imageArray,
  isLoading,
  bubbleArray,
  isTextEnabled,
}) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);
  const comicPanelRef = useRef(null);

  const handleDownload = () => {
    html2canvas(comicPanelRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, `comic_panel_${currentPage}.png`);
      });
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div
        className=" outline outline-black bg-white outline-4 rounded-md md:h-[24rem] md:w-[32rem] flex justify-center items-center overflow-hidden"
        ref={comicPanelRef}
      >
        {isLoading ? (
          <div className="object-cover flex justify-center items-center">
            <Loader />
          </div>
        ) : imageArray[currentPage - 1] ? (
          <div className="relative">
            <img
              src={imageArray[currentPage - 1]}
              alt={`Fetched`}
              className="w-full h-full object-cover"
            />
            {isTextEnabled && bubbleArray[currentPage - 1] ? (
              <div className="speech top-right">
                {bubbleArray[currentPage - 1]}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="relative">
            <span className="">Enter the prompt to generate image</span>
          </div>
        )}
      </div>
      <ul className="pagination">
        {pages.map((page) => (
          <PaginationItem
            page={page}
            key={page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        ))}
      </ul>
      <Button className="" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};

export default Pagination;
