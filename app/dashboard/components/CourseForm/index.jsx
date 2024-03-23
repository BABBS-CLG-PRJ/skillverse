"use client";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Info from "./Info";
import Builder from "./Builder";
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
          <Modal isOpen={openModal} onClose={()=>{setOpenModal(false)}} size="4xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Course Builder</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
                odit! Voluptatum autem non, doloribus facere quod, recusandae,
                accusamus nobis ad adipisci debitis distinctio et aliquid aut
                esse temporibus quo praesentium fuga sunt expedita veniam quidem
                accusantium. Deserunt enim molestias molestiae doloremque odio
                autem nulla explicabo atque natus sint quaerat quasi fugiat
                possimus, tempore voluptatum eveniet tempora eaque praesentium
                ab et nemo. Tempora nisi aliquam eos nihil illo pariatur sequi
                minima deserunt voluptatum fugit ea, rerum atque dignissimos
                quas unde numquam laboriosam quaerat illum similique quod
                debitis veniam iure? Incidunt aut repudiandae similique est iure
                minus ad facere dignissimos libero magnam iusto, dicta ipsum
                facilis. Consequatur ducimus deserunt consequuntur fugiat porro
                repellat aperiam. Non dicta odit reiciendis obcaecati vel,
                laudantium placeat, at temporibus quod nihil in saepe rem
                dolorum enim quisquam quibusdam, repellat tenetur sit possimus
                ducimus. Odit modi et molestiae deserunt. Explicabo soluta
                assumenda voluptatibus doloribus ducimus doloremque molestiae
                totam tenetur. Asperiores laudantium saepe autem animi magnam
                sint corrupti, fugit ex blanditiis consequatur quae unde dolore
                veritatis commodi inventore repellendus tenetur, pariatur quam
                accusamus. Commodi explicabo blanditiis at iste reprehenderit
                perferendis dolor vero dignissimos maiores in. A consectetur
                nostrum aperiam iure voluptates laborum, explicabo, nobis
                temporibus placeat quas sit maxime quisquam atque ipsam magni
                tempora voluptate nihil voluptas. Quidem sint laborum, quae odit
                suscipit architecto officiis corrupti repudiandae eos, iusto
                distinctio voluptates enim, dolores laboriosam sequi error
                officia expedita asperiores quibusdam accusamus! Nemo cumque
                modi quia dolores, suscipit illum iste non vitae necessitatibus
                quod corporis, quis amet nostrum laudantium placeat doloremque
                porro, saepe illo unde. Doloremque quidem perferendis et vel
                consequatur nesciunt eligendi, laborum veniam asperiores
                aspernatur, necessitatibus veritatis. Explicabo aliquid omnis,
                adipisci, neque nemo ex maiores voluptas facilis consequatur
                illo ad ratione! Provident eum recusandae aliquam, enim ad quos
                magnam inventore sequi aliquid officia vitae praesentium
                voluptates esse ex quas, maxime iure. Excepturi consectetur
                suscipit fugiat cupiditate repellendus et, aspernatur recusandae
                iure cum! Quae adipisci debitis ipsa quos illo expedita ipsum
                quo cupiditate. Sed nemo velit debitis vel eveniet quas,
                pariatur eos doloremque voluptatibus cumque molestiae!
                Consequuntur eius quia fugit est ipsum, incidunt laborum vero
                praesentium fugiat harum deserunt eaque.
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={()=>{setOpenModal(false)}}>
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
