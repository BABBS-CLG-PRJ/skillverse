import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div>
        <div className="h-100vh min-w-full">
            <Spinner size="xl" />
        </div>
      
    </div>
  );
};

export default Loading;
