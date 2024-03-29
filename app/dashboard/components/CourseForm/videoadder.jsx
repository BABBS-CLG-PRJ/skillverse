import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Input,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
const videoadder = ({ index, onDelete }) => {
  const [sectionTitle, setSectionTitle] = useState("Section title");
  const handleDelete = () => {
    onDelete(index);//passed on to parent index.js section object//
  };

  return (
    <Accordion allowMultiple className="flex flex-row gap-x-2" >
      <AccordionItem className="w-full">
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Input
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Enter section title"
              />
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <button
        onClick={handleDelete} // very hard to implement this function will delete a specific accordion elemnt basaed on index//
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
            fill="red"
          />
        </svg>
      </button>
    </Accordion>
  );
};

export default videoadder;
