import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div>
        <div className="h-screen w-screen flex items-center justify-center">
            <Spinner size="xl" />
        </div>
      
    </div>
  );
};

export default Loading;
