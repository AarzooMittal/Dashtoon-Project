import "./components/Pagination.css";
import "./components/PaginationItem.css";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { query } from "./api/handle";
import Button from "./components/ui/Button";
import TextArea from "./components/ui/TextArea";

function App() {
  const [inputText, setInputText] = useState("");
  const [imageArray, setImageArray] = useState(Array.from({ length: 10 }));
  const [submitBtn, setSubmitBtn] = useState(false);
  // for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isTextEnabled, setIsTextEnabled] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleArray, setBubbleArray] = useState(Array.from({ length: 10 }));

  const handleQuery = async () => {
    setIsLoading(true);
    try {
      if (inputText === "") {
        alert("Please enter some input. ");
        return;
      }

      // First as soon as someone submits the prompt
      // the previous image for that page should be removed.
      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = undefined;
        return newImages;
      });

      const response = await query({ inputs: inputText });
      const imageUrl = URL.createObjectURL(response);

      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = imageUrl;
        return newImages;
      });
      setInputText("");
    } catch (error) {
      console.log("Fetching image failed:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBubbleText = () => {
    // This sets the array value as per the text for
    // the corresponding page
    setBubbleArray((prevText) => {
      const newText = [...prevText];
      newText[currentPage - 1] = textValue;
      return newText;
    });
  };

  useEffect(() => {
    setTextValue(bubbleArray[currentPage - 1] || "");
  }, [currentPage]);

  return (
    <div className=" min-h-screen w-screen flex flex-col items-center justify-center sm:p-12 sm:pt-6 p-4">
      <h1 className="text-5xl font-mono font-semibold mb-12">DASHTOON</h1>
      <div className="flex md:flex-row flex-col w-full gap-8">
        <div className="flex flex-col w-full gap-4">
          <TextArea
            required={true}
            value={inputText}
            placeholder="Enter the prompt to generate image"
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
          />

          {/* Prompt Button Group  */}
          <div className="flex justify-around">
            <Button onClick={handleQuery}>Generate</Button>
          </div>
        </div>

        {/* Comic text addition  */}
        <div className="w-full flex flex-col gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isTextEnabled}
              onChange={() => setIsTextEnabled(!isTextEnabled)}
              className="h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Enable Bubble Text</span>
          </label>

          <TextArea
            value={textValue}
            placeholder="Add Speech Bubble"
            onChange={(e) => setTextValue(e.target.value)}
            className={` ${!isTextEnabled && "opacity-50 cursor-not-allowed"}`}
            disabled={!isTextEnabled}
            rows={3}
          />
          <div className="flex justify-center">
            <Button
              className=""
              onClick={handleBubbleText}
              disabled={!isTextEnabled}
            >
              Enter Text
            </Button>
          </div>
        </div>
      </div>
      <div className="containe mt-12">
        <Pagination
          currentPage={currentPage}
          total={10}
          limit={1}
          onPageChange={(page) => setCurrentPage(page)}
          imageArray={imageArray}
          isLoading={isLoading}
          bubbleArray={bubbleArray}
          isTextEnabled={isTextEnabled}
        />
      </div>
    </div>
  );
}
export default App;
