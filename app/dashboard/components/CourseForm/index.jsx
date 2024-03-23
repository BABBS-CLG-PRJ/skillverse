"use client";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Info from "./Info";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const index = () => {
  const [step, setstep] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Information",
    },
    {
      id: 3,
      content: (
        <div className=" w-50 border-dashed border-b-2 dark:border-white border-richblack-900"></div>
      ),
    },
    {
      id: 4,
      content: <div className=" w-40 "></div>,
    },

    {
      id: 2,
      title: "Builder",
    },
  ];
  const handleModalClose = () => {
    setOpenModal(false);
    setstep(1);
  };
  return (
    <>
      {/* The steps */}
      <div className="flex relative mb-2 flex-row justify-center items-center">
        {steps.map((item) => (
          <div key={item.id}>
            {item.id === 3 && <div>{item.content}</div>}
            {item.id !== 3 && item.id !== 4 && (
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] text-richblack-900  ${
                    step === item.id
                      ? "bg-primary-body border-yellow-500 text-black font-bold ripple-container "
                      : " bg-primary-body border-yellow-500 "
                  }`}
                >
                  {step > item.id ? <FaCheck /> : item.id}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* The step description */}
      <div className="flex relative mb-10 flex-row justify-center items-center">
        {steps.map((item) => (
          <div key={item.id}>
            {item.id === 4 && <div>{item.content}</div>}
            {item.id !== 3 && (
              <div className="flex flex-col items-center justify-center">
                <div className="font-bold text-center ">{item.title}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Info setstep={setstep} step={step} setOpenModal={setOpenModal} />
      )}
      {step === 2 && openModal && (
        <>
          <Modal
            isOpen={openModal}
            onClose={handleModalClose}
            size="4xl"
            closeOnEsc={true}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Course Builder</ModalHeader>
              <ModalCloseButton />
              <ModalBody
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam sed soluta maxime id iure, reiciendis iusto? Temporibus
                earum amet minima vel quae sint rerum sed esse voluptatibus at
                optio incidunt excepturi fugit illo totam, veritatis
                consequuntur harum, quas nulla modi magni repudiandae saepe
                laborum vitae. Nulla, odio maxime? Id nostrum dolore magni
                praesentium voluptatem sunt obcaecati dignissimos tempore
                labore, eos architecto! Eligendi temporibus illum ullam deleniti
                enim. Eligendi quo qui in animi. Accusantium dolore odit magnam
                consectetur obcaecati reiciendis, laboriosam voluptates?
                Voluptas quisquam cumque minus ex eum explicabo eveniet, sequi
                omnis aliquid facere hic est? Veniam nihil sed doloribus!
                Similique quisquam nisi dolor obcaecati aliquid ad nostrum iure
                secteturpit fugiat cupiditate repellendus et, aspernatur
                recusandae
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default index;
